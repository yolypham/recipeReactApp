
import axios from 'axios';

const URL = 'http://localhost:3001/users/userid/';

//GET USER
export const getUser = async (userId) => {
    try {
        const res = await axios.get(URL + userId);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};