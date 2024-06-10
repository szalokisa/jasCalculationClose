import { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios";
import GridReport from '../../../gridReport/GridReport';
import { reportParams } from './CalculationsGrid-params';
import { languageElements } from '../../../../Pages/ListViewCalculations/ListviewCalculations-languageElements';
import FieldFormatters from '../../../../repository/FieldFormatters';
import FiveSecondsAlert from '../../../alerts/fiveSecondsAlert/FiveSecondsAlert';
import LanguageElementsHandler from '../../../../repository/LanguageElementsHandler';

export default function CalculationsGrid(props) {
    const [refreshId, setRefreshId] = useState(0);
    const [stateOfFiveSecondsAlert, setStateOfFiveSecondsAlert] = useState({
        show: false,
        message: {
            title: '',
            body: '',
        }
    });

    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language,
    );

    function refreshData() {
        setRefreshId((currentRefreshId) => currentRefreshId + 1)
    }

    function dateFormatter(params) {
        return FieldFormatters.dateFormatter(params.value, props.language);
    }

    function modifyCalculations(selectedRows) {
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/data`,
            {
                selectedRows,
                collection: reportParams.sysgridCode,
                headers: {
                    "x-token": props.loginData.getToken(),
                }
            },
        ).then((data) => {
            refreshData();
            setStateOfFiveSecondsAlert({
                show: true,
                //variant: 'danger',
                message: {
                    title: languageElementsHandler.get('process-ended'),
                    body: undefined, //languageElementsHandler.get('alert-no-rows-selected-body'),
                }
            })

        }).catch((err) => {
            console.error(err);
        });
    }

    const isRowSelectable = useCallback((rowNode) => {
        return rowNode.data.rowSelectingStatus === 1;
    }, []);

    return (
        <div className="CalculationsGrid">
            <FiveSecondsAlert
                show={stateOfFiveSecondsAlert.show}
                language={props.language}
                message={stateOfFiveSecondsAlert.message}
                variant={stateOfFiveSecondsAlert.variant}
                interval={stateOfFiveSecondsAlert.interval}
                className={stateOfFiveSecondsAlert.className}
                callback={() => { setStateOfFiveSecondsAlert({ show: false }); }}
            />

            <GridReport
                refreshId={refreshId}
                dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/listview/data`}
                language={props.language}
                loginData={props.loginData}
                onAddNew={props.onAddNew}
                rowSelection={props.rowSelection}
                isRowSelectable={isRowSelectable}
                modifyCalculations={modifyCalculations}
                rowMultiSelectWithClick={props.rowMultiSelectWithClick}
                report={{
                    collection: 'WEBVIEW_CALC',
                    fixFilter: props.fixFilter,
                    reportParams,
                    languageElements,
                }}
            />
        </div>
    )
}