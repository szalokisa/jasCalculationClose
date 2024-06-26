import { useRef, useEffect, useState } from 'react';
import "./DataGrid.scss";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import FieldFormatters from "../../repository/FieldFormatters";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import LanguageElementsHandler from "../../repository/LanguageElementsHandler";

export default function DataGrid(props) {
  const gridRef = useRef();

  const [gridApi, setGridApi] = useState();

  useEffect(() => {
    if (props.getSelectedRows) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      props.getSelectedRowsCallback(selectedRows, props.getSelectedRows);
    }
  }, [props.getSelectedRows]);

  const languageElementsHandler = new LanguageElementsHandler(
    props.languageElements,
    props.language
  );

  function dateFormatter(params) {
    return FieldFormatters.dateFormatter(params.value, props.language);
  }

  function floatFormatter(params) {
    return FieldFormatters.numberFormatter(params.value, props.language, 2);
  }

  function float3Formatter(params) {
    return FieldFormatters.numberFormatter(params.value, props.language, 3);
  }

  function float4Formatter(params) {
    return FieldFormatters.numberFormatter(params.value, props.language, 4);
  }

  function intFormatter(params) {
    return FieldFormatters.numberFormatter(params.value, props.language, 0);
  }
  const columnTypes = {
    date: {
      valueFormatter: dateFormatter,
      filter: "agDateColumnFilter",
      filterParams: {
        debounceMs: 500,
        buttons: ["reset"],
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          if (cellValue == null) {
            return 0;
          }
          const filterLocalDateAtMidnightInt =
            filterLocalDateAtMidnight.getFullYear() * 10000 +
            (filterLocalDateAtMidnight.getMonth() + 1) * 100 +
            filterLocalDateAtMidnight.getDate();
          const cellValueInt =
            parseInt(cellValue.substr(0, 4), 10) * 10000 +
            parseInt(cellValue.substr(5, 2), 10) * 100 +
            parseInt(cellValue.substr(8, 2), 10);
          if (cellValueInt < filterLocalDateAtMidnightInt) {
            return -1;
          }
          if (cellValueInt > filterLocalDateAtMidnightInt) {
            return 1;
          }
          return 0;
        },
      },
      comparator: (d1, d2) => {
        if (!d1 && !d2) {
          return 0;
        }

        if (!d1) {
          return -1;
        }

        if (!d2) {
          return 1;
        }

        if (d1 === d2) {
          return 0;
        }
        return d1 > d2 ? 1 : -1;
      },
    },

    int: {
      valueFormatter: intFormatter,
      headerClass: "grid-header-right",
      cellStyle: { textAlign: "right" },
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset"],
      },
    },

    float: {
      valueFormatter: floatFormatter,
      headerClass: "grid-header-right",
      cellStyle: { textAlign: "right" },
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset"],
      },
    },

    float3: {
      valueFormatter: float3Formatter,
      headerClass: "grid-header-right",
      cellStyle: { textAlign: "right" },
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset"],
      },
    },

    float4: {
      valueFormatter: float4Formatter,
      headerClass: "grid-header-right",
      cellStyle: { textAlign: "right" },
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset"],
      },
    },

    boolean: {},

    default: {
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset"],
      },
    },
  };

  const gridColumns = props.columns.map((col) => {
    const field = col.field || col.name;

    let fieldCellRenderer;

    if (props.cellRenderers) {
      fieldCellRenderer = props.cellRenderers.find(
        (renderer) => renderer.field === col.field
      );
    }

    if (!fieldCellRenderer) {
      switch (col.type) {
        case "boolean":
          fieldCellRenderer = (params) => {
            return `<input type='checkbox' ${params.value ? "checked" : ""} />`;
          };
          break;

        default:
          fieldCellRenderer = {};
          break;
      }
    }

    return {
      ...col,
      field,
      cellRenderer: fieldCellRenderer.cellRenderer,
      cellRendererParams: fieldCellRenderer.cellRendererParams,
    };
  });

  let languageColumns = {};

  props.columns.forEach((col) => {
    if (col.options) {
      const languageItems = col.options.filter((option) => option.value);
      if (languageItems) {
        let objectOfLanguageItems = {};
        for (let i = 0; i < languageItems.length; i++) {
          const languageItem = languageItems[i];
          objectOfLanguageItems[languageItem.value] =
            languageItem.text.substr(0, 4) === "###-"
              ? languageElementsHandler.get(languageItem.text.substr(4))
              : languageItem.text;
        }
        languageColumns[col.field] = objectOfLanguageItems;
      }
    }
  });

  let gridData = props.data.map((row) => {
    return { _origData: { ...row }, ...row };
  });

  if (Object.keys(languageColumns).length > 0) {
    Object.keys(languageColumns).forEach((key) => {
      gridData = gridData.map((row) => {
        let newRow = row;
        if (row[key]) {
          const languageValue = languageColumns[key][row[key]];
          if (languageValue) {
            newRow[key] = languageValue;
          }
        }
        return newRow;
      });
    });
  }

  function onRowDoubleClick(row) {
    if (props.onRowDoubleClick) {
      props.onRowDoubleClick(row);
    }
  }

  function getColumnTypeNormalised(columnType) {
    switch (columnType) {
      case 'Date':
        return 'date';

      case 'Int':
        return 'int';

      case 'NVarChar':
        return '';

      default:
        return columnType;
    }
  }
  return (
    <div
      id={props.id}
      className="ag-grid-container ag-theme-alpine"
      style={{ height: props.gridHeight || "70vh", width: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={gridData}
        columnTypes={columnTypes}
        frameworkComponents={props.frameworkComponents}
        rowSelection={props.rowSelection} //multiple / single
        isRowSelectable={props.isRowSelectable}  //function, returns false or true
        rowMultiSelectWithClick={true}   //{props.rowMultiSelectWithClick} //true
        rowClassRules={props.rowDesign}
        onRowDoubleClicked={(row) => onRowDoubleClick(row)}
        onGridReady={params => (setGridApi(params.api))}
        onSelectionChanged={() => {
          if (props.onSelectionChanged) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            props.onSelectionChanged(selectedRows);
          }
        }}
      >
        {gridColumns.map((col) => (
          <AgGridColumn
            key={col.field}
            field={col.field}
            headerName={languageElementsHandler.get(`field-${col.field}`)}
            headerCheckboxSelection= {(col.field === 'ID')}  // {(col.field === props.checkboxColumn)}
            headerCheckboxSelectionFilteredOnly={true}
            checkboxSelection={(col.field === 'ID')}//{(col.field === props.checkboxColumn)}
            sortable
            floatingFilter={col.field !== props.checkboxColumn && !col.hideFloatingFilter}
            type={col.type ? getColumnTypeNormalised(col.type) : "default"}
            cellRenderer={col.cellRenderer}
            cellRendererParams={col.cellRendererParams}
            resizable
            width={col.width}
            pinned={col.pinned}
          />
        ))}
      </AgGridReact>
    </div>
  );
}
