import { multiPartConfig } from "../utils/apiUtils";
import apiClient from "../utils/axios";
import {
    ADMIN_FIND_ALL_USERS_URL,
    FETCH_CONVERSATIONS_URL,
    FETCH_MESSAGES_URL,
    FETCH_OTHER_USER_URL,
    SEARCH_USER_URL,
    SEND_EMAIL_FOR_RESET_PASSWORD_URL,
    UPLOAD_STORY_URL,
} from "../utils/endPoint";

export const forgotPasswordSendEmail = async (email: string) => {
    try {
        return await apiClient.get(`${SEND_EMAIL_FOR_RESET_PASSWORD_URL}/${email}`);
    } catch (error) { }
};

export const searchUser = async (query: string) => {
    try {
        const response = await apiClient.get(`${SEARCH_USER_URL}?search=${query}`);

        return response.data;
    } catch (error) { }
};

export const fetchConversations = async (userId: string) => {
    try {
        return await apiClient.get(`${FETCH_CONVERSATIONS_URL}/${userId}`);
    } catch (error: any) {
        console.log(error);
    }
};

export const uploadStory = async (form: any) => {
    return await apiClient.post(UPLOAD_STORY_URL + '/image', form, multiPartConfig);
};
