export const reportParams = {
    collection: 'USERS',
    columns: [{
        field: 'ID',
        width: 80,
        pinned: 'left',
    },
    {
        field: 'Email',
        width: 240,
        pinned: 'left',
    },
    {
        field: 'Name',
        width: 240,
    },
    {
        field: 'Lang',
    },
    {
        field: 'Status',
    },
    ],
    sort: 'Name',
    limit: 5000,
    rowCountPerPage: 50,
    selectedFilters: [
        'Name',
    ],
    selectedColumns: [
        'ID',
        'Email',
        'Name',
        'Lang',
        'Status',
    ],
};
