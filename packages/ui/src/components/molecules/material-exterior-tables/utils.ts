export const modelDescriptionDisabled = (key) => {
    return ['fillers', 'toe_skin', 'face_frame', 'edge_banding'].includes(key)
}

export const materialSourceDisabled = (key) => {
    return ['edge_banding'].includes(key)
}

export const panelProfileDisabled = (key) => {
    return [
        'slab_end',
        'fillers',
        'toe_skin',
        'face_frame',
        'edge_banding',
    ].includes(key)
}

export const edgeProfileDisabled = (key) => {
    return ['fillers', 'toe_skin', 'face_frame', 'edge_banding'].includes(key)
}

export const frameProfileDisabled = (key) => {
    return [
        'slab_end',
        'fillers',
        'toe_skin',
        'face_frame',
        'edge_banding',
    ].includes(key)
}

export const finishProcessSourceDisabled = (key) => {
    return ['edge_banding'].includes(key)
}

export const finishProcessDisabled = (key) => {
    return ['edge_banding'].includes(key)
}

export const painStainDisabled = (key) => {
    return ['edge_banding'].includes(key)
}

export const glazeColorDisabled = (key) => {
    return ['edge_banding'].includes(key)
}

const allColumns = [
    'door',
    'material_source',
    'material',
    'panel_profile',
    'edge_profile',
    'frame_profile',
    'finish_process_source',
    'finish_process',
    'paint_stain_color',
    'glaze_color',
]

const slabColumns = [
    'door',
    'material_source',
    'material',
    'edge_profile',
    'finish_process_source',
    'finish_process',
    'paint_stain_color',
    'glaze_color',
]

const fillersColumns = [
    'material_source',
    'material',
    'edge_profile',
    'finish_process_source',
    'finish_process',
    'paint_stain_color',
    'glaze_color',
]

const edgeBandingColumns = ['material']

export const materialTblParameters = [
    {
        key: 'door_base',
        label: 'Door (Base)',
        allowedColumns: allColumns,
    },
    {
        key: 'door_upper',
        label: 'Door (Upper)',
        allowedColumns: allColumns,
    },
    {
        key: 'drawer_front',
        label: 'Drawer (Front)',
        allowedColumns: allColumns,
    },
    {
        key: 'appliance_panel',
        label: 'Appliance Panel',
        allowedColumns: allColumns,
    },
    {
        key: 'panelized_end',
        label: 'Panelized End',
        allowedColumns: allColumns,
    },
    {
        key: 'wainscot_panel',
        label: 'Wainscot Panel',
        allowedColumns: allColumns,
    },
    {
        key: 'slab_end',
        label: 'Slab End',
        allowedColumns: slabColumns,
    },
    {
        key: 'fillers',
        label: 'Fillers',
        allowedColumns: fillersColumns,
    },
    {
        key: 'toe_skin',
        label: 'Toe Skin',
        allowedColumns: fillersColumns,
    },
    {
        key: 'face_frame',
        label: 'Face Frame',
        allowedColumns: fillersColumns,
    },
    {
        key: 'edge_banding',
        label: 'Edge Banding',
        allowedColumns: edgeBandingColumns,
    },
]
