import React from 'react'
import { Link } from 'react-router-dom'

import LogoImg from '../../../assets/images/logos/svgs/Icon.svg'

import './logo.scss'

function Logo({ scale = 35 }) {
    return (
        <Link to="/" className="jiglogo">
            <LogoImg height={scale} width={scale} />
        </Link>
    )
}

export default Logo
