import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import GridReport from '../../../gridReport/GridReport';
import { reportParams } from './CalculationsGrid-params';
import { languageElements } from '../../../../Pages/ListViewCalculations/ListviewCalculations-languageElements';
import FieldFormatters from '../../../../repository/FieldFormatters';

export default function CalculationsGrid(props) {
    console.log('+++ CalculationsGrid.js (line: 9)', props, reportParams);
    function dateFormatter(params) {
        return FieldFormatters.dateFormatter(params.value, props.language);
    }

    function modifyCalculations(selectedRows) {
        console.log('+++ CalculationsGrid.js (line: 15)', props.collection);
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/data`,
            {
                selectedRows,
                collection: reportParams.sysgridCode,
                headers: {
                    "x-token": props.loginData.getToken(),
                }
            },
        ).then((data) => {
            console.log('+++ SIKER')
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className="CalculationsGrid">
            <GridReport
                refreshId={props.refreshId || 0}
                dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/listview/data`}
                language={props.language}
                loginData={props.loginData}
                onAddNew={props.onAddNew}
                rowSelection={props.rowSelection}
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