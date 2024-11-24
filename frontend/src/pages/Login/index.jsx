import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import Card from "@mui/joy/Card";
import Alert from "@mui/joy/Alert";
import { useNavigate } from "react-router-dom";

import { loginThunk } from "@features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(credentials));
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, role, token]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography level="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Input
            label="Username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            sx={{ flexGrow: 1 }}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            sx={{ flexGrow: 1 }}
          />
          <Button
            type="submit"
            variant="solid"
            sx={{ backgroundColor: "#21388A" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size="sm" sx={{ color: "inherit" }} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        {error && (
          <Alert color="danger" variant="soft" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}
      </Card>
    </Box>
  );
};

export default Login;
