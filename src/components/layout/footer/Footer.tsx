
import FooterLinks from "./FooterLinks";
import FooterEmail from "./FooterEmail";
import FooterCopyright from "./FooterCopyright";

export default function Footer(): React.JSX.Element {
    return (
        <footer>
            <div className="container">
                <FooterLinks />
                <FooterCopyright />
            </div>
        </footer>
    )
}