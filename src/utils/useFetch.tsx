import fetch from "isomorphic-unfetch";

const useFetch = token => {
    return async (url, options?) => {
        const reqOptions = {
            method: options ? "POST" : "GET",
            headers: { Authorization: `bearer ${token}` },
            body: JSON.stringify(options)
        };
        const res = await fetch(url, reqOptions);
        return res.json();
    };
};

export default useFetch;
