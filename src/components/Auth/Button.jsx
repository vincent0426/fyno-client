import { BeatLoader } from "react-spinners";

const button = ({ loading, onClick, text }) => (
    <button
        className="flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={loading}
        type="submit"
        onClick={onClick}
    >
        {loading ? <BeatLoader color="white" size={12} /> : text}
    </button>
);

export default button;
