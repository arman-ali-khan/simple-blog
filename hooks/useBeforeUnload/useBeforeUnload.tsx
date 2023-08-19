import { useEffect } from 'react'

// My hook simple reset session storage when user trigger a browser refresh

export default function useBeforeUnload() {
    useEffect(() => {
        const eventListener = (event) => {
            // you can do what you want here
            sessionStorage.clear()
        }

        window.addEventListener('beforeunload', eventListener)

        return () => {
            window.removeEventListener('beforeunload', eventListener)
        }
    }, [])
}