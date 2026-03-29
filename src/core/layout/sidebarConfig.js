import { faUtensils, faUsers, faTruck, faClipboardList, faCog } from "@fortawesome/free-solid-svg-icons";

export const SIDEBAR_LINKS = {
    3: [
        { to: "/owner/restaurants",      icon: faClipboardList, label: "My Restaurants" },
        { to: "/owner/orders",      icon: faTruck, label: "My Orders" },
    ],
    5: [
        { to: "/courier/deliveries", icon: faTruck,        label: "Deliveries" },
    ],
    2: [
        { to: "/admin/users",        icon: faUsers,        label: "Users" },
        { to: "/admin/restaurants",  icon: faUtensils,     label: "Restaurants" },
    ],
    4: [
        { to: "/employee/orders",    icon: faClipboardList, label: "Orders" },
    ],
};