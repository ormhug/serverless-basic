import { FormEvent, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import CustomInput from "./CustomInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/local/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message ?? "Login failed");
        return;
      }

      localStorage.setItem("token", result.data.token);

      setMessage("Login successful");
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #08142b 0%, #10254c 50%, #07101f 100%)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: {
            xs: "85%",
            sm: 420,
          },
          p: 5,
          borderRadius: "30px",
          backgroundColor: "rgba(0, 24, 57, 0.35)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 55,
              height: 55,
              bgcolor: "#22c55e",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(34, 197, 94, 0.65)",
              mb: 5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              S
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: 20,
              mb: 4,
            }}
          >
            Sign in to dashboard
          </Typography>
        </Box>

        <CustomInput
          label="Email"
          placeholder="Enter your email..."
          type="email"
          value={email}
          onChange={setEmail}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password..."
          type="password"
          value={password}
          onChange={setPassword}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.4,
            bgcolor: "#22c55e",
            fontWeight: "bold",
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.55)",

            "&:hover": {
              bgcolor: "#16a34a",
            },
          }}
        >
          LOGIN
        </Button>

        {message && (
          <Typography
            sx={{
              textAlign: "center",
              mt: 2,
              color: message === "Login successful" ? "#86efac" : "#fca5a5",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
