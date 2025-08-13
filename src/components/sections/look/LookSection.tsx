import { Link } from "lucide-react";

export default function LookSection(): React.JSX.Element {
    return (
        <section className="h-[800px] bg-bg relative w-full">
            <div className="absolute top-0 left-0 w-full px-22 flex justify-between items-center font-barlow text-sm text-black">
                <p>Visual Vault [ 10 ]</p>
                <p>///////////////////</p>
                <p><Link href="/work">Browse Full Bizarre</Link></p>
            </div>
            <div className="h-full w-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4">Checa mis blogs mas recientes</h1>
                <div >
                    <h1 className="text-6xl">&#8595;</h1>
                </div>
            </div>
        </section>
    )
}   