import axios from "axios";

export default axios.create({
    baseURL: "https://smartbin-sut.herokuapp.com",
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json",
    }
});