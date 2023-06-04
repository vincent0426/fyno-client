import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function ProfileDropdown({ user, logout }) {
    const navigate = useNavigate();

    const onUserClick = () => {
        navigate(`/profile/${user.name}`);
        navigate(0);
    };

    return (
        <Menu as="div" className="relative flex">
            <Menu.Button className="flex items-center space-x-3 rounded-full text-sm">
                <img
                    alt=""
                    className="h-8 w-8 rounded-full"
                    referrerPolicy="no-referrer"
                    src={user.avatar_url}
                />
                <span className="sr-only">Open user menu</span>
                <p className="font-bold text-black">{user.name}</p>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div
                        className="px-4 py-3 font-semibold text-gray-700"
                        type="button"
                    >
                        {user.name}
                    </div>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block w-full text-left px-4 py-2 text-sm text-gray-700",
                                )}
                                type="button"
                                onClick={onUserClick}
                            >
                                個人檔案
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block w-full text-left px-4 py-2 text-sm text-gray-700",
                                )}
                                type="button"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                登出
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default ProfileDropdown;
