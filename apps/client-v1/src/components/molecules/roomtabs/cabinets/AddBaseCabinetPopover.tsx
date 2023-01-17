import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Table
} from 'antd'
import { TGetSetupCabinets } from 'api/cabinets'
import indefinite from 'indefinite'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import {
    getDefaultCabinetSpecification,
    getSetupCabinets
} from '../../../../api/cabinets'
import useFilter from '../../../../hooks/useFilter'
import { CabinetContext } from '../../../../store/cabinets'
import {
    capitalize,
    countNoneEmptyObjList,
    getQueryString,
    shortId
} from '../../../../utilities/utils'
import JigModal from '../../../organisms/modal'


interface AddBaseCabinetPopoverProps {
    category: string
    label: string
}

const cabinetStyles = ['Face Frame', 'Full Access']

function AddBaseCabinetPopover({
    category,
    label,
}: AddBaseCabinetPopoverProps) {
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const [selectedCabinet, setSelectedCabinet] = React.useState(null)
    const cabinetCtx = useContext(CabinetContext)
    const [cabinets, setCabinets] = useState<TGetSetupCabinets>([[], 0])
    const [specification, setSpecification] = useState({})
    const [filters, setFilters] = useFilter('room-cabinets', {
        style: cabinetStyles[0],
    })

    const getSpecifications = async () => {
        try {
            const spec = await getDefaultCabinetSpecification()

            setSpecification(spec)
        } catch (error) {
            console.log('failed to get specifications')
        }
    }

    const getCabinets = async (queryFilters = filters) => {
        try {
            const query = getQueryString({ ...queryFilters, category })
            const cabinets = await getSetupCabinets(query)

            setFilters(queryFilters)
            setCabinets(cabinets)
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getCabinets(filters)
        getSpecifications()
    }, [])

    const onRowClick = (cabinetsId: any[]) => {
        setSelectedCabinet(
            // @ts-ignore
            cabinets[0].find((cab: { id: any }) => cab.id === cabinetsId[0])
        )
    }

    const onFinish = async (values) => {
        try {
            await cabinetCtx.onCreateRoomCabinets(selectedCabinet.id, {
                ...values,

                room: params.id,
            })
        } catch (error) {
            console.error(error)
        } finally {
        }
    }

    const onValuesChange = (filter: object) => {
        if (['name', 'style'].includes(Object.keys(filter)[0])) {
            getCabinets({
                ...filters,
                ...filter,
            })
        }
    }

    const onFavourite = (_row) => {
        return async (event) => {
            try {
                console.log(event)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const initialValues = {
        cabinet_height: 34.5,
        quantity_parts: 1,

        cabinet_width: specification[category.toLowerCase()]?.cabinet_height,
        ...filters,
    }

    const addBaseCabinetColumns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Base Doors',
            key: 'base_doors',
            dataIndex: 'base_doors',
        },
        {
            title: 'Upper Doors',
            key: 'upper_doors',
            dataIndex: 'upper_doors',
        },
        {
            title: 'Drawer Fronts',
            key: 'drawer_fronts',
            dataIndex: 'number_of_drawer_fronts',
        },
        {
            title: 'Drawers',
            key: 'drawers',
            dataIndex: 'drawers',

            render(value, cabinet: { drawer_part: any[] }) {
                return countNoneEmptyObjList(cabinet.drawer_part)
            },
        },
        {
            title: 'Favorite',
            key: 'favorite',
            dataIndex: 'favorite',

            render(checked: boolean, row) {
                return <Checkbox checked={checked} onClick={onFavourite(row)} />
            },
        },
    ]

    return (
        <JigModal label={label} title={`Add ${capitalize(category)} Cabinet`}>
            <Form
                onValuesChange={onValuesChange}
                layout="vertical"
                initialValues={initialValues}
                form={form}
                onFinish={onFinish}
                className="roomspopover"
            >
                <Form.Item
                    name="style"
                    label="Filter List by Selecting a Cabinet Style"
                >
                    <Select style={{ width: '200px' }} allowClear>
                        {cabinetStyles.map((style) => (
                            <Select.Option value={style} key={shortId()}>
                                {style}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Search by name" name="name">
                    <Input />
                </Form.Item>

                <Col span={24} className="table-col-wrapper">
                    <Form.Item
                        label={`Choose ${indefinite(
                            category
                        )} cabinet from the list below`}
                    >
                        <Table
                            columns={addBaseCabinetColumns}
                            dataSource={cabinets[0]}
                            pagination={false}
                            rowKey="id"
                            rowSelection={{
                                type: 'radio',
                                onChange: onRowClick,
                            }}
                        />
                    </Form.Item>
                </Col>

                <br />

                <Form.Item
                    label="Enter a Cabinet Width"
                    name="cabinet_width"
                    rules={[
                        {
                            required: true,
                            message: 'Please, enter a cabinet width.',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Confirm Default Cabinet Height (Edit optional)"
                    name="cabinet_height"
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Change Cabinet Quantity (optional)"
                    name="quantity_parts"
                >
                    <InputNumber />
                </Form.Item>

                <Row justify="end">
                    <Button
                        htmlType="submit"
                        disabled={!selectedCabinet}
                        className="jig-button"
                    >
                        Add Cabinet
                    </Button>
                </Row>
            </Form>
        </JigModal>
    )
}

export default AddBaseCabinetPopover
