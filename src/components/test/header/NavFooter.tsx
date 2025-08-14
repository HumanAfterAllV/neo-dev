import Link from "next/link";

export const NavFooter = (): React.JSX.Element => {
    
    return (
        <div className="nav-footer">
            <div className="nav-footer-items font-barlow">
                <div className="nav-footer-item-header">
                    <p>Búscame en:</p>
                </div>
                <div className="nav-footer-item-copy">
                    <p className="flex-col flex">
                        <Link href="https://github.com/HumanAfterAllV" target="_blank">GitHub</Link>
                        <Link href="https://www.linkedin.com" target="_blank">LinkedIn</Link>
                    </p>
                </div>
            </div>
            <div className="nav-footer-items">
                <div className="nav-footer-item-copy font-barlow">
                    <p>HUMAN-DEV 2025 //</p>
                </div>
            </div>
            <div className="nav-footer-items">
                <div className="nav-footer-item-header bg-bg">
                    <p className="font-barlow">Di un hola!!</p>
                </div>
                <div className="nav-footer-item-copy">
                    <p className="font-barlow">
                        <Link href="mailto:contact@humandev.pro" target="_blank">
                            contact@humandev.pro
                        </Link>
                    </p>
                </div>
              
            </div>
        </div>
    )
};