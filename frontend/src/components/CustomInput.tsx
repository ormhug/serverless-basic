import { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
};

export default function CustomInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#ffffff",
          pb: 1,
        }}
      >
        {label}
      </Typography>

      <Paper
        sx={{
          background: "rgba(255, 255, 255, 0.14)",
          backdropFilter: "blur(8px)",
        }}
      >
        <InputBase
          fullWidth
          required
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          sx={{
            color: "#ffffff",
            p: 1.2,
            borderRadius: "5px",

            "& input::placeholder": {
              color: "rgba(255, 255, 255, 0.65)",
              opacity: 1,
            },
            "& input::-ms-reveal, & input::-ms-clear": {
              display: "none",
            },
          }}
          endAdornment={
            isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((current) => !current)}
                  edge="end"
                  sx={{
                    color: "#ffffff",
                    mr: 0.5,
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
        />
      </Paper>
    </Box>
  );
}
