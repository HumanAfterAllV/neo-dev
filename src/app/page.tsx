import Footer from "@/components/layout/footer/Footer";
import HeroSection from "@/components/sections/hero/HeroSection";
import TextAnimationSection from "@/components/sections/text-animation/TextAnimationSection";

export default function Page(): React.JSX.Element {
    return(
        <>
            <HeroSection/>
            <TextAnimationSection />
            <Footer/>
        </>
    )
}