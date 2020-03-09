import fetch from "isomorphic-unfetch";

const useFetch = token => {
    try {
        return async (url, options?) => {
            const reqOptions = {
                method: options ? "POST" : "GET",
                headers: { Authorization: `bearer ${token}` },
                body: JSON.stringify(options)
            };
            const res = await fetch(url, reqOptions);
            return res.json();
        };
    } catch (err) {
        throw new Error(err);
    }
};

export default useFetch;
