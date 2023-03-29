import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function CreatePost() {
    return (
        <div className="mx-auto max-w-2xl bg-white px-4 py-12 sm:px-6 lg:px-8">
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                        <input
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            id="username"
                                            name="username"
                                            placeholder="janesmith"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="about">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                        defaultValue=""
                                        id="about"
                                        name="about"
                                        rows={3}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="photo">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                                    <button
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        type="button"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="cover-photo">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                htmlFor="file-upload"
                                            >
                                                <span>Upload a file</span>
                                                <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="first-name">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="last-name">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="email"
                                        name="email"
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="country">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        id="country"
                                        name="country"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="street-address">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="city">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="city"
                                        name="city"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="region">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="region"
                                        name="region"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="postal-code">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="postal-code"
                                        name="postal-code"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            about important changes, but you pick what else you want to hear about.
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label className="font-medium text-gray-900" htmlFor="comments">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label className="font-medium text-gray-900" htmlFor="candidates">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label className="font-medium text-gray-900" htmlFor="offers">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                        />
                                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="push-everything">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                        />
                                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="push-email">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                        />
                                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="push-nothing">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button className="text-sm font-semibold leading-6 text-gray-900" type="button">
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
