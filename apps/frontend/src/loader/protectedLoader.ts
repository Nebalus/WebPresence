import {useAuthenticatedUserStore} from "@/stores/UserStore.ts";
import {redirect} from "react-router-dom";

export default function protectedLoader() {
    const { isAuthenticated } = useAuthenticatedUserStore.getState();

    if (isAuthenticated()) {
        return null;
    }

    const params = new URLSearchParams();
    params.set("next", location.pathname)
    return redirect('/login?' + params.toString());
}