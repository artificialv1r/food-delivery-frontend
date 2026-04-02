import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import UserSidebar from "../../../core/layout/UserSidebar";
import "../owner.scss"

export default function OwnerDashboard({user}){
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== 3) {
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