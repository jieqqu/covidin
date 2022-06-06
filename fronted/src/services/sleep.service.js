import axios from "axios";
const API_URL = "http://localhost:899/create/sleep";

class SleepService {
  createSleep(data) {
    const item_one = data.item_one.split(":");
    const item_three = data.item_one.split(":");

    return axios.post(API_URL, {
      // medical_record_number: 2148590,
      // sleep_time_hour: item_one[0],
      // sleep_time_minute: item_one[1],
      // fall_asleep: data.item_two,
      // wakeup_hour: item_three[0],
      // wakeup_minute: item_three[1],
      // sleep_hour: data.item_four,
      // sleep_minute: data.item_four_two,
      // sleep_in_30mins: data.item_five,
      // wakeup_in_midnight: data.item_six,
      // go_bathroom: data.item_seven,
      // breathless: data.item_eight,
      // snoring: data.item_nine,
      // feel_cold: data.item_ten,
      // feel_hot: data.item_eleven,
      // nightmare: data.item_twelve,
      // pain: data.item_thirteen,
      // other: null,
      // other_lever: data.item_fourteen,
      // sleeping_pills: data.item_fifteen,
      // cant_stay_awake: data.item_sixteen,
      // troubled: data.item_seventeen,
      // sleep_quality: data.item_eighteen,
      medical_record_number: 2148590,
      sleep_time_hour: 12,
      sleep_time_minute: 21,
      fall_asleep: 12,
      wakeup_hour: 21,
      wakeup_minute: 21,
      sleep_hour: 12,
      sleep_minute:12,
      sleep_in_30mins: 1,
      wakeup_in_midnight: 1,
      go_bathroom: 1,
      breathless: 1,
      snoring: 1,
      feel_cold: 1,
      feel_hot: 1,
      nightmare: 1,
      pain: 1,
      other: null,
      other_lever: 1,
      sleeping_pills: 1,
      cant_stay_awake: 1,
      troubled: 1,
      sleep_quality: 1,
    });
  }
}

export default new SleepService();