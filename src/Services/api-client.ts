import axios, { CanceledError } from "axios"

export default axios.create({
    baseURL: "http://localhost:9285"
});

export { CanceledError };