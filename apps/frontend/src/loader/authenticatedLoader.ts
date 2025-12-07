import {useAuthenticatedUserStore} from "@/stores/UserStore.ts";
import {redirect} from "react-router-dom";
import ApiCommunicator from "@/communicator/ApiCommunicator.ts";
import {APP_DASHBOARD_PATH} from "@/constants.ts";

export default function authenticatedLoader() {
    const { isAuthenticated } = useAuthenticatedUserStore.getState();

    if (isAuthenticated()) {
        return redirect(APP_DASHBOARD_PATH);
    }

    ApiCommunicator.logout();
    return null;
}