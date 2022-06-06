import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";
import EditModifyComponent from "../components/EditModifyComponent";
import SubmitOrResetComponent from "../components/SubmitOrResetComponent";
import { useModel } from "../hook/useModel";

const defaultValues = {
  tqs_point: "6",
  gad_point: "11",
  phq_point: "14",
  suicidal_ideation: "有",
  suicidal_ideation_remark: "",
  psiq_point: "11",
  psiq_evaluation_point_one: "1",
  psiq_evaluation_point_two: "1",
  psiq_evaluation_point_three: "1",
  psiq_evaluation_point_four: "2",
  psiq_evaluation_point_five: "2",
  psiq_evaluation_point_six: "2",
  psiq_evaluation_point_seven: "2",
  evaluators: "陳慧文",
  evaluators_date: "2022-06-08",
};

export const PsychosomaticSummaryPage = () => {
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
  } = methods;
  // arr.map((value,index)=>console.log(index+1))

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
          收案紀錄表
        </Typography>
        <EditModifyComponent />
      </Box>
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
                background: "#A08623",
                borderRadius: "10px",
                p: "3px",
              }}
            >
              <Box
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  "& td": {
                    border: "4px solid #A08623",
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
                        background: "#D2B670",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <Box
                      component="td"
                      sx={{
                        borderTopLeftRadius: "10px",
                        width: "168px",
                        height: "60px",
                      }}
                    >
                      問卷
                    </Box>
                    <Box component="td" sx={{ width: "185px" }}>
                      總分
                    </Box>
                    <Box component="td" sx={{ width: "298px" }}>
                      評估分向度
                    </Box>
                    <Box
                      component="td"
                      sx={{ borderTopRightRadius: "10px", width: "320px" }}
                    >
                      備註
                    </Box>
                  </Box>

                  <TsqRow model={model} />
                  <GadRow model={model} />
                  <PhqRow model={model} />
                  <PsiqRow model={model} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 7,
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            <Box
              sx={{
                display: "flex",
                mr: 5,
              }}
            >
              評估人員:
              <input
                type="text"
                disabled={model}
                {...register("evaluators", {
                  required: "必填",
                })}
                style={{ margin: "0 5px" }}
              />
              {errors.evaluators && (
                <Typography color="error">
                  {errors.evaluators.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              評估日期:
              <input
                type="date"
                disabled={model}
                {...register("evaluators_date", {
                  required: "必填",
                })}
                style={{ margin: "0 5px" }}
              />
              {errors.evaluators_date && (
                <Typography color="error">
                  {errors.evaluators_date.message}
                </Typography>
              )}
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

function TsqRow({ model }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Box component="tr">
        <Box component="td" sx={{ height: "213px" }}>
          創傷篩檢問卷TSQ(10題版)
        </Box>
        <Box component="td">
          <select
            disabled={model}
            {...register("tqs_point", {
              required: "必填",
            })}
            style={{
              width: "46px",
              height: "20px",
              marginRight: "5px",
            }}
          >
            <option></option>
            {Array.apply(null, new Array(11)).map((value, index) => (
              <option key={"option" + index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          題<br />
          (總題數10題 選「是」題數)
          {errors.tqs_point && (
            <Typography color="error">{errors.tqs_point.message}</Typography>
          )}
        </Box>
        <Box component="td">
          「過去一週」是否曾經歷以下所列出的任何情形至少兩次。
          如果此情形只出現一次或完全沒有出現,勾選「否」;若任一題
          敘述的情形在過去一週至少出現兩次,勾選「是」
        </Box>
        <Box component="td">
          十題中,有四題選「是」,陽性(總題數6,評估連結精神科)
        </Box>
      </Box>
    </>
  );
}

function GadRow({ model }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Box component="tr">
        <Box component="td" sx={{ height: "145px", fontSize: "1.25rem" }}>
          焦慮自我評估量表GAD-7
        </Box>
        <Box component="td">
          <select
            disabled={model}
            {...register("gad_point", {
              required: "必填",
            })}
            style={{
              width: "46px",
              height: "20px",
              marginRight: "5px",
            }}
          >
            <option></option>
            {Array.apply(null, new Array(21)).map((value, index) => (
              <option key={"option" + index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          分/21分
          {errors.gad_point && (
            <Typography color="error">{errors.gad_point.message}</Typography>
          )}
        </Box>
        <Box component="td">無特別警示之項目。</Box>
        <Box component="td">
          <Box
            sx={{
              display: "flex",
              textAlign: "start",
              justifyContent: "center",
            }}
          >
            00-04極輕微焦慮
            <br />
            05-09度焦慮
            <br />
            10-14中度焦慮
            <br />
            15-21重度焦慮
          </Box>
        </Box>
      </Box>
    </>
  );
}

function PhqRow({ model }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Box component="tr">
        <Box component="td" sx={{ height: "133px", fontSize: "1.25rem" }}>
          病人健康問卷PHQ-9
        </Box>
        <Box component="td">
          <select
            disabled={model}
            {...register("phq_point", {
              required: "必填",
            })}
            style={{
              width: "46px",
              height: "20px",
              marginRight: "5px",
            }}
          >
            <option></option>
            {Array.apply(null, new Array(27)).map((value, index) => (
              <option key={"option" + index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          分/27分
          {errors.phq_point && (
            <Typography color="error">{errors.phq_point.message}</Typography>
          )}
        </Box>
        <Box component="td">
          【題9】自殺意念留意
          <br /> (
          <input
            disabled={model}
            type="radio"
            value="有"
            {...register("suicidal_ideation", {
              required: "必填",
            })}
          />
          有
          <input
            disabled={model}
            type="radio"
            value="無"
            {...register("suicidal_ideation", {
              required: "必填",
            })}
          />
          無)(指標題)
          <br />
          註:
          <input
            disabled={model}
            type="text"
            {...register("suicidal_ideation_remark")}
          />
          {errors.suicidal_ideation && (
            <Typography color="error">
              {errors.suicidal_ideation.message}
            </Typography>
          )}
        </Box>
        <Box component="td">
          <Box
            sx={{
              display: "flex",
              textAlign: "start",
              justifyContent: "center",
            }}
          >
            10-14分:輕度憂鬱
            <br />
            15-19分:中度憂鬱
            <br />
            20分以上:重度憂鬱
          </Box>
        </Box>
      </Box>
    </>
  );
}

function PsiqRow({ model }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Box component="tr">
        <Box
          component="td"
          sx={{
            borderBottomLeftRadius: "10px",
            height: "361px",
            fontSize: "1.25rem",
          }}
        >
          匹茲堡睡眠品質量表PSQI
        </Box>
        <Box component="td">
          <select
            disabled={model}
            {...register("psiq_point", {
              required: "必填",
            })}
            style={{
              width: "46px",
              height: "20px",
              marginRight: "5px",
            }}
          >
            <option></option>
            {Array.apply(null, new Array(21)).map((value, index) => (
              <option key={"option" + index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          分/21分
          <br />
          (七層面總分) 切截:總分&gt;5
          {errors.psiq_point && (
            <Typography color="error">{errors.psiq_point.message}</Typography>
          )}
        </Box>
        <Box component="td">
          <Box sx={{ fontSize: "1rem" }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: "auto" }}>睡眠品質(題9):</Box>
              <Box>
                <select
                  disabled={model}
                  {...register("psiq_evaluation_point_one", {
                    required: "必填",
                  })}
                  style={{
                    width: "46px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  <option></option>
                  {Array.apply(null, new Array(3)).map((value, index) => (
                    <option key={"option" + index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                分/03分
                {errors.psiq_evaluation_point_one && (
                  <Typography color="error">
                    {errors.psiq_evaluation_point_one.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: "auto" }}>睡眠潛伏期(題2+5a):</Box>
              <Box>
                <select
                  disabled={model}
                  {...register("psiq_evaluation_point_two", {
                    required: "必填",
                  })}
                  style={{
                    width: "46px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  <option></option>
                  {Array.apply(null, new Array(3)).map((value, index) => (
                    <option key={"option" + index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                分/03分
                {errors.psiq_evaluation_point_two && (
                  <Typography color="error">
                    {errors.psiq_evaluation_point_two.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: "auto" }}>睡眠時數(題4): </Box>
              <Box>
                <select
                  disabled={model}
                  {...register("psiq_evaluation_point_three", {
                    required: "必填",
                  })}
                  style={{
                    width: "46px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  <option></option>
                  {Array.apply(null, new Array(3)).map((value, index) => (
                    <option key={"option" + index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                分/03分
                {errors.psiq_evaluation_point_three && (
                  <Typography color="error">
                    {errors.psiq_evaluation_point_three.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: "auto" }}>睡眠效率(題4/躺床時數):</Box>
              <Box>
                <select
                  disabled={model}
                  {...register("psiq_evaluation_point_four", {
                    required: "必填",
                  })}
                  style={{
                    width: "46px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  <option></option>
                  {Array.apply(null, new Array(3)).map((value, index) => (
                    <option key={"option" + index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                分/03分
                {errors.psiq_evaluation_point_four && (
                  <Typography color="error">
                    {errors.psiq_evaluation_point_four.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: "auto" }}>睡眠困擾(題5b~5j):</Box>
              <Box>
                <select
                  disabled={model}
                  {...register("psiq_evaluation_point_five", {
                    required: "必填",
                  })}
                  style={{
                    width: "46px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  <option></option>
                  {Array.apply(null, new Array(3)).map((value, index) => (
                    <option key={"option" + index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                分/03分
                {errors.psiq_evaluation_point_five && (
                  <Typography color="error">
                    {errors.psiq_evaluation_point_five.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: "auto" }}>安眠藥物使用(題6):</Box>
              <Box>
                <select
                  disabled={model}
                  {...register("psiq_evaluation_point_six", {
                    required: "必填",
                  })}
                  style={{
                    width: "46px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  <option></option>
                  {Array.apply(null, new Array(3)).map((value, index) => (
                    <option key={"option" + index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                分/03分
                {errors.psiq_evaluation_point_six && (
                  <Typography color="error">
                    {errors.psiq_evaluation_point_six.message}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mr: "auto" }}>白天功能運作(題7+8): </Box>
              <Box>
                <select
                  disabled={model}
                  {...register("psiq_evaluation_point_seven", {
                    required: "必填",
                  })}
                  style={{
                    width: "46px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  <option></option>
                  {Array.apply(null, new Array(3)).map((value, index) => (
                    <option key={"option" + index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                分/03分                        
                {errors.psiq_evaluation_point_seven && (
                  <Typography color="error">
                    {errors.psiq_evaluation_point_seven.message}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box component="td" sx={{ borderBottomRightRadius: "10px" }}>
          <Box
            sx={{
              display: "flex",
              textAlign: "start",
              justifyContent: "center",
              fontSize: "1rem",
              py: 2,
            }}
          >
            【睡眠品質】題9
            <br />
            非常好(0)好(1)、不好(2)、非常不好(3)
            <br />
            【睡眠潛伏】題2+5
            <br />
            0(0分)、1-2(1分)3-4(2分)、5-6(3分)
            <br />
            【睡眠時數】題4「時數」
            <br />
            &gt;7hrs(0分)、6-7(1分)、
            <br />
            5-6(2分)、&lt;5hrs(3分)
            <br />
            【睡眠效率】題4/躺床X100
            <br />
            859(0分)、75%~84%(1分)
            <br />
            65%~74%(2分)、65%(3分)
            <br />
            【睡眠困擾】題5b〜j加總
            <br />
            0(0分)、1-9(1分)、
            <br />
            10-18(2分)、19-27(3分)
            <br />
            【白天功能】題7+題8
            <br />
            0(0分)・1-2(1分)、34(2分)、5-6(3分)
          </Box>
        </Box>
      </Box>
    </>
  );
}
