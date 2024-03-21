import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const contentTypeJson = {
    "Content-Type": "application/json",
};

export const multiPartConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    credentials: "include",
};

export const jsonConfig = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include",
};

export const handleApiError = async (error: AxiosError) => {

}