import { Button, Form, Input, Row, Select, Tabs } from 'antd'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClientsContext } from '../../store/clients'
import { shortId } from '../../utilities/utils'

export default function PickOrSelectClient({ onNext }) {
    const params = useParams<{ clientId?: string }>()
    const [form] = Form.useForm()
    const [tab, setTab] = useState('0')
    const [loading, setLoading] = useState(false)
    const clientCtx = useContext(ClientsContext)

    const onSearch = (input) => {
        if (input) {
            clientCtx.onGetClients(`s=${input}&select=client.id,client.name`)
        }
    }

    const onChange = async (clientId) => {
        try {
            setLoading(true)

            await clientCtx.onGetOneCLient(clientId)
            onNext()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitNewClient = async (values) => {
        try {
            setLoading(true)

            await clientCtx.onCreateClient(values)

            onNext()
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if (
            params.clientId &&
            (!clientCtx.client || clientCtx.client?.id !== params.clientId)
        ) {
            clientCtx.onGetOneCLient(params.clientId)
        }
    }, [])

    return (
        <Row
            align="middle"
            justify="center"
            className="pickorselect-client-wrapper bordered-row"
        >
            <Tabs
                defaultActiveKey={tab}
                style={{ width: '100%' }}
                onChange={setTab}
            >
                <Tabs.TabPane
                    tab="Select existing Client."
                    key="0"
                    className="pickorselect-client-tabs"
                >
                    <Select
                        value={clientCtx.client?.id}
                        style={{ width: '100%' }}
                        showSearch
                        loading={loading}
                        onSearch={onSearch}
                        onChange={onChange}
                        placeholder="Search and select for an existing Client."
                        filterOption={(input, options) => {
                            const regex = new RegExp(input, 'ig')

                            // @ts-expect-error TS(2345): Argument of type 'Omit<DefaultOptionType, "childre... Remove this comment to see the full error message
                            return regex.test(options?.children)
                        }}
                    >
                        {clientCtx.clients?.[0].map(
                            (eachClient: { id: any; name: any }) => (
                                <Select.Option
                                    key={shortId()}
                                    value={eachClient.id}
                                >
                                    {eachClient.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Create a new Client." key="1">
                    <Form form={form} onFinish={onSubmitNewClient}>
                        <Form.Item name="name">
                            <Input placeholder="Create a new Client." />
                        </Form.Item>

                        <br />
                        <br />

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="jig-button"
                                loading={loading}
                                size="small"
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>
            </Tabs>
        </Row>
    )
}
