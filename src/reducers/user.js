import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
} from "../actions/user";

import {jwtDecode} from 'jwt-decode';

// ...

export const login = ({ username, password, type }) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await fetch("https://localhost:44305/api/Users/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, type }),
    });

    if (response.ok) {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("text/plain")) {
        const token = await response.text();

        if (!token) {
          throw new Error("No token in response");
        }

        const decodedToken = jwtDecode(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        dispatch({ type: LOGIN_SUCCESS, token });
        sessionStorage.setItem("token", token);
        if (type !== role) {
          throw new Error("Error ROLE");
        }
        sessionStorage.setItem("role", role);
        

      } else {
        throw new Error("Response was not in expected format");
      }
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};
const initialState = {
  isLoading: false,
  token: null, // Change user to token
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, token: action.token, error: null }; // Change user to token
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOG_OUT:
      return { ...state, isLoading: false, token: null, error: null }; // Change user to token
    default:
      return state;
  }
};

export default userReducer;
