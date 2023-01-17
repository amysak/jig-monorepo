import { useEffect } from 'react'
import { useAppSelector } from 'store/index'
import toast, { Toaster } from 'react-hot-toast'

function AppNotification({ children }) {
    const notice = useAppSelector((state) => state.notification)
    const type = notice.type || 'blank'

    useEffect(() => {
        if (notice.type && notice.message) {
            toast[type](notice.message)
        }
    }, [])

    return (
        <>
            {children}
            <Toaster />
        </>
    )
}

export default AppNotification
