import Link from "next/link";

export const NavFooter = (): React.JSX.Element => {
    
    return (
        <div className="nav-footer">
            <div className="nav-footer-items">
                <div className="nav-footer-item-header">
                    <p>Búscame en:</p>
                </div>
                <div className="nav-footer-item-copy">
                    <p>
                        <Link href="https://github.com" target="_blank">GitHub</Link>
                        <Link href="https://www.linkedin.com" target="_blank">LinkedIn</Link>
                    </p>
                </div>
            </div>
            <div className="nav-footer-item">
                <div className="nav-footer-item-copy">
                    <p>HUMAN-DEV 2025 //</p>
                </div>
            </div>
            <div className="nav-footer-item">
                <div className="nav-footer-item-header">
                    <p>Vamos a trabajar juntos, saluda.</p>
                </div>
                <div className="nav-footer-item-copy">
                    <Link href="mailto:contact@humandev.pro" target="_blank">
                        contact@humandev.pro
                    </Link>
                </div>
            </div>
        </div>
    )
};