import { Box, Container, Divider, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TrashListTable } from "../components/Tables";
import { ReactComponent as Search } from "./../svg/search.svg";

export const TrashPage = () => {
  const navigate = useNavigate();

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
      <Typography
        sx={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          mt: "1.5rem",
          mx:"52px"
        }}
      >
        垃圾桶
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "916px", mx: "auto", px: 2 }}>
        <TextField
          sx={{
            width: " 100%",
            marginTop: "1.5rem",
            mb: 4,
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
      <Container maxWidth="md">
        <TrashListTable />
      </Container>
    </div>
  );
};
