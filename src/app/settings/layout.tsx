
import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
        <Sidebar />
            <div> 
                {children}
            </div>
        </>
    )
}