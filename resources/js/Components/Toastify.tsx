import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Toastify() {
    const page = usePage<PageProps>();

    useEffect(() => {
        if (page?.props?.message?.type === 'success') {
            toast.success(page.props.message.body, {
                position: 'top-right',
                duration: 5000
            })
        } else if (page?.props?.message?.type === 'error') {
            toast.error(page.props.message.body, {
                position: 'top-right',
                duration: 5000
            })
        }
    }, [page.props.message])

    return (
        <>
            <Toaster />
        </>
    )
}
