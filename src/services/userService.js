
import axios from 'axios';

//GET USER
export const getUser = async (userId) => {
    console.log(userId);
    try {
        const res = await axios.get(`/users/userid/${userId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};