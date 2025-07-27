import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar, useUser } from "../";
import { login } from "../../services";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const { setUser } = useUser();

  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result.success) {
      showMessage("Login successful!", "success");
      if (result.user) {
        setUser(result.user);
      }
      navigate("/");
    } else {
      showMessage(result.message || "An error occurred", "error");
    }
  };

  return { email, setEmail, password, setPassword, handleLogin };
};
