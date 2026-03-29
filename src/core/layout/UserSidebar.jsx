import React from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { SIDEBAR_LINKS } from "./sidebarConfig";
import '../layout.scss';


export default function UserSidebar({ user }) {
    const links = SIDEBAR_LINKS[user.role] ?? [];

    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <div className="sidebar-user">
                <div className="sidebar-avatar">
                    {user.username?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <p className="sidebar-username">{user.username.toUpperCase()}</p>
                </div>
                </div>
            </div>

            <div className="sidebar-content">
                {links.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                    >
                        <FontAwesomeIcon icon={icon} size="xl" style={{ color: "#fff700" }} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="sidebar-footer">
                {/*TODO: Sidebar footer*/}
            </div>
        </div>
    );
}