import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../services/auth.service";

const inputStyle = {
  fontSize: "1.5rem",
  border: "2px solid #5E574E",
  minWidth: "100px",
  width: "100%",
  maxWidth: "355px",
  height: "46px",
  borderRadius: "10px",
  backgroundColor: "transparent",
  padding: "0 15px",
};

const labelStyle = {
  minWidth: "50px",
  width: "100%",
  maxWidth: "65px",
  mr: { xs: "5px", sm: "44px" },
  fontSize: { xs: "1.25rem", sm: "2rem" },
  fontWeight: "bold",
  color: "#5E574E",
};


export const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    authService
      .login(data.account, data.password)
      .then((res) => {
        const data = res.data;
        const root = data[0]
        localStorage.setItem("cinguan_token",JSON.stringify({...root,state:''}));
        navigate("/");
      })
      .catch((e) => console.log(e));

    // const user = userList.filter(
    //   ({ username, password }) =>
    //     data.account === username && data.password === password
    // )[0]?.root;

    // if (!user) {
    //   return setError(true);
    // }
    // localStorage.setItem("cinguan_token",JSON.stringify({ token: true, root: user }));
  };

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-start" },
          lineHeight: 1,
          padding: { xs: "56px 0 12px 0", sm: "56px 0 12px 96px" },
        }}
      >
        <div>
          <Typography
            sx={{
              margin: 0,
              color: "#5e574d",
              fontSize: { xs: "1.5rem", sm: "2.5rem" },
              fontWeight: "bold",
            }}
            component="h1"
          >
            後新冠特別門診管理系統
          </Typography>
        </div>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Divider sx={{ width: "calc(100% - 192px)", alignSelf: "center" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          px: 2,
        }}
      >
        <Box sx={{ display: "flex", mb: 7, alignItems: "center" }}>
          <Box sx={labelStyle} component="label">
            帳號
          </Box>
          <input
            type="text"
            style={inputStyle}
            {...register("account", {
              required: "必填",
            })}
          />
          {errors.account && (
            <Box sx={{ color: "red", pl: 1, minWidth: "50px" }}>
              {errors.account.message}
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={labelStyle} component="label">
            密碼
          </Box>
          <input
            type="password"
            style={inputStyle}
            {...register("password", {
              required: "必填",
            })}
          />
          {errors.password && (
            <Box sx={{ color: "red", pl: 1, minWidth: "50px" }}>
              {errors.password.message}
            </Box>
          )}
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 5 }}>
            登入失敗帳號或密碼錯誤
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{
            mt: 10,
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "2rem",
            background: "#647A7A",
            height: "64px",
            width: "256px",
            "&:hover": {
              background: "#647A7A",
              opacity: 0.9,
            },
          }}
          onClick={handleSubmit(onSubmit)}
        >
          登入系統
        </Button>
      </Box>
    </Box>
  );
};
