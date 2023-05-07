import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

export const FlashContext = createContext();

export function FlashProvider({ children }) {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const value = useMemo(() => ({
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
    }), [errorMessage, successMessage]);

    const debounced = useDebouncedCallback((cb) => {
        cb("");
    }, 3000);

    useEffect(() => {
        if (!successMessage) return;
        debounced(setSuccessMessage);
        toast.success(successMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage]);

    useEffect(() => {
        if (!errorMessage) return;
        debounced(setErrorMessage);
        toast.error(errorMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessage]);

    return (
        <FlashContext.Provider value={value}>
            {children}
        </FlashContext.Provider>
    );
}
