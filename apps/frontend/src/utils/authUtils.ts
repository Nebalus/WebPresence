import ApiCommunicator from "@/communicator/ApiCommunicator.ts";

export function handleAuthError(response: Response) {
    if (response.status === 401 || response.status === 403) {
        ApiCommunicator.logout();
        window.location.href = '/login';
    }
}