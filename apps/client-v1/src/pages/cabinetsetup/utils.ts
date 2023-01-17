const tableProps = {
    rowKey: 'id',
    pagination: false,
    size: 'small' as const,
}

const defaultPagination = {
    pageSize: 20,
    current: 1,
    limit: 20,
    skip: 0,
}

export { tableProps, defaultPagination }

