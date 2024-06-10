import { useState } from 'react';
import './ListviewCalculations.scss'
import CalculationsGrid from '../../Components/grids/listview/calculations/CalculationsGrid';

export default function ListViewCalculations(props) {
    const [refreshId, setRefreshId] = useState(0);
    function refreshGrid() {
        setRefreshId(currentRefreshId => (currentRefreshId + 1));
    }

    return (
        <div className="page-listview">
            <div className="grid-area" >
                <CalculationsGrid
                    language={props.language}
                    loginData={props.loginData}
                    refreshId={refreshId}
                    rowSelection={'multiple'}>
                </CalculationsGrid>
            </div>
        </div>
    )
}