const getValues = (options: { value: string; label?: string }[]) =>
    options.map(({ value }) => value)

export const itemListingOptions = [
    { value: 'cabinets', label: 'Cabinets' },
    { value: 'trim', label: 'Trim' },
    { value: 'doors', label: 'Doors' },
    { value: 'molding', label: 'Molding' },
    { value: 'drawer fronts', label: 'Drawer Fronts' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'panels', label: 'Panels' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'toe boards', label: 'Toe Boards' },
    { value: 'fillers', label: 'Fillers' },
]

export const itemListingValues = getValues(itemListingOptions)

export enum ItemListingPresetNames {
    All = 'all',
    None = 'none',
    Standard = 'standard',
}

export const itemListingPresets = {
    [ItemListingPresetNames.All]: itemListingValues,
    [ItemListingPresetNames.None]: [],
    [ItemListingPresetNames.Standard]: [
        'trim',
        'molding',
        'accessories',
        'hardware',
    ],
}

export const reportIncludes = [
    { value: 'material', label: 'Include Material Reports' },
    { value: 'labor', label: 'Include Labor Reports' },
    { value: 'installation', label: 'Include Installation Reports' },
    { value: 'summary', label: 'Include Grand Summary' },
]

export const columns = [
    {
        title: 'Room Name',
        key: 'room_name',
        dataIndex: 'name',
    },
    {
        title: 'Elevation',
        key: 'elevation',
        dataIndex: 'elevation',
    },
    {
        title: 'Quantity',
        key: 'quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: 'Sort',
        key: 'sort',
        dataIndex: 'sort_order',
    },
]
