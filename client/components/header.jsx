import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";

const Header = ({ currentUser }) => {
    const [loading, setLoading] = useState(false);

    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isAvatarVisible, setIsAvatarVisible] = useState(false);

    const toggleNavVisibility = () => {
        setIsNavVisible((prevVisibility) => !prevVisibility);
    };

    const toggleSidebarVisibility = () => {
        setIsSidebarVisible((prevVisibility) => !prevVisibility);
    };

    const toggleAvatarVisibility = () => {
        setIsAvatarVisible((prevVisibility) => !prevVisibility);
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
        <header className="bg-[#EEF7FF] fixed top-0 left-0 ring-0 z-50 w-full">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <p className="font-semibold text-lg">Blog App</p>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                        onClick={toggleSidebarVisibility}
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link
                        href="/"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Home
                    </Link>
                    <Link
                        href="#about"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        About
                    </Link>

                    {/* <div className="relative">
                        <button
                            onClick={toggleNavVisibility}
                            type="button"
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                            aria-expanded="false"
                        >
                            Category
                            <svg
                                className="h-5 w-5 flex-none text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        <div
                            className={`absolute ${
                                isNavVisible ? "block" : "hidden"
                            }  -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5`}
                        >
                            <div className="p-4">
                                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <svg
                                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-auto">
                                        <Link
                                            href="/"
                                            className="block font-semibold text-gray-900"
                                        >
                                            Analytics
                                            <span className="absolute inset-0"></span>
                                        </Link>
                                        <p className="mt-1 text-gray-600">
                                            Get a better understanding of your
                                            traffic
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                <Link
                                    href="/"
                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                >
                                    <svg
                                        className="h-5 w-5 flex-none text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Watch demo
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                >
                                    <svg
                                        className="h-5 w-5 flex-none text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Contact sales
                                </Link>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="hidden ml-10 justify-end lg:flex lg:flex-1  relative">
                    {currentUser ? (
                        <button
                            onClick={toggleAvatarVisibility}
                            id="dropdownUserAvatarButton"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 "
                            type="button"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="/docs/images/people/profile-picture-3.jpg"
                                alt="user photo"
                            />
                        </button>
                    ) : (
                        <>
                            <Link href={'/auth/signup'}>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">
                                    Sign Up
                                </button>
                            </Link>
                            <Link href={'/auth/signin'}>
                                <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}

                    <div
                        className={`absolute top-[120%] left-[75%] ${isAvatarVisible ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
                    >
                        <div className="px-4 py-3 text-sm text-gray-900 ">
                            <div>{currentUser ? currentUser.full_name : ''}</div>
                            <div className="font-medium truncate">
                                {currentUser ? currentUser.username : ''}
                            </div>
                        </div>
                        <ul
                            className="py-2 text-sm text-gray-700 d"
                            aria-labelledby="dropdownUserAvatarButton"
                        >
                            <li>
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100 "
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                {currentUser ? (
                                    <Link
                                        href={`/dashboard/${currentUser.role == 'author' ? 'author' : 'admin'}`}
                                        className="block px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Dashboard
                                    </Link>
                                ) : null}
                            </li>
                            <div onClick={handleSignout} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">                           
                                {loading ? 'Signing out' : 'Sign out'}
                            </div>
                        </ul>
                    </div>

                </div>
            </nav>
            <div className={`lg:hidden ${isSidebarVisible ? "block" : "hidden"}`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-10"></div>
                <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                onClick={toggleSidebarVisibility}
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/blog"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Blog
                                </Link>
                                <div className="-mx-3">
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        aria-controls="disclosure-1"
                                        aria-expanded="false"
                                    >
                                        Categories
                                    </button>
                                    <div
                                        className="mt-2 space-y-2"
                                        id="disclosure-1"
                                    >
                                        <Link
                                            href="/"
                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Analytics
                                        </Link>
                                    </div>
                                </div>
                                {currentUser && (
                                    <>
                                        <Link
                                            href="/profile"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Profile
                                        </Link>
                                        {currentUser ? (
                                            <Link
                                                href={`/dashboard/${currentUser.role == 'author' ? 'author' : 'admin'}`}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : null}
                                    </>
                                )}
                            </div>
                            <div className="py-6">
                                {currentUser ? (  
                                    <p className="cursor-pointer" onClick={handleSignout}>
                                        Sign Out
                                    </p>                               
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/signin"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/auth/signup"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
