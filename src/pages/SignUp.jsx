import GoogleLogin from "../components/GoogleLogin";

export default function Signup() {
    return (
        <>
            {/*
          This example requires updating your template:

          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form action="#" className="space-y-6" method="POST">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="email"
                                        name="email"
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="password"
                                        name="password"
                                        type="password"
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
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a className="font-semibold text-indigo-600 hover:text-indigo-500" href="#">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    type="submit"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div>
                            <div className="relative mt-10">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 w-full gap-4">
                                <GoogleLogin />
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        {" "}
                        <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href="#">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
