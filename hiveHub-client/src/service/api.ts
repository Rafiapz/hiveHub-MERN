import apiClient from "../utils/axios";
import { SEND_EMAIL_FOR_RESET_PASSWORD_URL } from "../utils/endPoint";


export const forgotPasswordSendEmail = async (email: string) => {

    return await apiClient.get(`${SEND_EMAIL_FOR_RESET_PASSWORD_URL}/${email}`)
}