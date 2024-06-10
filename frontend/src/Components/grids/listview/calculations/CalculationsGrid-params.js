import { type } from "@testing-library/user-event/dist/type";

export const reportParams = {
    collection: 'WEBVIEW_CALC',
    sysgridCode: 'CLOSE_CALCS',
    columns: [{
        field: 'ID',
        width: 60,
        pinned: 'left',
        // hideFloatingFilter: true,
        // type: 'c_heckbox',
    },
    {
        field: 'PosNr',
        width: 180,
        pinned: 'left',
    },
    {
        field: 'PeriodName',
        width: 120,
        pinned: 'left',
    },
    {
        field: 'ChName',
        width: 240,
    },
    {
        field: 'UnitPrice',
        width: 120,
    },
    {
        field: 'DeliveryDate',
        width: 200,
        type: 'date'
    },
    {
        field: 'OutIn',
    },
    {
        field: 'PosType',
        width: 100,
    },
    {
        field: 'CustName'
    },
    {
        field: 'Amount',
        width: 100,
    },
    {
        field: 'Unit',
        width: 100,
    },
    {
        field: 'Netto',
        width: 100,
    },
    {
        field: 'CurrencyName',
        width: 100,
    },
    {
        field: 'VatCode',
        width: 100,
    },
    {
        field: 'ETD',
        width: 200,
    },
    {
        field: 'ETA',
        width: 200,
    },
    {
        field: 'PDate',
        width: 200,
    },
    {
        field: 'Inv_Status',
        width: 150,
    },
    {
        field: 'rowSelectingStatus',
    },

    ],
    sort: 'PosNr',
    limit: 5000,
    rowCountPerPage: 50,
    selectedFilters: [
        'PosNr',
        'PeriodName',
        'ChName',
        'CustName',
        'UnitPrice',
        'DeliveryDate',
        'PosType',
        'OutIn',
    ],
    selectedColumns: [
        'ID',
        'PosNr',
        'PeriodName',
        'ChName',
        'UnitPrice',
        'DeliveryDate',
        'OutIn',
        'PosType',
        'CustName',
        'Amount',
        'Unit',
        'Netto',
        'CurrencyName',
        'VatCode',
        'ETD',
        'ETA',
        'PDate',
        'Inv_Status',
    ],
};
