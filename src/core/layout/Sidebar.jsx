import React from "react";
import '../layout.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleUser, faUtensils, faUsers} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

export default function Sidebar({user}) {
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <FontAwesomeIcon icon={faCircleUser} size={"xl"} style={{color: "#fff700",}} />
                <h3>{user.username}</h3>
            </div>

            <div className="sidebar-content">
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faUsers} size={"xl"} style={{color: "#fff700",}} />
                    <span>Users</span>
                </NavLink>

                <NavLink
                    to="/admin/restaurants"
                    className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                >
                    <FontAwesomeIcon icon={faUtensils} size={"xl"} style={{color: "#fff700",}}/>
                    <span>Restaurants</span>
                </NavLink>
            </div>

            <div className="sidebar-footer">
                 {/*TODO: Sidebar footer*/}
            </div>

        </div>
    )

}