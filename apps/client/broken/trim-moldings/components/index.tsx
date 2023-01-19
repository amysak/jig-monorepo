export {};
// import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
// import { Button, message, Popconfirm, Row, Tooltip } from 'antd'
// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router'
// import { deleteOneTrim, duplicateTrim } from '../../../../api/trims'
// import Toolbar from '../../Toolbar'
// import NewTrimMoldingFormPopover from '../NewTrimMoldingForm'

// interface PageHeaderProps {
//     allowAlter?: boolean
//     label: any | string
//     parent?: { label: string; path: string }
// }

// export function PageHeader({ parent, label, allowAlter }: PageHeaderProps) {
//     const [loading, setLoading] = useState(false)
//     const params = useParams<{ id?: string }>()
//     const navigate = useNavigate()

//     const onDelete = async () => {
//         try {
//             setLoading(true)

//             await deleteOneTrim(params.id)

//             navigate('/cabinet-setup/trim-moldings')
//         } catch (error) {
//             setLoading(false)
//             message.error('Unable to delete! Please, try again.')
//         }
//     }

//     const onDuplicate = async () => {
//         try {
//             setLoading(true)

//             const accessory = await duplicateTrim({ id: params.id })

//             navigate(`/cabinet-setup/trim-moldings/${accessory.id}`)
//         } catch (error) {
//             setLoading(false)
//             message.error('Unable to duplicate! Please, try again.')
//         }
//     }

//     return (
//         <Row justify="space-between">
//             <Toolbar label={label} parent={parent} />

//             <div>
//                 {allowAlter && (
//                     <>
//                         <Tooltip placement="bottom" title="Delete">
//                             <Popconfirm
//                                 title="Are you sure"
//                                 okText="Delete"
//                                 placement="bottom"
//                                 onConfirm={onDelete}
//                             >
//                                 <Button
//                                     loading={loading}
//                                     className="jig-button"
//                                     size="small"
//                                     icon={<DeleteOutlined />}
//                                 />
//                             </Popconfirm>
//                         </Tooltip>
//                         &nbsp; &nbsp;
//                         <Tooltip placement="bottom" title="Duplicate">
//                             <Popconfirm
//                                 title="Are you sure?"
//                                 okText="Duplicate"
//                                 placement="bottom"
//                                 onConfirm={onDuplicate}
//                             >
//                                 <Button
//                                     loading={loading}
//                                     className="jig-button"
//                                     size="small"
//                                     icon={<CopyOutlined />}
//                                 />
//                             </Popconfirm>
//                         </Tooltip>
//                         &nbsp; &nbsp;
//                     </>
//                 )}

//                 <NewTrimMoldingFormPopover />
//             </div>
//         </Row>
//     )
// }

// PageHeader.defaultProps = {
//     label: 'Trims/Moldings',
//     allowAlter: false,
// }
