import axios, { CanceledError } from "axios"

export default axios.create({
    baseURL: `https://api.locationiq.com/v1`
});

export { CanceledError };