import Link from "next/link"
import { usePathname } from "next/navigation"

const MenuSidebar = ({ name, icon, href = "#" }) => {
    const path = usePathname();
    return (
        <li>
            <Link
                href={href}
                className={` flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100   group`}
            >
                {icon}
                <span className="ml-3">{name}</span>
            </Link>
        </li>
    )
}

export default MenuSidebar