const materialCostsColumns = [
    {
        title: '',
        key: 'type',
        dataIndex: 'type',
    },
    {
        title: 'Source',
        key: 'source',
        dataIndex: 'source',
    },
    {
        title: 'In-House Manufactured',
        children: [
            {
                title: 'Material',
                key: 'material',
                dataIndex: 'material',
            },
            {
                title: 'Labor',
                key: 'labor',
                dataIndex: 'labor',
            },
        ],
    },
    {
        title: 'Outsourced',
        key: 'outsourced',
        dataIndex: 'outsourced',
    },
    {
        title: 'Chosen for this Job',
        children: [
            {
                title: 'Material',
                key: 'material',
                dataIndex: 'material',
            },
            {
                title: 'Labor',
                key: 'labor',
                dataIndex: 'labor',
            },
        ],
    },
    {
        title: 'In-House Manufactured',
        key: 'in_house_manufactured',
        dataIndex: 'in_house_manufactured',
    },
    {
        title: 'Outsourced',
        key: 'outsourced',
        dataIndex: 'outsourced',
    },
    {
        title: 'Chosen for this Job',
        key: 'chosen_for_this_job',
        dataIndex: 'chosen_for_this_job',
    },
]

export default materialCostsColumns
