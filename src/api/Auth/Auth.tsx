import axios from 'axios';

const url = "https://lobster-app-osqfh.ondigitalocean.app/";

export const signIn = async (email:string, password:string) => {

    return await axios.post(url + "auth/login", {email, password})

    };

export async function register(username: string, email:string, password:string) {
    return await axios.post(url + "users", {username, email, password})
};

export async function retrieveUserInformation(jwt: string) {
    return await axios.get(url + 'users/profile', {headers: {'Authorization': 'Bearer ' + jwt}})
}   