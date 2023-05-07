import axios from "axios";
// axios.defaults.withCredentials = true;
const KEY = 'AIzaSyBLV70kyT8edlaja6nDIowBut8dgxrXQI8'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/search',
    params: {
        part: "snippet",
        maxResults: 5,
        key: KEY
    },
    headers: {
    }
})

