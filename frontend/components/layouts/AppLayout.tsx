import Sidebar from "./Sidebar";
import Header from "./Header";


export default function AppLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div className="h-screen flex flex-col">
            <Header />

            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6">{children}</main>
            </div>

        </div>
    )

}