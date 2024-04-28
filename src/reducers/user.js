import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT } from "../actions/user";

export const login =
  ({ username, password, type }) =>
  async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await fetch("https://localhost:44305/api/Users/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (type !== data.role) {
            throw new Error("Error ROLE");
          }
          dispatch({ type: LOGIN_SUCCESS, user: data });
          sessionStorage.setItem('user', JSON.stringify(data));
        } else {
          throw new Error("Response was not JSON");
        }
      } else {
        const errorText = await response.text(); // Sử dụng text() nếu response không phải JSON
        throw new Error(errorText);
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.user, error: null };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOG_OUT:
      return { ...state, isLoading: false, user: null, error: null };
    default:
      return state;
  }
};

export default userReducer;
