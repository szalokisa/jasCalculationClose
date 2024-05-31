import GridReport from '../../../gridReport/GridReport';
import { languageElements } from "../../../forms/customerPortal/users/FormUsers-languageElements";
import { reportParams } from './UsersGrid-params';
import FunctionCell_EditDelete from "../../../dataGrid/functionCells/editDelete/FunctionCell_EditDelete";

export default function UsersGrid(props) {
    async function editCustomers(id) {
        props.edit(id);
        return;
    };

    async function deleteCustomers(id) {
        props.onDelete(id);
    }

    return (
        <div className="UsersGrid">
            <GridReport
                refreshId={props.refreshId || 0}
                dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/customerportal/data`}
                language={props.language}
                loginData={props.loginData}
                onAddNew={props.onAddNew}
                onRowDoubleClick={(row) => editCustomers(row.data.ID)}
                rowSelection={props.rowSelection}
                rowMultiSelectWithClick={props.rowMultiSelectWithClick}
                report={{
                    collection: 'USERS',
                    fixFilter: props.fixFilter,
                    reportParams,
                    languageElements,
                    frameWorkComponents: {
                        FunctionCell_EditDelete,
                    },
                    cellRenderers: [
                        {
                            field: "ID",
                            cellRenderer: "FunctionCell_EditDelete",
                            cellRendererParams: {
                                pencilClicked: (id) => editCustomers(id),
                                trashClicked: (id) => deleteCustomers(id),
                            },
                        },
                    ],
                }}
            />
        </div>

    )
}
