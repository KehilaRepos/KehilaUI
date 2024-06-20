import axios, { CanceledError } from "axios"

export default axios.create({
    baseURL: "https://kehila.ninja"
});

export { CanceledError };