import ApiCommunicator from "@/communicator/ApiCommunicator.ts";
import {UserRegisterRequestSchema} from "@/schemas/ApiRequests/UserRequestSchemas.ts";
import {redirect} from "react-router-dom";

export default async function registerAction({request}: { request: Request}) {
    const formData = await request.formData();
    const invitationTokenAsString = formData.get('invitationtoken')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const username = (formData.get('username')?.toString() ?? '').trim().replace(/\s/g, "");
    const password = (formData.get('password')?.toString() ?? '').trim();
    const passwordConfirm = (formData.get('password_confirm')?.toString() ?? '').trim();

    if (username === '' || password === '') {
        return {
            has_error: true,
            error_title: 'Registration Failed',
            error_message: 'Username or Password should not be empty'
        }
    }

    if (password !== passwordConfirm) {
        return {
            has_error: true,
            error_title: 'Registration Failed',
            error_message: 'The passwords do not match'
        }
    }

    const userRegisterRequest = UserRegisterRequestSchema.safeParse({
        "invitation_token": invitationTokenAsString,
        "email": email,
        "username": username,
        "password": password,
    });

    if (!userRegisterRequest.success) {
        return {
            has_error: true,
            error_title: 'Registration Failed',
            error_message: userRegisterRequest.error.errors[0].message
        }
    }

    const registerResponse = await ApiCommunicator.register(userRegisterRequest.data)

    if (registerResponse) {
        return redirect("/login?register_success=true");
    }

    return {
        has_error: true,
        error_title: 'Registration Failed',
        error_message: 'The registration features are currently unavailable'
    }
}
