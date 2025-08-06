import Link from "next/link";

type Links = {
    label: string;
    href: string;
}

export default function FooterLinks(): React.JSX.Element {

    const links: Links[] = [
        { label: "Quien es HumanDeveloper", href: "/about" },
        { label: "Mi trabajo honesto", href: "/projects" },
        { label: "Vamos a charlar", href: "/contact" }
    ];

    const socialLinks: Links[] = [
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "Github" , href: "https://github.com" },
        { label: "Twitter", href: "https://twitter.com" }
    ];
    
    return (
        <div className="footer-bottom">
            <div className="footer-col">
                <div className="footer-logo">
                    <img src="/global/logo.png" alt="" />
                </div>
            </div>
            <div className="footer-col">
                <div className="footer-sub-col">
                    <p className="mono">Explorar</p>
                    <div className="footer-links">
                        {links.map((link) => (
                            <p key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </p>
                        ))}
                    </div>
                </div>
                <div className="footer-sub-col">
                    <p className="mono">Sígueme o contactarme</p>
                    <div className="footer-copy">
                        <Link href="mailto:contact@humandev.pro">contact@humandev.pro</Link>
                        <br />
                        {socialLinks.map((link) => (
                            <p key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}