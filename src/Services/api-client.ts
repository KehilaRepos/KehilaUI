import axios, { CanceledError } from "axios"

export default axios.create({
    baseURL: "https://api.allorigins.win/raw?url=http://kehilaserverbeanstalk-env.eba-sruyaeey.us-east-1.elasticbeanstalk.com"
});

export { CanceledError };