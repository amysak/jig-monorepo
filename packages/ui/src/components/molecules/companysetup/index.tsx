import { Avatar, Col, message, Row, Typography } from 'antd'
import { CSSProperties, useContext, useEffect, useState } from 'react'

import { SyncOutlined } from '@ant-design/icons'

import CompanyNameForm from '../companynameform'
import BillingAddressForm from './billingaddressform'
import MailAddressForm from './mailaddressform'

import { uploadAccountImage } from '../../../api/account'
import { AccountContext } from '../../../store/account'
import './companysetup.scss'

const { Title } = Typography

function CompanySetup({ style }: { style?: CSSProperties }) {
    const [loading, setLoading] = useState(false)
    const [url, setURL] = useState('')
    const accountCtx = useContext(AccountContext)

    useEffect(() => {
        //@ts-ignore
        setURL(accountCtx.account?.image_url)
    }, [accountCtx])

    const onChange = async (event: { target: { files: any[] } }) => {
        try {
            setLoading(true)
            const data = new FormData()

            const file = event.target?.files?.[0]
            data.append('file', file)

            const result = await uploadAccountImage(data)

            setURL(result.url)

            message.success(`${file.name} file uploaded successfully.`)
        } catch (error) {
            // @ts-expect-error TS(2552): Cannot find name 'file'. Did you mean 'File'?
            // eslint-disable-next-line no-undef
            message.error(`${file?.name} file upload failed.`)
        } finally {
            setLoading(false)
        }
    }

    const inputProps = {
        onChange,
        accept: 'image/png, image/jpeg',
        type: 'file',
        id: 'company-logo',
        name: 'company-logo',
        style: { display: 'none' },
    }

    return (
        <Col style={style} className="companySetupWrapper">
            <Row className="companySetupWrapper__top">
                <Col span={11} className="companySetupWrapper__top-left">
                    <Title level={3}>Company Setup</Title>

                    <CompanyNameForm />
                </Col>
                <Col
                    offset={2}
                    span={11}
                    className="companySetupWrapper__top-right"
                >
                    {/* @ts-expect-error TS(2322): Type '{ onChange: (event: { target: { files: any[]... Remove this comment to see the full error message */}
                    <input {...inputProps} />
                    <label
                        htmlFor="company-logo"
                        className="company-logo-label"
                    >
                        {loading ? (
                            <SyncOutlined spin />
                        ) : (
                            <Avatar size={150} shape="square" src={url} />
                        )}
                    </label>
                </Col>
            </Row>

            <br />

            <Row className="companySetupWrapper__bottom">
                <Col span={11} className="companySetupWrapper__bottom-left">
                    <MailAddressForm />
                </Col>

                <Col
                    offset={2}
                    span={11}
                    className="companySetupWrapper__bottom-right"
                >
                    <BillingAddressForm />
                </Col>
            </Row>
        </Col>
    )
}

export default CompanySetup
