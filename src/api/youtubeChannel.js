import axios from "axios";
// axios.defaults.withCredentials = true;
// const KEY = 'AIzaSyBLV70kyT8edlaja6nDIowBut8dgxrXQI8'
const KEY = 'AIzaSyDG0lCnI3aranK8KQj0sYFXUSKyTuAFpes'


export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/channels',
    params: {
        part: "snippet",
        maxResults: 1,
        key: KEY
    },
    headers: {
    }
})

