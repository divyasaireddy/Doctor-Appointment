import { createContext, useReducer, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext();

// Initial State
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      try {
        const minimalUser = { 
          _id: action.payload.user._id, 
          name: action.payload.user.name, 
          email: action.payload.user.email, 
          role: action.payload.user.role 
        };

        localStorage.setItem("user", JSON.stringify(minimalUser));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);

        return { user: minimalUser, token: action.payload.token, role: action.payload.role };
      } catch (error) {
        console.error("Storage error:", error);
      }
      return state;

    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return { user: null, token: null, role: null };

    case "UPDATE_PROFILE":
      try {
        const updatedUser = { 
          ...state.user, 
          name: action.payload.name, 
          email: action.payload.email, 
          photo: action.payload.photo // Ensure this is a URL, not base64!
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { ...state, user: updatedUser };
      } catch (error) {
        console.error("Storage error:", error);
      }
      return state;

    default:
      return state;
  }
};

// Auth Provider Component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedToken) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: storedUser, token: storedToken, role: storedRole },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
