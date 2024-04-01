import apiClient from "../utils/axios";
import { FETCH_OTHER_USER_URL, SEARCH_USER_URL, SEND_EMAIL_FOR_RESET_PASSWORD_URL } from "../utils/endPoint";


export const forgotPasswordSendEmail = async (email: string) => {
    try {
        return await apiClient.get(`${SEND_EMAIL_FOR_RESET_PASSWORD_URL}/${email}`)
    } catch (error) {

    }

}

export const searchUser = async (query: string) => {

    try {
        const response = await apiClient.get(`${SEARCH_USER_URL}?search=${query}`)

        return response.data
    } catch (error) {

    }

}

