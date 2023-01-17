import { inputNumberProps, inputNumberPropsNoDecimal } from '../../../utilities'

const numberList = [0, 1, 2]

const height = [
    {
        useTitle: true,
        key: 'cabinet_height',
        label: 'Floor to top of cabinet',
        inputProp: inputNumberProps,
    },
    {
        key: 'cabinet_depth',
        label: 'Cabinet depth',
        inputProp: inputNumberProps,
    },
    {
        key: 'floor_to_bottom_of_upper',
        label: 'Floor to Bottom of Upper Cabinet',
        excludes: ['base', 'vanity', 'tall'],
        isLast: true,
        inputProp: inputNumberProps,
    },
]

const top = [
    {
        useTitle: true,
        dataType: 'boolean',
        key: 'include_top',
        label: 'Include top',
    },
    {
        key: 'number_of_top_finished_sides',
        label: '# of Finished Sides',
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
    {
        key: 'depth_difference_top',
        label: 'Depth difference',
        isLast: true,
        inputProp: inputNumberProps,
    },
]

const back = [
    {
        useTitle: true,
        dataType: 'boolean',
        key: 'include_back',
        label: 'Include back',
    },
    {
        key: 'number_of_back_finished_sides',
        label: '# of Finished Sides',
        isLast: true,
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
]

const backStretcher = [
    {
        useTitle: true,
        key: 'depth_top_back_stretcher',
        label: 'Depth',
        inputProp: inputNumberProps,
    },
    {
        key: 'number_of_top_back_stretcher_finished_sides',
        label: '# of Finished Sides',
        isLast: true,
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
]

const nailer = [
    {
        useTitle: true,
        key: 'nailer_height',
        label: 'Height',
        inputProp: inputNumberProps,
    },
    {
        key: 'nailer_quantity',
        label: 'Quantity',
        inputProp: inputNumberPropsNoDecimal,
    },
    {
        key: 'number_of_nailer_finished_sides',
        label: '# of finished sides',
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
    {
        dataType: 'boolean',
        key: 'subtract_nailer_from_back',
        label: 'Subtract nailer from back',
        isLast: true,
    },
]

const topFrontStretcher = [
    {
        useTitle: true,
        key: 'depth_top_front_stretcher',
        label: 'Depth',
        inputProp: inputNumberProps,
    },
    {
        key: 'number_of_top_front_stretcher_finished_sides',
        label: '# of finished sides',
        isLast: true,
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
]

const stretcherBelowDrawer = [
    {
        useTitle: true,
        key: 'depth_stretcher_below_drawer',
        label: 'Depth',
        inputProp: inputNumberProps,
    },
    {
        key: 'number_of_stretcher_below_drawer_finished_sides',
        label: '# of finished sides',
        isLast: true,
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
]

const adjustedShelves = [
    {
        useTitle: true,
        key: 'number_of_adjusted_shelves',
        label: '# of shelves',
        inputProp: inputNumberPropsNoDecimal,
    },
    {
        key: 'number_of_adjusted_shelves_finished_sides',
        label: '# of finished sides',
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
    {
        key: 'depth_difference_adjusted_shelves',
        label: 'Depth difference',
        isLast: true,
        inputProp: inputNumberProps,
    },
]

const fixedShelves = [
    {
        useTitle: true,
        key: 'number_of_fixed_shelves',
        label: '# of shelves',
        inputProp: inputNumberPropsNoDecimal,
    },
    {
        key: 'number_of_fixed_shelves_finished_sides',
        label: '# of finished sides',
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
    {
        key: 'depth_difference_fixed_shelves',
        label: 'Depth difference',
        isLast: true,
        inputProp: inputNumberProps,
    },
]

const includeDeck = [
    {
        useTitle: true,
        dataType: 'boolean',
        key: 'include_deck',
        label: 'Include deck',
    },
    {
        key: 'number_of_deck_finished_sides',
        label: '# of Finished Sides',
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
    {
        key: 'depth_difference_deck',
        label: 'Depth difference',
        isLast: true,
        inputProp: inputNumberProps,
    },
]

const cabinetSides = [
    {
        useTitle: true,
        key: 'number_of_cabinet_sides',
        label: '# of sides',
        inputProp: inputNumberPropsNoDecimal,
    },
    {
        key: 'number_of_cabinet_finished_sides',
        label: '# of finshed sides',
        isLast: true,
        inputProp: inputNumberPropsNoDecimal,
        dataType: 'select',
        options: numberList,
    },
]

const cabinetProps = {
    height,
    top,
    'cabinet back': back,
    'top back stretcher': backStretcher,
    nailer,
    'top front stretcher': topFrontStretcher,
    'stretcher below drawer': stretcherBelowDrawer,
    'adjusted shelves': adjustedShelves,
    'fixed shelves': fixedShelves,
    'include deck': includeDeck,
    'cabinet sides': cabinetSides,
}

const cabinetTypes = ['base', 'vanity', 'tall', 'upper']

const cabinetTypesMap = Object.keys(cabinetProps).reduce((result, key) => {
    result[key] = {}

    for (let i = 0; i <= cabinetProps[key].length - 1; i += 1) {
        const {
            label,
            dataType,
            options,
            excludes,
            useTitle,
            isLast,
            inputProp,
        } = cabinetProps[key][i]

        result[key][cabinetProps[key][i].key] = {
            label,
            dataType,
            excludes,
            types: cabinetTypes,
            useTitle,
            isLast,
            options,
            inputProp,
        }
    }

    return result
}, {})

export { cabinetTypesMap, cabinetTypes, numberList }
