import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Roles from "../pages/developer/settings/roles/Roles";

export const routesDeveloper = [
    {
        path:`${devNavUrl}/${urlDeveloper}`,
        element: (
            <>
            <Roles />
            </>
        ),
    },
];