import { useState, useEffect, useRef } from 'react';
import './GridReport.scss';
import { Accordion } from 'bootstrap';
import DataGrid from '../dataGrid/DataGrid';
import Filters from '../filters/Filters';
import LanguageElementsHandler from '../../repository/LanguageElementsHandler';
import ExcelExport from '../excelExport/ExcelExport';
import RefreshIcon from './reload.svg';
import PlusIcon from './plus.svg';
import FiveSecondsAlert from '../alerts/fiveSecondsAlert/FiveSecondsAlert';
import SimpleModal from '../modals/simpleModal/SimpleModal';

export default function GridReport(props) {
  const [getSelectedRows, activateSelectedRows] = useState(undefined);
  const [stateOfFiveSecondsAlert, setStateOfFiveSecondsAlert] = useState({
    show: false,
    message: {
      title: '',
      body: '',
    }
  });

  const languageElementsHandler = new LanguageElementsHandler(
    props.report.languageElements,
    props.language,
  );

  const accordionData = useRef();
  const [dataLoadingState, setDataLoadingState] = useState('NOT PREPARED');
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [modalShow, setModalShow] = useState({
    show: false,
  });

  useEffect(() => {
    setDataLoadingState('NOT PREPARED');
    setGridColumns(
      props.report.reportParams.selectedColumns.map((columnName) => {
        const columnDef = props.report.reportParams.columns.find(
          (column) => column.field === columnName,
        );
        return {
          field: columnName,
          type: columnDef.type,
          width: columnDef.width,
          options: columnDef.options?.map(option => ({
            value: option.value,
            text: (option.textForGrid) ? option.textForGrid : option.text,
          })),
          pinned: columnDef.pinned,
        };
      }),
    );

    if (!props.report.fixFilter) {
      setDataLoadingState('NOT LOADED');
    }
  }, []);

  useEffect(() => {
    if (props.report.fixFilter) {
      showData();
    } else {
      showDataIfNotCollapsed();
    }
  }, [props.language, props.refreshId || 0]);

  function showDataIfNotCollapsed() {
    if (props.report.fixFilter) {
      showData();
      return;
    }

    if (accordionData.current) {
      if (!accordionData.current.classList.contains('collapsed')) {
        showData();
      }
    }
  }

  function addNew() {
    props.onAddNew();
  }

  function getFilter() {
    if (props.report.fixFilter) {
      return props.report.fixFilter;
    }

    const filterFields = Array.from(document.querySelectorAll('.reportFilter'))
      .filter((e) => e.value)
      .map((e) => {
        switch (e.type) {
          case 'date':
            const dateValue = new Date(e.value);
            const sqlDate = `CONVERT(DATETIME, '${dateValue.getFullYear()}-${dateValue.getMonth() + 1
              }-${dateValue.getDate()}', 102)`;
            const sqlDate2359 = `CONVERT(DATETIME, '${dateValue.getFullYear()}-${dateValue.getMonth() + 1
              }-${dateValue.getDate()} 23:59:59', 102)`;

            let result = e.dataset.sql.replace(/\?\(2359\)/g, sqlDate2359);
            result = result.replace(/\?/g, sqlDate);
            return result;

          default:
            return `(${e.dataset.sql.replace(/\?/g, e.value)})`;
        }
      });
    return filterFields.join(' AND ');
  }

  function showData() {
    setDataLoadingState('LOADING');
    fetch(`${props.dataEndpoint}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'x-token': props.loginData.getToken(),
        'x-collection': props.report.collection,
        'x-limit': props.report.maxRecords || 0,
        'x-filter': getFilter(),
        'x-sort': props.report.reportParams.sort,
        'x-language': props.language,
      }
    })
      .then((data) => {
        if (data.status !== 200) {
          setDataLoadingState('NOT LOADED');
          const error = new Error('invalid');
          error.status = data.status;
          throw error;
        }
        return data.json();
      })
      .then((jsonData) => {
        setGridData(jsonData.data);
        setDataLoadingState('LOADED');
      })
      .catch(() => {
        setDataLoadingState('NOT LOADED');
      });
  }

  function onRowDoubleClick(row) {
    if (props.onRowDoubleClick) {
      props.onRowDoubleClick(row)
    }
  }

  if (props.report.fixFilter) {
    return (
      <div className="grid-report">
        {dataLoadingState === 'LOADING' && (
          <div className="accordion-body loading-spinner">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {dataLoadingState === 'LOADED' && (
          <div className="accordion-body">
            <div className="accordion-body-header">
              {props.onAddNew &&
                <button type="button" className="btn btn-warning btn-add" onClick={addNew}>
                  <img className="Add-icon" src={PlusIcon} alt="Add-icon.svg" />
                </button>
              }
              <button type="button" className="btn btn-warning btn-refresh-report" onClick={showDataIfNotCollapsed}>
                <img className="Refresh-icon" src={RefreshIcon} alt="Refresh-icon.svg" />
              </button>
              <ExcelExport data={gridData} />
            </div>

            <DataGrid
              id={`${props.id}-dataGrid`}
              columns={gridColumns}
              language={props.language}
              languageElements={props.report.languageElements}
              data={gridData}
              frameworkComponents={props.report.frameWorkComponents}
              cellRenderers={props.report.cellRenderers}
              rowSelection={props.rowSelection}
              rowMultiSelectWithClick={props.rowMultiSelectWithClick}
              onRowDoubleClick={(row) => onRowDoubleClick(row)}
            />
          </div>
        )}
      </div>
    );

  }

  function modifyCalculations(IDs) {
    props.modifyCalculations(IDs);
  }

  return (
    <div className="grid-report">
      <FiveSecondsAlert
        show={stateOfFiveSecondsAlert.show}
        language={props.language}
        message={stateOfFiveSecondsAlert.message}
        variant={stateOfFiveSecondsAlert.variant}
        interval={stateOfFiveSecondsAlert.interval}
        className={stateOfFiveSecondsAlert.className}
        callback={() => { setStateOfFiveSecondsAlert({ show: false }); }}
      />

      <SimpleModal
        show={modalShow.show}
        // title="### Message"
        title = {languageElementsHandler.get('modal-title')}
        body={languageElementsHandler.get('modal-body')}
        buttons={[
          {
            id: "NO",
            text: languageElementsHandler.get('answer-no'),
            variant: "secondary",
          },
          {
            id: "YES",
            text: languageElementsHandler.get('answer-yes'),
            variant: "primary",
          }
        ]}
        params={modalShow.params}
        callback={(buttonId, params) => {
          setModalShow({
            show: false
          });
          // alert(`Answer: ${buttonId}`);
          modifyCalculations(params.IDs)
        }}
      />

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="grid-report-flush-filter">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-filter"
              aria-expanded="false"
              aria-controls="flush-collapse-filter"
            >
              {languageElementsHandler.get('flush-filter')}
            </button>
          </h2>
          <div
            id="flush-collapse-filter"
            className="accordion-collapse collapse"
            aria-labelledby="grid-report-flush-filter"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <Filters
                reportParams={props.report.reportParams}
                languageElements={props.report.languageElements}
                language={props.language}
              />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="grid-report-flush-data">
            <button
              ref={accordionData}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-data"
              aria-expanded="false"
              aria-controls="flush-collapse-data"
              onClick={() => showDataIfNotCollapsed()}
            >
              {languageElementsHandler.get('flush-data')}
            </button>
          </h2>
          <div
            id="flush-collapse-data"
            className="accordion-collapse collapse"
            aria-labelledby="grid-report-flush-data"
            data-bs-parent="#accordionFlushExample"
          >
            {dataLoadingState === 'LOADING' && (
              <div className="accordion-body loading-spinner">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {dataLoadingState === 'LOADED' && (
              <div className="accordion-body">
                <div className="accordion-body-header">
                  <div className='accordion-body-header-left'>
                    <button type="button"
                      className="btn btn-outline-success"
                      onClick={(e) => activateSelectedRows('MODIFY_CALCULATIONS')}
                    >
                      {languageElementsHandler.get('btn-success')}
                    </button>
                  </div>

                  <div className='accordion-body-header-right'>
                    {props.onAddNew &&
                      <button type="button" className="btn btn-warning btn-add" onClick={addNew}>
                        <img className="Add-icon" src={PlusIcon} alt="Add-icon.svg" />
                      </button>
                    }
                    <button type="button" className="btn btn-warning btn-refresh-report" onClick={showDataIfNotCollapsed}>
                      <img className="Refresh-icon" src={RefreshIcon} alt="Refresh-icon.svg" />
                    </button>
                    <ExcelExport data={gridData} />
                  </div>
                </div>

                <DataGrid
                  id={`${props.id}-dataGrid`}
                  columns={gridColumns}
                  language={props.language}
                  languageElements={props.report.languageElements}
                  data={gridData}
                  isRowSelectable={props.isRowSelectable}
                  frameworkComponents={props.report.frameWorkComponents}
                  cellRenderers={props.report.cellRenderers}
                  rowSelection={props.rowSelection}
                  rowMultiSelectWithClick={props.rowMultiSelectWithClick}
                  onRowDoubleClick={(row) => onRowDoubleClick(row)}

                  getSelectedRows={getSelectedRows}
                  getSelectedRowsCallback={(selectedRows, func) => {
                    activateSelectedRows(false);

                    const IDs = selectedRows.map(e => e.ID);
                    if (IDs.length === 0) {
                      setStateOfFiveSecondsAlert({
                        show: true,
                        variant: 'danger',
                        message: {
                          title: languageElementsHandler.get('alert-no-rows-selected-title'),
                          body: languageElementsHandler.get('alert-no-rows-selected-body'),
                        }
                      })
                      return;
                    }

                    setModalShow({
                      show: true,
                      params: {
                        IDs
                      }
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
