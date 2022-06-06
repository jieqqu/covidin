import { Box, Container, Divider, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateListTable } from "../components/Tables";
import { ReactComponent as Search } from "./../svg/search.svg";

export const InformationPage = () => {
  const navigate = useNavigate();
  
  let type;

  const { office_code } = JSON.parse(localStorage.getItem("cinguan_token"));
  switch (office_code) {
    case "A":
      type = "收案紀錄表";
      break;
    case "B":
      type = "身心壓力表";
      break;
    case "C":
      type = "社會心理表";
      break;
    default:
      break;
  }

  return (
    <div style={{ flex: 1, overflowY: "scroll", padding: "0px 0px 56px 0px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          lineHeight: 1,
          padding: "56px 0 12px 39px",
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
      <Divider sx={{ width: "calc(100% - 39px)" }} />
      <Box sx={{ width: "100%", maxWidth: "916px", mx: "auto", px: 2 }}>
        <TextField
          sx={{
            width: " 100%",
            marginTop: "1.5rem",
            "& .MuiInputBase-input": {
              padding: "10px 0px 10px 16px",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: " 1rem",
              "& fieldset": {
                border: "2px solid #5E574E",
              },
              "&.Mui-focused fieldset": {
                border: "3px solid #5E574E",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <Box sx={{ width: 24, display: "flex", alignItems: "center" }}>
                <Search />
              </Box>
            ),
          }}
          type="text"
          placeholder="可搜尋病歷號"
        />
      </Box>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            mt: "27.5px",
            mb: 4,
          }}
        >
          今日掛號病人
        </Typography>
        <CreateListTable type={type} />
      </Container>
    </div>
  );
};
