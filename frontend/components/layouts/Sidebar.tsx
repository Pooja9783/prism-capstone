"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Settings,
    Bot,
} from "lucide-react";

const menuItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Requests",
        href: "/requests",
        icon: FileText,
    },
    {
        name: "Usage",
        href: "/usage",
        icon: BarChart3,
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 border-r bg-white flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b">
                <Bot className="text-blue-600 mr-2" size={28} />
                <h1 className="text-xl font-bold">Prism</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all
              ${pathname === item.href
                                    ? "bg-slate-800 text-white"
                                    : "text-slate-700 hover:bg-slate-100"
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t p-4">
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-medium">Demo User</p>
            </div>
        </aside>
    );
}