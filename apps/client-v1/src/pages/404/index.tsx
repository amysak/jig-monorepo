import React from 'react'
import { Link } from 'react-router-dom'

import UILayout from '../../components/templates/uilayout'

function NotFound() {
    return (
        <UILayout>
            You must be lost
            <Link to="/">Go back home</Link>
        </UILayout>
    )
}

export default NotFound
