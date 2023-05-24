import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({
    redirectPath = "/auth"
}) => {
    const { user, isAuthenticating } = useAuth();
    if (!user) return <Navigate to={redirectPath} replace />;
    // 渲染子路由元件
    return <Outlet />;
};

export default ProtectedRoute;