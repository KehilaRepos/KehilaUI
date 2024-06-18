import axios, { CanceledError } from "axios"

export default axios.create({
    baseURL: "http://kehilaserverbeanstalk-env.eba-sruyaeey.us-east-1.elasticbeanstalk.com"
});

export { CanceledError };