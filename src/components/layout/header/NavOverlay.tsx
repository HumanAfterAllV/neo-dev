import Link from "next/link";
import { NavFooter } from "./NavFooter";

type MenuItems = {
    label: string;
    href: string;
};

export const NavOverlay = ({
    navOverlayRef,
    navItemsRef,
} : {
    navOverlayRef: React.RefObject<HTMLDivElement | null>;
    navItemsRef: React.RefObject<HTMLDivElement[]>;
}
): React.JSX.Element => {

    const menuItems: MenuItems[] = [
        { label: "Inicio", href: "/" },
        { label: "Proyectos", href: "/work" },
        { label: "Blog", href: "/about" },
        { label: "Contacto", href: "/contact" }
    ];

    return (
        <div ref={navOverlayRef} className="nav-overlay">
            <div className="nav-items">
                {menuItems.map((item: MenuItems, index: number) => (
                    <div
                        ref={el => {
                            if (el) navItemsRef.current[index] = el;
                        }}
                        className="nav-item"
                        key={index}
                    >
                        <p>
                            <Link href={item.href}>{item.label}</Link>
                        </p>
                    </div>
                ))}
            </div>
            <NavFooter />
        </div>
    )
};