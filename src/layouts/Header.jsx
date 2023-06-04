import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

import Logo from "../assets/logo.png";
import ProfileDropdown from "../components/Header/ProfileDropdown";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

const navigation = [
    {
        name: "Create Post",
        href: "/create-post",
    },
    {
        name: "貼文",
        href: "/posts",
    },
    {
        name: "聊天室",
        href: "/chat",
    },
    {
        name: "關於浪浪",
        href: "/information",
    },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticating } = useAuth();
    console.log(user);
    const { logout } = useLogout();
    return (
        isAuthenticating ? (
            <div className="flex h-onePage items-center justify-center">
                <CircleLoader color="#6B46C1" />
            </div>
        ) : (
            <>
                <header className="mx-auto max-w-7xl">
                    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-4 lg:px-8">
                        <div className="flex lg:flex-1">
                            <a className="-m-1.5 p-1.5" href="/">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    className="h-12 w-auto"
                                    src={Logo}
                                />
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="hidden items-center lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                item.name === "Create Post" ? (
                                    <a
                                        key={item.name}
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                        href={item.href}
                                    >
                                        <PencilSquareIcon className="inline-block h-5 w-5" />
                                    </a>

                                ) : (
                                    <a
                                        key={item.name}
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                        href={item.href}
                                    >
                                        {item.name}
                                    </a>

                                )
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            {user ? (
                                <div className="flex items-center justify-center space-x-3 py-4">
                                    <ProfileDropdown logout={logout} user={user} />
                                </div>
                            ) : (
                                <div className="space-y-6 px-8 py-3">
                                    <div className="space-y-2">
                                        <a
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
                                            href="/auth"
                                        >
                                            登入
                                            {" "}
                                            <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-50" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a className="-m-1.5 p-1.5" href="#">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        alt=""
                                        className="h-12 w-auto"
                                        src={Logo}
                                    />
                                </a>
                                <button
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                href={item.href}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    {user ? (
                                        <div className="flex items-center justify-center space-x-3 py-4 lg:hidden">
                                            <ProfileDropdown logout={logout} user={user} />
                                        </div>
                                    ) : (
                                        <div className="space-y-6 px-8 py-3">
                                            <div className="space-y-2 py-6">
                                                <a
                                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    href="/auth"
                                                >
                                                    登入
                                                    {" "}
                                                    <span aria-hidden="true">&rarr;</span>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header>
                <Outlet />
            </>
        )
    );
}
