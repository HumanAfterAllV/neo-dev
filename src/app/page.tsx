import Footer from "@/components/layout/footer/Footer";
import ContactSection from "@/components/sections/contact/ContactSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import StickyTitle from "@/components/sections/sticky-title/StickyTitle";

export default function Page(): React.JSX.Element {
    return(
        <>
            <HeroSection/>
            <StickyTitle/>
            
            <ContactSection/>
            <Footer/>
        </>
    )
}