import { Col, Form, Input, Row, Table } from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useNavigate, useParams } from 'react-router-dom'
import {
    getDefaultLetters,
    getOneLetter,
    TGetDefaultLettersData,
    updateLetter,
} from '../../../api/letters'
import UILayout from '../../../components/templates/uilayout'
import { setTableRowClass } from '../../../utilities/utils'
import { PageHeader } from './components'

export default function Letter() {
    const params = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [letter, setLetter] = useState(null)
    const [letters, setLetters] = useState<TGetDefaultLettersData>([[], 0])

    const getOne = async () => {
        try {
            const letter = await getOneLetter(params.id)

            setLetter(letter)
        } catch (error) {
            console.log(error)
        }
    }

    const getAll = async () => {
        try {
            const letters = await getDefaultLetters()

            setLetters(letters)
        } catch (error) {
            console.log(error)
            toast.error('Failed to update!')
        }
    }

    useEffect(() => {
        getOne()
        getAll()
    }, [])

    useEffect(() => form.resetFields(), [letter])

    const onRowClick = (row: { id: any }) => {
        navigate(`/default-setup/letters/${row.id}`)
    }

    const onValuesChange = debounce(async (value, values) => {
        try {
            await updateLetter(params.id, values)
        } catch (error) {
            console.log(error)
        }
    }, 1000)

    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
        },
    ]

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    allowAlter
                    label={letter?.name}
                    parent={{ label: 'Letters', path: '/letters' }}
                />
            }
        >
            <Col className="pagewrapper">
                <Row>
                    <Col span={6} className="pagewrapper__leftside">
                        <Table
                            columns={columns}
                            dataSource={letters[0]}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            rowClassName={setTableRowClass(letter?.id)}
                            onRow={(row) => {
                                return {
                                    onClick: () => onRowClick(row),
                                }
                            }}
                        />
                    </Col>

                    <Col span={18}>
                        <div className="pagewrapper__maincontent">
                            <Form
                                onValuesChange={onValuesChange}
                                form={form}
                                layout="vertical"
                                initialValues={letter}
                            >
                                <Form.Item label="Letter Name" name="name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Body" name="description">
                                    <Input.TextArea rows={10} />
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Col>
        </UILayout>
    )
}
