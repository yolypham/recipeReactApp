
import axios from 'axios';
import { setToken } from "../services/tokenService";

//GET USER
export const getUser = async (userId) => {
    console.log(userId);
    try {
        const res = await axios.get(`/users/user/${userId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async (token) => {
    try {
        const res = await axios.get('/users/current', {
            headers: {
                // Pass the token as an Authorization Header
                Authorization: `Bearer ${token}`
            }
        })
        return (res.data)
    } catch (e) {
        console.log(e)
    }
}

export const postLogin = async (user) => {
    const { email, password } = user
    try {
        const res = await axios.post('/auth/login', { email, password })
        const token = res.data.token
        setToken(token)
        await getCurrentUser(token)
    } catch (e) {
        console.error(e)
    }
}

export const postNewRegistration = async (user) => {
    const { email, password, nickname } = user
    console.log('signup...', user)
    try {
        const res = await axios.post('/auth/signup', { email, password, nickname })
        if (res) {
            console.log('new registration ', res)
        }

    } catch (e) {
        console.error(e)
    }
}