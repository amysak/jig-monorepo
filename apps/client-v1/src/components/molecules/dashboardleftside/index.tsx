import React from 'react'
import { Row, Button, Popover } from 'antd'

import CompanySetup from '../companysetup'
import Preferences from '../preferences'
import Users from '../users'

import './dashboardleftside.scss'

const links = [
    {
        text: 'COMPANY INFO',
        onClick: () => null,
        placement: 'rightTop',
        Component: CompanySetup,
        contentStyle: {
            width: '800px',
            height: '580px',
            overflowY: 'auto',
        },
    },
    {
        text: 'PREFERENCES',
        onClick: () => null,
        placement: 'right',
        Component: Preferences,
        contentStyle: {
            width: '800px',
            height: '530px',
            overflowY: 'auto',
        },
    },
    {
        text: 'USERS',
        onClick: () => null,
        placement: 'right',
        Component: Users,
        contentStyle: {
            width: '450px',
            height: 'auto',
            minHeight: '600px',
            overflowY: 'auto',
        },
    },
]

function ButtonLinks() {
    return (
        <>
            <Row className="">
                {links.map((link, index) => (
                    <Popover
                        key={index}
                        trigger="click"
                        //@ts-ignore
                        placement={link.placement}
                        content={
                            <link.Component style={link.contentStyle as any} />
                        }
                    >
                        <Button className="jig-button" block>
                            {link.text}
                        </Button>
                    </Popover>
                ))}
            </Row>

            <Row>
                {/*//@ts-ignore */}
                <Button className="jig-button" danger block classes="">
                    Exit
                </Button>
            </Row>
        </>
    )
}

export default ButtonLinks
