import axios from 'axios';

import { BASE_URL } from "./BaseApi";

export const FetchItem = async () => {
    try {
        const response = await axios.get("https://your-api-endpoint.com/item");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default FetchItem;