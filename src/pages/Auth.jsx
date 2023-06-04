import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { addUser } from "../api/users";
import Button from "../components/Auth/Button";
import GoogleLogin from "../components/GoogleLogin";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
    const navigate = useNavigate();
    const { isLoading: signupLoading, signup } = useSignup();
    const { isLoading: loginLoading, login } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const onViewChange = () => {
        setIsLogin(!isLogin);
    };

    const onSignUp = async (e) => {
        e.preventDefault();

        const { data, error } = await signup(email, password);

        if (error) {
            Swal.fire("Error!", error.message, "error");
            return;
        }

        await addUser({
            id: data.user.id,
            email: data.user.email,
            name: data.user.email,
            avatar_url: "https://dtcmvoukafmgyubzbysj.supabase.co/storage/v1/object/public/avatars/Monster.webp",
        });

        Swal.fire(
            "Success!",
            "Please check your email for the confirmation link",
            "success",
        ).then(() => {
            setEmail("");
            setPassword("");
            setIsLogin(true);
        });
    };

    const onLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await login(email, password);

        if (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#3085d6",
            });

            return;
        }

        setEmail("");
        setPassword("");

        navigate("/", {
            replace: true,
        });
        navigate(0);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {isLogin ? (
                        <>
                            <form action="#" className="space-y-6" method="POST">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                                        電子郵件
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">
                                        密碼
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                        />
                                        <label className="ml-3 block text-sm leading-6 text-gray-900" htmlFor="remember-me">
                                            記住我
                                        </label>
                                    </div>

                                    <div className="text-sm leading-6">
                                        <a className="font-semibold text-indigo-600 hover:text-indigo-500" href="#">
                                            忘記密碼?
                                        </a>
                                    </div>
                                </div>
                                <Button loading={loginLoading} text="登入" onClick={onLogin} />
                            </form>

                            <p className="mt-6 space-x-2 text-center text-sm leading-5 text-gray-500">
                                <span className="text-sm text-gray-500">尚未擁有帳號？</span>
                                <button className="font-semibold text-indigo-600 hover:text-indigo-500" type="button" onClick={onViewChange}>
                                    註冊
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <form className="space-y-6" method="POST">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                                        電子郵件
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">
                                        密碼
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button loading={signupLoading} text="Sign up" onClick={onSignUp} />
                            </form>

                            <p className="mt-6 space-x-2 text-center text-sm leading-5 text-gray-500">
                                <span className="text-sm text-gray-500">已經擁有帳號？</span>
                                <button className="font-semibold text-indigo-600 hover:text-indigo-500" type="button" onClick={onViewChange}>
                                    S登入
                                </button>
                            </p>
                        </>
                    )}
                    <div className="relative mt-6">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">或是使用</span>
                        </div>
                    </div>
                    <div className="mt-6 w-full gap-4">
                        <GoogleLogin />
                    </div>
                </div>
            </div>
        </div>
    );
}
