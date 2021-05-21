import axios from 'axios';

const httpClient = axios.create();
httpClient.defaults.timeout = 1200000;


const _request = async (url, method, data, config = {}) => {
    return httpClient({
        url: "http://localhost:8000/" + url,
        method,
        data,
        ...config.headers, ...config.options
    }).then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 204) return res.data;
        else throw (res.data);
    }).catch(errorResponse => {
        throw (errorResponse.response || {status: 500})
    })
}

export const get = (url, config) => _request(url, "GET", null, config);
export const post = (url, body, config = {}) => _request(url, "POST", body, config);
export const put = (url, body, config = {}) => _request(url, "PUT", body, config);
export const patch = (url, body, config = {}) => _request(url, "PATCH", body, config);
export const deleteRequest = (url, body, config = {}) => _request(url, "DELETE", body, config);
