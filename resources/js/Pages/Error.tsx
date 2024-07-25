import Guest from "@/Layouts/GuestLayout"
import { Head } from "@inertiajs/react"
import { useMemo } from "react"

export default function Error({ status }: { status: number }) {
    const titlle = useMemo(() => {
        return (
            {
                404: 'Page Not Found',
                403: 'Forbidden'
            }[status] || 'Whoops, Something went wrong!'
        )
    }, [status])

    const description = useMemo(() => {
        return (
            {
                404: 'Sorry, the page you are looking for could not be found.',
                403: 'Sorry, you are forbidden from accessing this page.'
            }[status] || 'Whoops, Something went wrong!'
        )
    }, [status])

    return (
        <Guest>
            <Head title={titlle} />
            <div className="mb-4 text-sm font-medium text-red-600">
                {description}
            </div>
        </Guest>
    )
}
