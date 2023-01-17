import { Row } from 'antd'
import React from 'react'

import './toolbar.scss'

function Toolbar(props: { children: React.ReactNode }) {
    return <Row className="jig-toolbar">{props.children}</Row>
}

export default Toolbar
