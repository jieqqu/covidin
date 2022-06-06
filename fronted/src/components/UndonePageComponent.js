import { Divider, Typography,Box } from "@mui/material";
import React from "react";
import { ReactComponent as UndoneIcon } from "../svg/undone.svg";


export const UndonePageComponent = () => {
  return (
    <Box sx={{flex: 1,position:'relative'}}>
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
      <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:{xs:'80%',md:'50%'}}}>
        <UndoneIcon width='100%'height='100%'/>
      </Box>
      
    </Box>
  );
};
