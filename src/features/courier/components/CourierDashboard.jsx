import {Navigate, Outlet} from "react-router-dom";
import UserSidebar from "../../../core/layout/UserSidebar";
import React from "react";
import "../../owner/owner.scss"

export default function CourierDashboard({user}){
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== 5) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="owner-dashboard">
            <UserSidebar user={user} />
            <div className="owner-content">
                <Outlet />
            </div>
        </div>
    )
}