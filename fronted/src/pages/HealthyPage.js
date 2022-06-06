import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";
import EditModifyComponent from "../components/EditModifyComponent";
import SubmitOrResetComponent from "../components/SubmitOrResetComponent";
import { useModel } from "../hook/useModel";

const defaultValues = {
  item_one: "0",
  item_two: "1",
  item_three: "2",
  item_four: "3",
  item_five: "2",
  item_six: "1",
  item_seven: "2",
  item_eight: "1",
  item_nine: "2",
};

export const HealthyPage = () => {
  const model = useModel();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: React.useMemo(() => {
      return model && defaultValues;
    }, [model]),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
    alert("儲存成功");
  };

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
          病人健康問卷
        </Typography>
        <EditModifyComponent />
      </Box>
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", ml: "49px", mb: "82px" }}
      >
        在過去兩個星期，有多少時候您受到以下任何問題所困擾？
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
                textAlign: "center",
                background: "#8B9B78",
                borderRadius: "10px",
                p: "3px",
              }}
            >
              <Box
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  "& td": {
                    border: "4px solid #8B9B78",
                    background: "#f4f4ea",
                    fontSize: "1.25rem",
                    position: "relative",
                    p: 1,
                  },
                  "& input[type='radio']": {
                    appearance: "none",
                    display: "none",
                    "& + label": {
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "center",
                      // width: "100%",
                      // height: "90px",
                      position: "absolute",
                      left: -1,
                      right: -1,
                      top: -1,
                      bottom: -1,
                    },
                    "&:checked + label": {
                      background: "#B2C099",
                    },
                  },
                }}
                component="table"
              >
                <Box component="tbody">
                  <Box
                    component="tr"
                    sx={{
                      "& td": {
                        color: "#fff",
                        background: "#B2C099",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <Box
                      component="td"
                      sx={{
                        borderTopLeftRadius: "10px",
                        width: "380px",
                        height: "100px",
                      }}
                    >
                      項目
                    </Box>
                    <Box component="td" sx={{ width: "147px" }}>
                      完全沒有
                      <br />
                      (0分)
                    </Box>
                    <Box component="td" sx={{ width: "147px" }}>
                      幾天
                      <br />
                      (1分)
                    </Box>
                    <Box component="td" sx={{ width: "147px" }}>
                      一半以上的天數(2分)
                    </Box>
                    <Box
                      component="td"
                      sx={{ borderTopRightRadius: "10px", width: "147px" }}
                    >
                      近乎每天
                      <br />
                      (3分)
                    </Box>
                  </Box>

                  <ItemRow model={model} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 7 }}>
            <SubmitOrResetComponent model={model} />
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

const item = [
  { title: "做事時提不起勁或沒有樂趣", name: "item_one" },
  { title: "感到心情低落、沮喪或絕望", name: "item_two" },
  { title: "入睡困難、睡不安穩或睡眠過多", name: "item_three" },
  { title: "感覺疲倦或沒有活力", name: "item_four" },
  { title: "食慾不振或吃太多", name: "item_five" },
  {
    title: `覺得自己很糟或覺得自己很失敗，或讓自己或家人失望`,
    name: "item_six",
  },
  { title: "對事物專注有困難，例如閱讀報紙或看電視時", name: "item_seven" },
  {
    title:
      "動作或說話速度緩慢到別人已經察覺,或正好相反一煩躁或坐立不安、動來動去的情況更勝於平常",
    name: "item_eight",
  },
  { title: "有不如死掉或用某種方式傷害自己的念頭", name: "item_nine" },
];

function ItemRow({ model }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {item.map(({ title, name }) => (
        <Box component="tr" key={name}>
          <Box
            component="td"
            sx={{
              height: "72px",
              fontWeight: "bold",
              textAlign: "start",
            }}
          >
            {title}
            {errors[name] && (
              <Typography color="error">{errors[name].message}</Typography>
            )}
          </Box>
          {[0, 1, 2, 3].map((value) => (
            <Box component="td" key={name + value}>
              <input
                disabled={model}
                {...register(name, {
                  required: "必填",
                })}
                type="radio"
                id={name + value}
                value={value}
              />
              <Box htmlFor={name + value} component="label"></Box>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}
