import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";
import EditModifyComponent from "../components/EditModifyComponent";
// import SleepService from "../services/sleep.service";
import SubmitOrResetComponent from "../components/SubmitOrResetComponent";
import { useModel } from "../hook/useModel";

const defaultValues = {
  item_one: "01:00",
  item_two: "30",
  item_three: "10:00",
  item_four: "8",
  item_four_two: "0",
  item_five: "1",
  item_six: "1",
  item_seven: "1",
  item_eight: "0",
  item_nine: "1",
  item_ten: "1",
  item_eleven: "1",
  item_twelve: "1",
  item_thirteen: "1",
  item_fourteen: "1",
  item_fifteen: "0",
  item_sixteen: "0",
  item_seventeen: "1",
  item_eighteen: "0",
};

export const SleepPage = () => {
  const [total, setTotal] = useState(false);
  const model = useModel();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: React.useMemo(() => {
      return model && defaultValues;
    }, [model]),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = methods;
  const {
    item_two,
    item_four,
    item_eight,
    item_eighteen,
    item_eleven,
    item_fifteen,
    item_five,
    item_fourteen,
    item_nine,
    item_seven,
    item_seventeen,
    item_six,
    item_sixteen,
    item_ten,
    item_thirteen,
    item_twelve,
  } = watch();

  const update = React.useRef(false);

  useEffect(() => {
    if (model) {
      setTotal(handleTotal());
    }
    if (update.current) {
      setTotal(handleTotal());
    }
    return () => (update.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()]);

  function getFallAsleep(value) {
    let result;
    if (value < 30) {
      result = 0;
    } else if (30 <= value && value < 60) {
      result = 1;
    } else if (60 <= value) {
      result = 2;
    }
    return result;
  }

  function getSleepHour(value) {
    let result;
    if (7 <= value) {
      result = 0;
    } else if (6 <= value && value < 7) {
      result = 1;
    } else if (4 <= value && value <= 5) {
      result = 2;
    } else {
      result = 3;
    }
    return result;
  }

  function getSleepProblem(obj) {
    let result = 0;
    for (var prop in obj) {
      let value = parseInt(obj[prop]);
      if (isNaN(value)) {
        value = 0;
      }
      result = result + value;
    }
    return result;
  }

  function handleTotal() {
    let get_fall_asleep_score = Number(item_two);
    let get_sleep_hour_score = Number(item_four);
    let get_sleep_problem_score = {
      item_eight,
      item_eighteen,
      item_eleven,
      item_fifteen,
      item_five,
      item_fourteen,
      item_nine,
      item_seven,
      item_seventeen,
      item_six,
      item_sixteen,
      item_ten,
      item_thirteen,
      item_twelve,
    };
    get_fall_asleep_score = getFallAsleep(get_fall_asleep_score);
    get_sleep_hour_score = getSleepHour(get_sleep_hour_score);
    get_sleep_problem_score = getSleepProblem(get_sleep_problem_score);

    return (
      get_fall_asleep_score + get_sleep_hour_score + get_sleep_problem_score
    );
  }

  // const onSubmit = async (data) => {
  //   await fetch(
  //     "https://1e01-2001-b011-4007-19c5-5092-66f9-5015-4a08.ngrok.io/api/createcase",
  //     {
  //       method: "POST",
  //       mode: "cors",
  //       body: JSON.stringify(data),
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   alert(data);
  // };

  const onSubmit = (data) => {
    // SleepService.createSleep(data)
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e));
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
          匹茲堡睡眠品質量表
        </Typography>
        <EditModifyComponent />
      </Box>
      <Typography
        sx={{ fontSize: "1.75rem", fontWeight: "bold", mx: "49px", mb: "40px" }}
      >
        下列問題是要調查您過去這一個月來的睡眠習慣，請您以平均狀況回答以下每一個問題。
      </Typography>

      <FormProvider {...methods}>
        <form
          id="myform"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mx: "50px",
              mb: "40px",
              fontSize: "1.75rem",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              1.過去一個月來,您晚上通常幾點上床睡覺?
              <input
                disabled={model}
                type="time"
                {...register("item_one", {
                  required: "必填",
                })}
              />
              {errors.item_one && (
                <Typography color="error">{errors.item_one.message}</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              2.過去一個月來,您在上床後,通常躺多久才能入睡?
              <input
                disabled={model}
                type="text"
                {...register("item_two", {
                  required: "必填",
                })}
              />
              分
              {errors.item_two && (
                <Typography color="error">{errors.item_two.message}</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              3.過去一個月來,您上通常幾點起床?
              <input
                type="time"
                disabled={model}
                {...register("item_three", {
                  required: "必填",
                })}
              />
              {errors.item_three && (
                <Typography color="error">
                  {errors.item_three.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              4過去一個月來,您每天晚上真正睡著的時間約多少?
              <input
                type="text"
                disabled={model}
                {...register("item_four", {
                  required: "必填",
                })}
              />
              小時
              {errors.item_four && (
                <Typography color="error">
                  {errors.item_four.message}
                </Typography>
              )}
              <input
                type="text"
                disabled={model}
                {...register("item_four_two", {
                  required: "必填",
                })}
              />
              分
              {errors.item_four_two && (
                <Typography color="error">
                  {errors.item_four_two.message}
                </Typography>
              )}
              <br />
            </Box>
            <span style={{ fontSize: "1.25rem" }}>
              (這可能和您躺在床上所花的時間不同)
            </span>
          </Box>
          <Typography
            sx={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              mx: "49px",
              mb: "40px",
            }}
          >
            下列問題請選擇最適合您的答案,在適合的選項内打勾,並回答所有問題。
          </Typography>
          <Box sx={{ alignSelf: "center" }}>
            <Box
              sx={{
                textAlign: "center",
                background: "#8AA6B1",
                borderRadius: "10px",
                p: "3px",
              }}
            >
              <Box
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  "& td": {
                    border: "4px solid #8AA6B1",
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
                        background: "#A4B6BA",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <Box
                      component="td"
                      sx={{
                        borderTopLeftRadius: "10px",
                        width: "458px",
                        height: "105px",
                        textAlign: "start",
                        px: 1,
                        background: "#f4f4ea !important",
                        color: "#000 !important",
                        fontSize: "1.25rem !important",
                      }}
                    >
                      5.過去一個月來,
                      <br />
                      您的睡眠有多少次受到下列干擾?
                    </Box>
                    <Box component="td" sx={{ width: "130px" }}>
                      從未發生
                    </Box>
                    <Box component="td" sx={{ width: "130px" }}>
                      每週少於
                      <br />
                      1次
                    </Box>
                    <Box component="td" sx={{ width: "130px" }}>
                      每週
                      <br />
                      1-2次
                    </Box>
                    <Box
                      component="td"
                      sx={{ borderTopRightRadius: "10px", width: "130px" }}
                    >
                      每週3次
                      <br />
                      或以上
                    </Box>
                  </Box>

                  <ItemRow model={model} />
                </Box>
              </Box>
            </Box>
            <OtherTable model={model} />
            <Box
              sx={{
                display: "flex",
                fontSize: "1.5rem",
                fontWeight: "bold",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              總分
              <Box
                sx={{
                  border: "2px solid #8AA6B1",
                  width: "128px",
                  height: "47px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  ml: 1,
                }}
              >
                {total}
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 7, alignSelf: "center" }}>
            <SubmitOrResetComponent model={model} />
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

const item = [
  { title: "a.無法在30分鐘入", name: "item_five" },
  { title: "b.半夜或清晨醒來", name: "item_six" },
  { title: "c.需要起床上廁所", name: "item_seven" },
  { title: "d.呼吸不順暢", name: "item_eight" },
  { title: "e.咳嗽或大聲打鼾", name: "item_nine" },
  { title: "f.感覺很冷", name: "item_ten" },
  { title: "g.感覺很熱", name: "item_eleven" },
  { title: "h.作惡夢", name: "item_twelve" },
  { title: "i.疼痛", name: "item_thirteen" },
  { title: "j.其他情況請說明:", name: "item_fourteen" },
  {
    title: "6.過去一個月來,您有多少次需要藉助藥物(醫師處方或成藥)來幫助睡眠?",
    name: "item_fifteen",
  },
  {
    title:
      "7.過去一個月來,當您在開車、用餐、從事日常社交活動時,有多少次覺得難以保持清醒狀態?",
    name: "item_sixteen",
  },
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
                // height: "65px",
                position: "absolute",
                left: -1,
                right: -1,
                top: -1,
                bottom: -1,
              },
              "&:checked + label": {
                background: "#A4B6BA",
              },
            },
          }}
        >
          <Box
            component="td"
            sx={{
              height: "72px",
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
          {[0, 1, 2, 3].map((value) => (
            <Box component="td" key={name + value}>
              <input
                disabled={model}
                {...register(name, {
                  required: "必填",
                })}
                type="radio"
                value={value}
                id={name + value}
              />
              <Box htmlFor={name + value} component="label"></Box>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
}

function OtherTable({ model }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          background: "#8AA6B1",
          borderRadius: "10px",
          p: "3px",
          mt: 2,
        }}
      >
        <Box
          sx={{
            borderCollapse: "separate",
            borderSpacing: 0,
            "& td": {
              border: "4px solid #8AA6B1",
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
                  background: "#A4B6BA",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                },
              }}
            >
              <Box
                component="td"
                sx={{
                  borderTopLeftRadius: "10px",
                  width: "458px",
                  textAlign: "start",
                  px: 1,
                }}
              ></Box>
              <Box component="td" sx={{ width: "130px" }}>
                完全沒有困擾
              </Box>
              <Box component="td" sx={{ width: "130px" }}>
                只有很少困擾
              </Box>
              <Box component="td" sx={{ width: "130px" }}>
                有些困擾
              </Box>
              <Box
                component="td"
                sx={{ borderTopRightRadius: "10px", width: "130px" }}
              >
                有很大的困擾
              </Box>
            </Box>
            <Box
              component="tr"
              sx={{
                "& td": {
                  position: "relative",
                  p: 1,
                },
                "& input[type='radio']": {
                  appearance: "none",
                  display: "none",
                  "& + label": {
                    position: "absolute",
                    left: -1,
                    right: -1,
                    top: -1,
                    bottom: -1,
                  },
                  "&:checked + label": {
                    background: "#A4B6BA",
                  },
                },
              }}
            >
              <Box
                component="td"
                sx={{
                  height: "72px",
                  fontWeight: "bold",
                  textAlign: "start",
                  p: 2,
                }}
              >
                8.過去一個月來,要打起精神來
                <br />
                完成您應該做的事情對您有多少困擾?
                {errors.item_seventeen && (
                  <Typography color="error">
                    {errors.item_seventeen.message}
                  </Typography>
                )}
              </Box>
              {["完全沒有困擾", "只有很少困擾", "有些困擾", "有很大的困擾"].map(
                (value, index) => (
                  <Box component="td" key={value}>
                    <input
                      disabled={model}
                      {...register("item_seventeen", {
                        required: "必填",
                      })}
                      type="radio"
                      value={index}
                      id={value}
                    />
                    <Box htmlFor={value} component="label"></Box>
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          background: "#8AA6B1",
          borderRadius: "10px",
          p: "3px",
          my: 2,
        }}
      >
        <Box
          sx={{
            borderCollapse: "separate",
            borderSpacing: 0,
            "& td": {
              border: "4px solid #8AA6B1",
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
                  background: "#A4B6BA",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                },
              }}
            >
              <Box
                component="td"
                sx={{
                  borderTopLeftRadius: "10px",
                  width: "458px",
                  textAlign: "start",
                  px: 1,
                }}
              ></Box>
              <Box component="td" sx={{ width: "130px" }}>
                非常好
              </Box>
              <Box component="td" sx={{ width: "130px" }}>
                好
              </Box>
              <Box component="td" sx={{ width: "130px" }}>
                不好
              </Box>
              <Box
                component="td"
                sx={{ borderTopRightRadius: "10px", width: "130px" }}
              >
                非常不好
              </Box>
            </Box>
            <Box
              component="tr"
              sx={{
                "& td": {
                  position: "relative",
                  p: 1,
                },
                "& input[type='radio']": {
                  appearance: "none",
                  display: "none",
                  "& + label": {
                    position: "absolute",
                    left: -1,
                    right: -1,
                    top: -1,
                    bottom: -1,
                  },
                  "&:checked + label": {
                    background: "#A4B6BA",
                  },
                },
              }}
            >
              <Box
                component="td"
                sx={{
                  height: "72px",
                  fontWeight: "bold",
                  textAlign: "start",
                  p: 2,
                }}
              >
                9.過去一個月來,
                <br />
                您對您自己的睡眠品質整體評價如何?
                {errors.item_eighteen && (
                  <Typography color="error">
                    {errors.item_eighteen.message}
                  </Typography>
                )}
              </Box>
              {["非常好", "好", "不好", "非常不好"].map((value, index) => (
                <Box component="td" key={value}>
                  <input
                    disabled={model}
                    {...register("item_eighteen", {
                      required: "必填",
                    })}
                    type="radio"
                    value={index}
                    id={value}
                  />
                  <Box htmlFor={value} component="label"></Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
