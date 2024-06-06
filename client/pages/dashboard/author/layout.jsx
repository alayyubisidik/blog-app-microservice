import Link from "next/link";
import CategoryIcon from "../../../components/dashboard/icon/category-icon";
import FeedbackIcon from "../../../components/dashboard/icon/feedback-icon";
import HomeIcon from "../../../components/dashboard/icon/home-icon";
import OverviewIcon from "../../../components/dashboard/icon/overview-icon";
import PostIcon from "../../../components/dashboard/icon/post-icon";
import SignoutIcon from "../../../components/dashboard/icon/signout-icon";
import UserIcon from "../../../components/dashboard/icon/user-icon";
import MenuSidebar from "../../../components/dashboard/menu-sidebar";
import SearchBar from "../../../components/dashboard/search-bar";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";


export default function DashboardAuthorLayout({ children }) {
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdownVisibility = () => {
        setIsDropdownVisible((prevVisibility) => !prevVisibility);
    };

    const handleSignout = async () => {
        setLoading(true);
    
        const response = await axios.post('/api/users/signout');
    
        if (response.status === 200) {
            Router.push('/auth/signin');
            setLoading(false);
        } else { 
            console.log(response.data);
        }
    }


    return (
        <div className="antialiased bg-gray-50 pt-[5rem]">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5  fixed left-0 right-0 top-0 z-50">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">.
                        <button
                            data-drawer-target="drawer-navigation"
                            data-drawer-toggle="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden  hover:bg-gray-100 focus:bg-gray-100  focus:ring-2 focus:ring-gray-100    "
                        >
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                aria-hidden="true"
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Toggle sidebar</span>
                        </button>
                        <Link
                            href="/"
                            className="flex items-center justify-between mr-4"
                        >
                            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                                Blog App
                            </span>
                        </Link>
                        <SearchBar/>
                    </div>
                    <div className="flex items-center lg:order-2 ">
                        <button
                            type="button"
                            data-drawer-toggle="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="p-2 mr-1 text-gray-500 rounded-lg md:hidden  hover:bg-gray-100    focus:ring-4 focus:ring-gray-300 "
                        >
                            <span className="sr-only">Toggle search</span>
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                ></path>
                            </svg>
                        </button>
                        <button
                            onClick={toggleDropdownVisibility}
                            type="button"
                            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
                            id="user-menu-button"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                                alt="user photo"
                            />
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div
                            className={` ${isDropdownVisible ? '' : 'hidden'} absolute top-[50px] right-[10px] z-50 my-4 w-56 text-base list-none bg-white  divide-y divide-gray-100 shadow   rounded-xl`}
                            id="dropdown"
                        >
                            <div className="py-3 px-4">
                                <span className="block text-sm font-semibold text-gray-900 ">
                                    Neil Sims
                                </span>
                                <span className="block text-sm text-gray-900 truncate ">
                                    name@flowbite.com
                                </span>
                            </div>
                            <ul
                                className="py-1 text-gray-700 "
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <Link
                                        href="/profile"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100   "
                                    >
                                        My profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100   "
                                    >
                                        Home
                                    </Link>
                                </li>
                            </ul>
                            <ul
                                className="py-1 text-gray-700 "
                                aria-labelledby="dropdown"
                            >
                                <li onClick={handleSignout}>
                                    <Link
                                        href="#"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100  "
                                    >
                                        {loading ? "Signing out.." : "Sign out"}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <!-- Sidebar --> */}

            <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0  "
                aria-label="Sidenav"
                id="drawer-navigation"
            >
                <div className="overflow-y-auto py-5 px-3 h-full bg-white ">
                    <form action="#" method="GET" className="md:hidden mb-2">
                        <label htmlFor="sidebar-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative ">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="sidebar-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2     "
                                placeholder="Search"
                            />
                        </div>
                    </form>
                    <ul className="space-y-2">

                        <MenuSidebar
                            name={"Overview"}
                            href={'/dashboard/author'}
                            icon={<OverviewIcon width={22} height={22} color={"black"}/>}
                        />

                        <MenuSidebar 
                            name={"Post"}
                            href={'/dashboard/author/post'}
                            icon={<PostIcon width={22} height={22} color={"black"}/>}
                        />

                    </ul>
                    <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 ">
                        <div className="cursor-pointer" onClick={handleSignout}>
                            <MenuSidebar 
                                name={"Sign Out"}
                                icon={<SignoutIcon width={22} height={22} color={"black"}/>}
                            />
                        </div>

                    </ul>
                </div>
            </aside>

            <main className="p-4 md:ml-64 h-auto ">
                {children}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg  h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-32 md:h-64"></div>
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300  h-96 mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300  h-96 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300  h-48 md:h-72"></div>
                </div> */}
            </main>
        </div>
    );
}
