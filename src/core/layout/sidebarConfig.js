import { faUtensils, faUsers, faTruck, faClipboardList, faCog } from "@fortawesome/free-solid-svg-icons";

export const SIDEBAR_LINKS = {
    1: [
        { to: "/customer",      icon: faUtensils, label: "Restaurants" },
        { to: "/customer/orders",      icon: faTruck, label: "MyOrders" },
    ],
    2: [
        { to: "/admin/users",        icon: faUsers,        label: "Users" },
        { to: "/admin/restaurants",  icon: faUtensils,     label: "Restaurants" },
    ],
    3: [
        { to: "/owner/restaurants",      icon: faClipboardList, label: "My Restaurants" },
        { to: "/owner/orders",      icon: faTruck, label: "My Orders" },
    ],
    4: [
        { to: "/employee/orders",    icon: faClipboardList, label: "Orders" },
    ],
    5: [
        { to: "/courier/deliveries", icon: faTruck,        label: "Deliveries" },
    ]
};
