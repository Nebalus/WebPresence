import ApiCommunicator from "@/communicator/ApiCommunicator.ts";
import {redirect} from "react-router-dom";
import {APP_DASHBOARD_PATH} from "@/constants.ts";
import {UserLoginRequestSchema} from "@/schemas/ApiRequests/UserRequestSchemas.ts";

export default async function loginAction({request}: { request: Request}) {
    const formData = await request.formData();
    const username = (formData.get('username')?.toString() ?? '').trim().replace(/\s/g, "");
    const password = (formData.get('password')?.toString() ?? '').trim();

    if (username === '' || password === '') {
        return {
            has_error: true,
            error_title: 'Authentication Failed',
            error_message: 'Username or Password should not be empty'
        }
    }

    const userLoginRequest = UserLoginRequestSchema.safeParse({
        "username": username,
        "password": password,
    });

    if (!userLoginRequest.success) {
        return {
            has_error: true,
            error_title: 'Authentication Failed',
            error_message: userLoginRequest.error.errors[0].message
        }
    }

    const loginResponse = await ApiCommunicator.login(userLoginRequest.data);

    if (loginResponse) {
        const redirectTo = formData.get('redirectTo') as string | null;
        return redirect(redirectTo || APP_DASHBOARD_PATH);
    }

    return {
        has_error: true,
        error_title: 'Authentication Failed',
        error_message: 'Your credentials are invalid'
    }
}