const API_DOMAIN = "https://localhost:44305/api";
const token = sessionStorage.getItem("token");
export const get = async (path) => {
    try {
        const response = await fetch(`${API_DOMAIN}/${path}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error during GET request:", error);
        return null;
    }
};

export const post = async (data, path) => {
    try {
        const response = await fetch(`${API_DOMAIN}/${path}`, {
            method: "POST",
            

            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        console.log(token);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error during POST request:", error);
        return null;
    }
};

export const put = async (path, data) => {
    try {
        const response = await fetch(`${API_DOMAIN}/${path}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text(); // Read the response as text first
        return text ? JSON.parse(text) : null; // Parse it if there's something to parse
    } catch (error) {
        console.error("Error during PUT request:", error);
        return null;
    }
};

export const deleteRequest = async (path) => {
    try {
        const response = await fetch(`${API_DOMAIN}/${path}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Some APIs might not return a JSON response for DELETE operations
        const text = await response.text();
        return text ? JSON.parse(text) : 'Delete successful';
    } catch (error) {
        console.error("Error during DELETE request:", error);
        throw error; // Rethrow to handle it based on the context
    }
};
