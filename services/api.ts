import axios from "axios"

export const api = axios.create({
    baseURL: "http://192.0.0.2:3333"
})