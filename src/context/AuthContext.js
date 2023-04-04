import { createContext, useContext, useState, useEffect } from "react";
import AxiosApi from "services/api/AxiosApi";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const csrf = () => AxiosApi.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      await csrf();
      const { data } = await AxiosApi.get("/api/user");
      if (!data) {
        navigate("/");
        return data;
      } else {
        setUser(data);
        return data;
      }
    } catch (e) {
      console.log("ërror");
    }
  };

  const login = async ({ ...data }) => {
    try {
      if (user) {
        await logout();
      }
      setIsLoading(true);
      await csrf();
      const response = await AxiosApi.post("/login", data);
      await getUser();
      console.log("im done loging in now am navigatong ");
      navigate("/admin/dashboard");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("login error is : ", e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    try {
      setIsLoading(true);
      await csrf();
      const response = await AxiosApi.post("/register", data);
      console.log("reponse after creating user : ", response);
      navigate("/");
      setIsLoading(false);
    } catch (e) {
      console.log("register user errors : ", e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    AxiosApi.post("/logout")
      .then(() => {
        setUser(null);
        navigate("/");
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("logout errors ", e);
      });
  };

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
      getUser();
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        getUser,
        login,
        register,
        logout,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
