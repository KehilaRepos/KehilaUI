import axios, { CanceledError } from "axios"

export default axios.create({
    baseURL: "https://kehilaserverbeanstalk-env.eba-sruyaeey.us-east-1.elasticbeanstalk.com"
});

export { CanceledError };