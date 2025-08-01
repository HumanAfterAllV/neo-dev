import Link from "next/link";

export const HeaderLogo = ({
    menuToggleBtnRef,
    openLabelRef,
    closeLabelRef,
}: {
    menuToggleBtnRef: React.RefObject<HTMLDivElement | null>;
    openLabelRef: React.RefObject<HTMLParagraphElement | null>;
    closeLabelRef: React.RefObject<HTMLParagraphElement | null>;
}): React.JSX.Element  => {
    return (
        <nav>
            <div className="logo">
                <div className="logo-container">
                    <p className="mn">
                        <Link href="/" className="text-white select-none">HumanDev ✦ Israel</Link>
                    </p>
                </div>
            </div>
            <div ref={menuToggleBtnRef} className="menu-toggle-btn ">
                <div className="menu-toggle-btn-wrapper">
                    <p ref={openLabelRef} className="mn open-label">Menu</p>
                    <p ref={closeLabelRef} className="mn close-label">Close</p>
                </div>
            </div>
        </nav>
    )
};