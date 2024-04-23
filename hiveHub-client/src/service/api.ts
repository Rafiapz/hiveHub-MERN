import { jsonConfig, multiPartConfig } from "../utils/apiUtils";
import apiClient from "../utils/axios";
import {
    DELETE_REPLY_COMMENT_URL,
    FETCH_CONVERSATIONS_URL,
    LIKE_COMMENT_URL,
    REPLY_COMMENT_URL,
    SEARCH_USER_URL,
    SEND_EMAIL_FOR_RESET_PASSWORD_URL,
    SEND_VIDEO_URL,
    UPLOAD_STORY_URL,
    VERIFY_EMAIL_UPDATE_OTP_URL,
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

export const verifyEmailUpdateOtp = async (data: any) => {
    return await apiClient.put(VERIFY_EMAIL_UPDATE_OTP_URL, data, jsonConfig)
}

export const replyComment = async (form: any) => {
    return await apiClient.post(REPLY_COMMENT_URL, form, jsonConfig)
}

export const deleteReplyComment = async (id: any) => {
    return await apiClient.delete(DELETE_REPLY_COMMENT_URL + '/' + id)
}

export const likeComment = async (form: any) => {
    return await apiClient.post(LIKE_COMMENT_URL, form, jsonConfig)
}

export const sendVideo = async (data: any) => {
    return apiClient.post(SEND_VIDEO_URL + '/video', data, jsonConfig)
}

