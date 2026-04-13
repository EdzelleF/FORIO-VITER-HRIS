import { MdDashboard } from "react-icons/md";
import { FaCogs, FaUsers } from "react-icons/fa";       
import { devNavUrl, urlDeveloper } from "../functions/functions-general";

export const navList = [
    {
        label: "Dashboard",
        icon: <MdDashboard />,
        menu: "dashboard",
        submenu: "",
    },
    {
        label: "Employees",
        icon: <FaUsers />,
        menu: "employees",
        submenu: "",
    },
    {
        label: "Settings",
        icon: <FaCogs />,
        menu: "settings",
        submenu: "",
        subNavList: [
            {
                label: "Role",
                path: `${devNavUrl}/${urlDeveloper}/settings/roles`,
            },
            {
                label: "users",
                path: `${devNavUrl}/${urlDeveloper}/settings/users`,
            },
        ],
    },
];