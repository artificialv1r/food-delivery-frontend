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
                <FontAwesomeIcon icon={faCircleUser} size="xl" style={{ color: "#fff700" }} />
                <h3>{user.username}</h3>
            </div>

            <div className="sidebar-content">
                {links.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                    >
                        <FontAwesomeIcon icon={icon} size="xl" style={{ color: "#fff700" }} />
                        <span>{label}</span>
                    </NavLink>
                ))}

                {links.length === 0 && (
                    <p className="sidebar-no-links">Nema dostupnih stranica.</p>
                )}
            </div>

            <div className="sidebar-footer">
                {/*TODO: Sidebar footer*/}
            </div>
        </div>
    );
}