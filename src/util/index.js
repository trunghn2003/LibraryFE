const API_DOMAIN = "https://localhost:44305/api";
export const get  = async (path) => {
    const response = await fetch(`${API_DOMAIN}/${path}`);
    const result = await response.json();
    return result;

}
export const post = async(data,path) => {
    const response = await fetch(`${API_DOMAIN}/${path}`, {
        method: "POST",
        headers: {
            Accept: "application/json"
            , "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;

}
export const patch = async(path,data) => {
    const response = await fetch(`${API_DOMAIN}/${path}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json"
            , "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;

}