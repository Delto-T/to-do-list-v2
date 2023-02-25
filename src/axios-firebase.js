import axios from "axios";

const instance = axios.create({
    baseURL: "https://formation-react-e082d-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;

