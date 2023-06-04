import { FcGoogle } from "react-icons/fc";

import { useLogin } from "../hooks/useLogin";

function GoogleLogin() {
    const { loginWithProvider } = useLogin();

    return (
        <button
            className="flex w-full rounded-lg border bg-gray-50 p-3 text-sm font-normal text-gray-600 shadow-md hover:opacity-60"
            type="button"
            onClick={() => loginWithProvider("google")}
        >
            <FcGoogle className="text-xl" />
            <p className="w-full text-center">使用 Google 帳號</p>
        </button>
    );
}

export default GoogleLogin;
