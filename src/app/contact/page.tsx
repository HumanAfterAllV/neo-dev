import Footer from "@/components/layout/footer/Footer";
import ContactSection from "@/components/sections/contact/ContactSection";

export default function Page(): React.JSX.Element {
    return(
        <section className="w-screen h-svh pt-16 gap-44">
            <ContactSection/>
            <Footer/>
        </section>
    )
}