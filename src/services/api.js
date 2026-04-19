import axios from "axios";

export const BASE_URL =  "https://laravue2.blumbit.net/back/public/api";

export default function api(){

    const token = "ABC.XYZ.QWE";

    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token
        }
    });
 
    return api;

}
