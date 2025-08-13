import ButtonContact from "@/components/elements/ButtonContact";
import AboutSection from "@/components/sections/about/AboutSection";
import CardsSection from "@/components/sections/cards/CardsSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import LookSection from "@/components/sections/look/LookSection";
import PhysicsObjects from "@/components/sections/physics-objects/PhysicsObjects";
import TextAnimationSection from "@/components/sections/text-animation/TextAnimationSection";

export default function Page(): React.JSX.Element {
    return(
        <>
            <AboutSection/>
            <TextAnimationSection/>
        </>
    )
}