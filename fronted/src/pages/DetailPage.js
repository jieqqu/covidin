import React from "react";
import { useForm } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";
import EditModifyComponent from "../components/EditModifyComponent";
import SubmitOrResetComponent from "../components/SubmitOrResetComponent";
import { useModel } from "../hook/useModel";

const inputBox = { display: "flex", alignItems: "center", my: 2 };

const inputTitle = {
  fontSize: "1.25rem",
  color: "#5E574E",
  fontWeight: "bold",
};

const input = {
  margin: "0 40px",
  backgroundColor: "transparent",
  borderRadius: "5px",
  height: "20px",
  borderColor: "#7C7C7C",
};

const defaultValues = {
  date: "2022-05-31",
  birth_date: "2000-02-28",
  email: "wang@gmail.com",
  sex: "男",
  id_number: "F129558583",
  infect_covid: "是",
  infect_date: "2022-05-07",
  treatment_place: "醫院",
  oxygen_treatment: "無",
  ICU_treatment: "否",
  discharged_date: "2022-05-08",
  revisit: "是",
  revisit_division: "胸腔科",
  deal_with: "繼續留在特別門診",
};

export const DetailPage = () => {
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

  const onSubmit = async (data) => {
    // await fetch(
    //   "https://1e01-2001-b011-4007-19c5-5092-66f9-5015-4a08.ngrok.io/api/createcase",
    //   {
    //     method: "POST",
    //     mode: "cors",
    //     body: JSON.stringify(data),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((json) => console.log(json))
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

      <form
        id="myform"
        onSubmit={handleSubmit(onSubmit)}
        // style={{ width: "min-content", margin: 0 }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Box sx={inputBox}>
            <Typography sx={inputTitle}>就診日期</Typography>
            <input
              disabled={model}
              {...register("date", {
                required: "必填",
              })}
              type="date"
              style={input}
            />
            {errors.date && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.date.message}
              </Typography>
            )}
          </Box>
          {/* <Box sx={inputBox}>
            <Typography sx={inputTitle}>姓名</Typography>
            <input
              {...register("name", {
                required: "必填",
              })}
              type="text"
              style={input}
            />
            {errors.name && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.name.message}
              </Typography>
            )}
          </Box> */}
          <Box sx={inputBox}>
            <Typography sx={inputTitle}>姓名</Typography>
            <Typography sx={{ ...inputTitle, ml: 10 }}>王大明</Typography>
          </Box>
          <Box sx={inputBox}>
            <Typography sx={inputTitle}>病歷號</Typography>
            <Typography sx={{ ...inputTitle, ml: 7.5 }}>123456789</Typography>
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>出生年月日</Typography>
            <input
              disabled={model}
              {...register("birth_date", {
                required: "必填",
              })}
              type="date"
              style={input}
            />
            {errors.birth_date && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.birth_date.message}
              </Typography>
            )}
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>E-mail</Typography>
            <input
              disabled={model}
              {...register("email", {
                required: "必填",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email格式不正確",
                },
              })}
              style={input}
            />
            {errors.email && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.email.message}
              </Typography>
            )}
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>性別</Typography>
            <label>
              <input
                disabled={model}
                {...register("sex", {
                  required: "必填",
                })}
                type="radio"
                value="男"
                style={{ marginLeft: "40px" }}
              />
              男
            </label>
            <label>
              <input
                disabled={model}
                {...register("sex", {
                  required: "必填",
                })}
                type="radio"
                value="女"
              />
              女
            </label>
            <label style={{ marginRight: "40px" }}>
              <input
                disabled={model}
                {...register("sex", {
                  required: "必填",
                })}
                type="radio"
                value="其他"
              />
              其他
            </label>
            {errors.sex && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.sex.message}
              </Typography>
            )}
          </Box>

          {/* <Box sx={inputBox}>
            <Typography sx={inputTitle}>病歷號</Typography>
            <input
              disabled={model}
              {...register("medical_record_number", {
                required: "必填",
              })}
              type="text"
              style={input}
            />
            {errors.medical_record_number && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.medical_record_number.message}
              </Typography>
            )}
          </Box> */}

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>身份證字號</Typography>
            <input
              disabled={model}
              {...register("id_number", {
                required: "必填",
                minLength: { value: 10, message: "不得少於10位" },
              })}
              type="text"
              style={input}
            />
            {errors.id_number && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.id_number.message}
              </Typography>
            )}
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>是否曾為COVID卻診個案</Typography>
            <label style={{ marginLeft: "40px" }}>
              <input
                disabled={model}
                {...register("infect_covid", {
                  required: "必填",
                })}
                type="radio"
                value="是"
              />
              是
            </label>
            <label style={{ marginRight: "40px" }}>
              <input
                disabled={model}
                {...register("infect_covid", {
                  required: "必填",
                })}
                type="radio"
                value="否"
              />
              否
            </label>
            {errors.infect_covid && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.infect_covid.message}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: "#7C7C7C" }}>
              注意是否可能為焦慮，擔心自己罹病的個案
            </Typography>
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>確診日期</Typography>
            <input
              disabled={model}
              {...register("infect_date", {
                required: "必填",
              })}
              type="date"
              style={input}
            />
            {errors.infect_date && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.infect_date.message}
              </Typography>
            )}
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>COVID治療地點</Typography>
            <select
              disabled={model}
              {...register("treatment_place", {
                required: "必填",
              })}
              style={input}
            >
              <option></option>
              <option value="醫院">醫院</option>
              <option value="防疫旅館">防疫旅館</option>
              <option value="家裡">家裡</option>
            </select>
            {errors.treatment_place && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.treatment_place.message}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: "#7C7C7C" }}>
              可能會有轉換，以主要位置為主，有住院經驗就選醫院
            </Typography>
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>
              COVID治療期間
              <br />
              最嚴重的氧氣使用經驗
            </Typography>
            <select
              disabled={model}
              {...register("oxygen_treatment", {
                required: "必填",
              })}
              style={input}
            >
              <option></option>
              <option value="無">無</option>
              <option value="鼻導管">鼻導管</option>
              <option value="呼吸面罩">呼吸面罩</option>
              <option value="高流量鼻導管">高流量鼻導管</option>
              <option value="氣管內管插管">氣管內管插管</option>
            </select>
            {errors.oxygen_treatment && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.oxygen_treatment.message}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: "#7C7C7C" }}>
              以病人訴說為主
            </Typography>
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>
              COVID治療期間
              <br />
              是否入住加護病房
            </Typography>
            <label>
              <input
                disabled={model}
                {...register("ICU_treatment", {
                  required: "必填",
                })}
                type="radio"
                value="是"
                style={{ marginLeft: "40px" }}
              />
              是
            </label>
            <label style={{ marginRight: "40px" }}>
              <input
                disabled={model}
                {...register("ICU_treatment", {
                  required: "必填",
                })}
                type="radio"
                value="否"
              />
              否
            </label>
            {errors.ICU_treatment && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.ICU_treatment.message}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: "#7C7C7C" }}>
              以病人訴說為主
            </Typography>
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>出院日期</Typography>
            <input
              disabled={model}
              {...register("discharged_date", {
                required: "必填",
              })}
              type="date"
              style={input}
            />
            {errors.discharged_date && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.discharged_date.message}
              </Typography>
            )}
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>
              COVID之後
              <br />
              是否有因為COVID定期回診
            </Typography>
            <label>
              <input
                disabled={model}
                {...register("revisit", {
                  required: "必填",
                })}
                type="radio"
                value="是"
                style={{ marginLeft: "40px" }}
              />
              是
            </label>
            <label style={{ marginRight: "40px" }}>
              <input
                disabled={model}
                {...register("revisit", {
                  required: "必填",
                })}
                type="radio"
                value="否"
              />
              否
            </label>
            {errors.revisit && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.revisit.message}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: "#7C7C7C" }}>
              因為COVID新增的才紀錄「是」
            </Typography>
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>
              如果有因COVID定期回診
              <br />
              請填回診科別
            </Typography>
            <select
              disabled={model}
              {...register("revisit_division", {
                required: "必填",
              })}
              style={input}
            >
              <option></option>
              <option value="胸腔科">胸腔科</option>
              <option value="感染科">感染科</option>
              <option value="復健科">復健科</option>
              <option value="神經科">神經科</option>
              <option value="精神科">精神科</option>
              <option value="其他">其他</option>
            </select>
            {errors.revisit_division && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.revisit_division.message}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: "#7C7C7C" }}>
              如看多科，COVID主要的為主
            </Typography>
          </Box>

          <Box sx={inputBox}>
            <Typography sx={inputTitle}>特別門診處置</Typography>
            <select
              disabled={model}
              {...register("deal_with", {
                required: "必填",
              })}
              style={input}
            >
              <option></option>
              <option value="轉回原主要看診醫師">轉回原主要看診醫師</option>
              <option value="轉介精神科">轉介精神科</option>
              <option value="轉介新的科別評估">轉介新的科別評估</option>
              <option value="繼續留在特別門診">繼續留在特別門診</option>
            </select>
            {errors.deal_with && (
              <Typography color="error" sx={{ mr: 1 }}>
                {errors.deal_with.message}
              </Typography>
            )}
          </Box>
        </div>
        <Box sx={{ mt: 7 }}>
          <SubmitOrResetComponent model={model} />
        </Box>
      </form>
    </div>
  );
};
