"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type MenuItems = {
    label: string;
    link: string;
}

export default function StickyHeader(): React.JSX.Element{

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<string>("Home");
    
    const menuItems: MenuItems[] = [
        { label: "Home", link: "/" },
        { label: "Quien soy", link:"/about" },
        { label: "Proyectos", link: "/projects" },
        { label: "Charlemos", link: "/contact" },
        { label: "Blog", link: "/blog" },
        { label: "CV", link:"/cv" }
    ];

    const handleItemClick = ( item:string ) => {
        setActiveItem(item);
        setIsOpen(false);
    }

    
    return(
        <>
            <header className="fixed inset-x-0 top-4 z-50 flex justify-center">
                <nav className="hidden md:block w-max px-6 py-2 brutalism-border bg-light rounded-[10px] ">
                    <ul className="flex flex-row items-center space-x-8 lg:space-x-32">
                        <li>
                            <Link href="/">
                                <Image src="/icon/human-logo.svg" alt="Logo" width={40} height={40} />
                            </Link>
                        </li>
                        {menuItems.map((item: MenuItems, index: number) => (
                            <li key={index}>
                                <Link
                                    href={item.link}
                                    className="font-grotesk font-extrabold text-2xl cursor-pointer"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="md:hidden border-4 rounded-full border-b-6 border-r-6 ml-auto z-50 bg-light">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-3"
                        aria-label="Toggle Menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <Image src={isOpen ? "/icon/close.svg" : "/icon/menu.svg" } height={24} width={24} alt={isOpen ? "Close" :  "Menu"}/>
                    </button>
                </div>
            </header>

            {isOpen && (
                <>
                    <div className="fixed inset-0 md:hidden" onClick={() => setIsOpen(false)}/>
                    <nav className="fixed top-20 left-4 right-4 z-50 md:hidden overflow-hidden rounded-2xl brutalism-border bg-light">
                        <ul className="py-2">
                            {menuItems.map((item: MenuItems, index: number) => (
                                <li key={index}>
                                    <Link
                                        className="flex items-center px-6 py-4 text-base font-medium"
                                        href={item.link}
                                        onClick={() => handleItemClick(item.label)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </>
    )
}