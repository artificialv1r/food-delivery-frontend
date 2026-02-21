import React from 'react';
import Sidebar from "../../../core/layout/Sidebar";
import {Navigate, Outlet} from "react-router-dom";

export default function AdminDashboard({ user }) {
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== 2) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="admin-dashboard">
            <Sidebar user={user} />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    )
}