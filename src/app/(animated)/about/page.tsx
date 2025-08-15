import Header from "@/components/layout/header/Header";
import AboutSection from "@/components/sections/about/AboutSection";

export default function Page(): React.JSX.Element {
    return(
        <>
            <div id="hero-pin-shell" className="relative">
                <AboutSection/>                    
            </div>
        </>
    )
}