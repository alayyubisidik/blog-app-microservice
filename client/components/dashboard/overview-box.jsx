import Link from "next/link"

const OverviewBox = ({ count, href, icon, color, name }) => {
    return (
        <div className="rounded-lg  h-32 md:h-64">
            <Link href={href} className={`block w-full h-full p-6 bg-${color}-500 border border-gray-200 rounded-lg shadow hover:bg-${color}-400 `}>
                <div className="flex gap-5 items-center h-full">
                    <div className="w-[20%] flex justify-center items-center">
                        {icon}
                    </div>
                    <h5 className="flex-2 mb-2 text-2xl font-bold tracking-tight text-white ">{count} {name}</h5>
                </div>
            </Link>
        </div>
    )
}

export default OverviewBox