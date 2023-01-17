import { Layout } from 'antd'
import React, { FC, ReactNode } from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import HeaderContent from '../../organisms/header'
import navLinks from '../../organisms/header/navLinks'
import AppDrawer from '../../organisms/sidebar'

import Toolbar from '../toolbar'
import './uilayout.scss'

const { Header, Content } = Layout

interface IUILayout {
    ToolbarContent?: null | JSX.Element
    className?: string
    fixedWidth?: boolean
    children?: ReactNode
}

const UILayout: FC<IUILayout> = ({ ToolbarContent, className, ...props }) => {
    const hasToolbar = React.isValidElement(ToolbarContent)

    return (
        <StickyContainer>
            <Layout className={`pagelayout ${className}`}>
                <AppDrawer />
                <Layout
                    style={{
                        minHeight: '100vh',
                        backgroundColor: 'transparent',
                    }}
                >
                    <Sticky topOffset={100}>
                        {({ style, isSticky }) => {
                            return (
                                <header
                                    style={{
                                        zIndex: 1500,
                                        width: '100%',
                                        ...style,
                                    }}
                                    className={
                                        isSticky ? 'animated slideInDown' : ''
                                    }
                                >
                                    <Header>
                                        <HeaderContent navLinks={navLinks} />
                                    </Header>
                                </header>
                            )
                        }}
                    </Sticky>

                    <div className="pagelayout__contentwrapper">
                        {hasToolbar ? (
                            <Toolbar>{ToolbarContent}</Toolbar>
                        ) : null}
                        <Content
                            className={`${
                                hasToolbar
                                    ? 'pagelayout__contenttoolbar'
                                    : 'pagelayout__content'
                            }`}
                        >
                            {props.children}
                        </Content>
                    </div>
                </Layout>
            </Layout>
        </StickyContainer>
    )
}

UILayout.defaultProps = {
    ToolbarContent: null,
    className: '',
    fixedWidth: false,
}

export default UILayout
