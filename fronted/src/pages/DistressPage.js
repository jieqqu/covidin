import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";
import EditModifyComponent from "../components/EditModifyComponent";
import SubmitOrResetComponent from "../components/SubmitOrResetComponent";
import { useModel } from "../hook/useModel";

export const DistressPage = () => {
  const model = useModel();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: React.useMemo(() => {
      return model && { item: "6" };
    }, [model]),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    alert("儲存成功");
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: "scroll",
        padding: "0px 0px 56px 0px",
        position: "relative",
      }}
    >
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
      <Box sx={{ display: "flex", alignItems: "center", my: "33px" }}>
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            lineHeight: "2.5rem",
            ml: "39px",
            mr: "23px",
          }}
        >
          王大明
        </Typography>
        <Typography
          sx={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            alignSelf: "end",
          }}
        >
          困擾溫度計
        </Typography>
        <EditModifyComponent />
      </Box>
      <Typography
        sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}
      >
        您所知覺生活困擾程度有多大?請在圖中圈選適當數字(從 0 到 10)
      </Typography>
      <FormProvider {...methods}>
        <form
          id="myform"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                gap: "10px",
                mt: "77px",
                "& input[type='radio']": {
                  "& + label": {
                    display: "flex",
                    border: "7px solid #8BB2B7",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999996",
                  },
                  "&:checked + label": {
                    background: "#8BB2B7",
                    color: "#fff",
                  },
                },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <React.Fragment key={"radio" + value}>
                  <input
                    disabled={model}
                    type="radio"
                    {...register("item", {
                      required: "必填",
                    })}
                    id={"radio" + value}
                    value={value}
                    style={{ appearance: "none" }}
                  />
                  <Box
                    htmlFor={"radio" + value}
                    component="label"
                    sx={{
                      width: `calc(40px + 5*${value}px)`,
                      height: `calc(40px + 5*${value}px)`,
                      fontSize: `calc(10px + 3*${value}px)`,
                    }}
                  >
                    {value}
                  </Box>
                </React.Fragment>
              ))}
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                無困擾
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                極度困擾
              </Typography>
            </Box>
            {errors.item && (
              <Typography color="error" textAlign="center">
                {errors.item.message}
              </Typography>
            )}
          </Box>
          <Box sx={{ position: "absolute", bottom: "20px" }}>
            <SubmitOrResetComponent model={model} />
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};
