export const reportParams = {
    collection: 'WEBVIEW_CALC',
    columns: [{
        field: 'PosNr',
        width: 80,
        pinned: 'left',
    },
    {
        field: 'PeriodName',
        width: 240,
        pinned: 'left',
    },
    {
        field: 'ChName',
        width: 240,
    },
    {
        field: 'UnitPrice',
    },
    {
        field: 'DeliveryDate',
    },
    ],
    sort: 'PosNr',
    limit: 5000,
    rowCountPerPage: 50,
    selectedFilters: [
        'PosNr',
    ],
    selectedColumns: [
        'PosNr',
        'PeriodName',
        'ChName',
        'UnitPrice',
        'DeliveryDate',
    ],
};
