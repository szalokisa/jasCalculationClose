import GridReport from '../../../gridReport/GridReport';
import { languageElements } from "../../../forms/customerPortal/users/FormUsers-languageElements";
import { reportParams } from './CalculationsGrid-params';

export default function CalculationsGrid2(props) {
    console.log('+++ CalculationsGrid.js (line: 6)', props);

    return <div>
        <h3>CalculationsGrid --- {props.language}</h3>
        {/* <GridReport
            refreshId={props.refreshId || 0}
            dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/listview/data`}
            language={props.language}
            loginData={props.loginData}
            onAddNew={props.onAddNew}
            rowSelection={props.rowSelection}
            rowMultiSelectWithClick={props.rowMultiSelectWithClick}
            report={{
                collection: 'WEBVIEW_CALC',
                fixFilter: props.fixFilter,
                reportParams,
                languageElements,
            }}
        /> */}
    </div>
}