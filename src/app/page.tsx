import Footer from "@/components/layout/footer/Footer";
import CardsSection from "@/components/sections/cards/CardsSection";
import ContactButtonSection from "@/components/sections/contact-button/ContactButtonSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import LookSection from "@/components/sections/look/LookSection";
import PhysicsObjectsSpace from "@/components/sections/physics-objects/PhysicsObjectsSpace";
import StickyTitle from "@/components/sections/sticky-title/StickyTitle";
import TextAnimationSection from "@/components/sections/text-animation/TextAnimationSection";

export default function Page(): React.JSX.Element {
    return(
        <>
            <HeroSection/>
            <StickyTitle/>
            <ContactButtonSection/>
            <Footer/>
        </>
    )
}