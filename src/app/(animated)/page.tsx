import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ContactSection from "@/components/sections/contact/ContactSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import StickyTitle from "@/components/sections/sticky-title/StickyTitle";

export default function Page(): React.JSX.Element {
    return(
        <>
            <div id="hero-pin-shell" className="relative">
                <HeroSection />
                    
            </div>
        </>
    )
}