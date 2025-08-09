import Link from "next/link";

export default function ButtonContact(): React.JSX.Element {
    return(
        <>
            <div className="contact-button ">
                <Link href="/contact"></Link>
                <div className="font-barlow text-3xl">
                    <p>Colabora conmigo y hagamos algo increíble</p>
                </div>
                <div className="font-grotesk font-bold text-[7rem]">Contáctame</div>
            </div>
        </>
    )
}