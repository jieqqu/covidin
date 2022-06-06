import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";
import EditModifyComponent from "../components/EditModifyComponent";
import SubmitOrResetComponent from "../components/SubmitOrResetComponent";
import { useModel } from "../hook/useModel";

const defaultValues = {
  item_one: "是",
  item_two: "是",
  item_three: "否",
  item_four: "是",
  item_five: "是",
  item_six: "否",
  item_seven: "是",
  item_eight: "否",
  item_nine: "是",
  item_ten: "否",
};

export const TraumaPage = () => {
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
          創傷篩檢問卷
        </Typography>
        <EditModifyComponent />
      </Box>
      <Typography
        sx={{ fontSize: "1.5rem", fontWeight: "bold", mx: "49px", mb: "40px" }}
      >
        請你思考下列創傷事件後有時會出現的反應，本問卷的目的是關心你在經歷這項發生在身上的創傷事件後所出現的反應。請你判斷在過去一週是否曾經歷以下所列列出的任何情形至少兩次。
      </Typography>
      <Typography
        sx={{ fontSize: "1.5rem", fontWeight: "bold", mx: "49px", mb: "40px" }}
      >
        如果任一題敘述的情形在過去一週至少出現兩次，勾選「是」
        ；若此情形只出現一次或完全沒有出現，勾選「否」。
      </Typography>
      <Typography
        sx={{ fontSize: "1.5rem", fontWeight: "bold", mx: "49px", mb: "40px" }}
      >
        （是 = 過去一週至少兩次；否 = 過去一週僅一次或未出現）
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
                background: "#A5807B",
                borderRadius: "10px",
                p: "3px",
              }}
            >
              <Box
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  "& td": {
                    border: "4px solid #A5807B",
                    background: "#f4f4ea",
                    fontSize: "1.25rem",
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
                        background: "#B89E9B",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <Box
                      component="td"
                      sx={{
                        borderTopLeftRadius: "10px",
                        width: "74px",
                        height: "53px",
                      }}
                    >
                      是
                    </Box>
                    <Box component="td" sx={{ width: "74px" }}>
                      否
                    </Box>
                    <Box component="td" sx={{ width: "800px" }}>
                      症狀
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
  {
    title: "與該事件相關且令人不舒服的想法和記憶，會在你不想要的時候。",
    name: "item_one",
  },
  { title: "進入你心中。作與該事件相關令人不舒服的夢。", name: "item_two" },
  { title: "出現彷彿該事件又重新發生般的舉動或感覺。", name: "item_three" },
  { title: "遇到與該事件相關的事物而感覺不舒服。", name: "item_four" },
  {
    title: "回想該事件時出現身體反應(如心跳加速、胃部劇烈攪動、冒汗、暈眩)。",
    name: "item_five",
  },
  { title: "難以入睡或保持安睡。", name: "item_six" },
  { title: "躁動不安或爆發憤恕。", name: "item_seven" },
  { title: "難以專注。", name: "item_eight" },
  { title: "對可能威脅自己與他人的危險提高警覺。", name: "item_nine" },
  { title: "對出乎意料的事物提心吊膽或驚嚇。", name: "item_ten" },
];

function ItemRow({ model }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {item.map(({ title, name }) => (
        <Box
          component="tr"
          key={name}
          sx={{
            "& td": {
              p: 0,
            },
            "& input[type='radio']": {
              appearance: "none",
              display: "none",
              "& + label": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "65px",
              },
              "&:checked + label": {
                background: "#B89E9B",
              },
            },
          }}
        >
          <Box component="td">
            <input
              disabled={model}
              {...register(name, {
                required: "必填",
              })}
              type="radio"
              value="是"
              id={name}
            />
            <Box htmlFor={name} component="label"></Box>
          </Box>
          <Box component="td">
            <input
              disabled={model}
              {...register(name, {
                required: "必填",
              })}
              type="radio"
              value="否"
              id={name + 1}
            />
            <Box htmlFor={name + 1} component="label"></Box>
          </Box>
          <Box
            component="td"
            sx={{
              height: "53px",
              fontWeight: "bold",
              textAlign: "start",
              p: 2,
            }}
          >
            {title}
            {errors[name] && (
              <Typography color="error">{errors[name].message}</Typography>
            )}
          </Box>
        </Box>
      ))}
    </>
  );
}
