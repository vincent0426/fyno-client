import { useContext } from "react";

import { FlashContext } from "../context/FlashContext";

export const useFlash = () => {
    const context = useContext(FlashContext);

    if (context === undefined) {
        throw new Error("useFlashContext must be used within a FlashProvider");
    }

    return context;
};
