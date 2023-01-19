export {};
// import React from 'react'
// import { Row, Col, Form, Select, Typography, InputNumber, Input } from 'antd'

// import { CABINET_PARTS, PANEL_TYPES } from '../../../utilities/constants'
// import { tableSelectStyle } from '../../../components/molecules/roomtabs/utils'
// import { shortId, capitalize } from '../../../utilities/utils'
// import { useSelector } from 'react-redux'

// const { Title } = Typography

// const textAreaStyle = {
//     textAlign: 'right',
// }

// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 },
//     },
// }

// export default function Cabinet() {
//     const [form] = Form.useForm()

//     const cabinet = useSelector((state) => state.cabinet)

//     React.useEffect(() => form.resetFields(), [cabinet])

//     const onFinish = () => {
//         console.log('on finish')
//     }

//     return (
//         <Row className="pagewrapper">
//             <Col span={6} className="pagewrapper__leftside">
//                 <Form
//                     initialValues={cabinet}
//                     onFinish={onFinish}
//                     form={form}
//                     layout="vertical"
//                 >
//                     <Title level={3}>Panel Specification</Title>

//                     <Form.Item name="category" label="Cabinet type">
//                         <Select style={tableSelectStyle}>
//                             {CABINET_PARTS.map((cabinet) => (
//                                 <Select.Option value={cabinet} key={shortId()}>
//                                     {capitalize(cabinet)}
//                                 </Select.Option>
//                             ))}
//                         </Select>
//                     </Form.Item>

//                     <Form.Item label="Panel type">
//                         <Select style={tableSelectStyle}>
//                             {PANEL_TYPES.map((panel) => (
//                                 <Select.Option value={panel} key={shortId()}>
//                                     {capitalize(panel)}
//                                 </Select.Option>
//                             ))}
//                         </Select>
//                     </Form.Item>

//                     <br />
//                     <br />

//                     <Title level={3}>Additional Costs</Title>

//                     <Form.Item label="Additional Materials Costs">
//                         <InputNumber style={tableSelectStyle} />
//                     </Form.Item>

//                     <Form.Item label="Additional Installation Labor">
//                         <InputNumber style={tableSelectStyle} />
//                     </Form.Item>

//                     <Form.Item label="Additional Shop Labor">
//                         <InputNumber style={tableSelectStyle} />
//                     </Form.Item>

//                     <Form.Item label="Internal Note (non-printable)">
//                         <Input.TextArea rows={10} />
//                     </Form.Item>
//                 </Form>
//             </Col>

//             <Col xs={18} md={10}>
//                 <div className="pagewrapper__maincontent">
//                     <Form style={{ width: '100%' }} {...formItemLayout}>
//                         <Title level={4}>Appliance Panel</Title>

//                         <Form.Item label="Number of Finished Sides">
//                             <InputNumber max={2} style={tableSelectStyle} />
//                         </Form.Item>

//                         <Form.Item label="Appliance Panel Height">
//                             <InputNumber style={tableSelectStyle} />
//                         </Form.Item>

//                         <Form.Item label="Appliance Width X">
//                             <InputNumber style={tableSelectStyle} />
//                         </Form.Item>

//                         <Form.Item
//                             wrapperCol={{ offset: 6 }}

//                             // @ts-expect-error TS(2322): Type '{ textAlign: string; borderBottom: string; }... Remove this comment to see the full error message
//                             style={{
//                                 borderBottom: '2px solid #CCCCCC',
//                                 ...textAreaStyle,
//                             }}
//                         >
//                             /144
//                         </Form.Item>

//                         <Form.Item
//                             label="Appliance Panel Square Footage"

//                             // @ts-expect-error TS(2322): Type '{ textAlign: string; }' is not assignable to... Remove this comment to see the full error message
//                             style={textAreaStyle}
//                         >
//                             5
//                         </Form.Item>

//                         <Form.Item
//                             label="Number of Panels"
//                             extra="(Panelized Ends Only)"
//                         >
//                             <InputNumber max={4} style={tableSelectStyle} />
//                         </Form.Item>
//                     </Form>
//                 </div>
//             </Col>
//         </Row>
//     )
// }
