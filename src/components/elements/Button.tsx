
export default function Button({label}: {label: string}): React.JSX.Element {
    return (
        <button className="brutalism-btn font-grotesk font-extrabold text-2xl w-auto px-4 py-2">
            {label}
        </button>
    )
}