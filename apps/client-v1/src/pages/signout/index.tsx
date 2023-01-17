import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../store/auth'

function Signout() {
    const authCtx = useContext(AuthContext)

    const onSignout = () => {
        try {
            authCtx.onSignOut()
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        onSignout()
    }, [])

    return <Navigate to="/signin" />
}

export default Signout
