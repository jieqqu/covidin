const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const session = require('express-session');

const { auth } = require('./authmiddlewares');
const { authPsychology } = require('./authmiddlewares');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    next();
})

//Body server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Body server
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

var myDB;
//Mysql connection
function handleError() {
    myDB = mysql.createConnection({
        host: 'bp9gmhcwuvh0yggs5khb-mysql.services.clever-cloud.com',
        port: 3306,
        user: 'ufcaf8ukrzcgzqot',
        password: '7I00EDOqBjzfGHWWT7Pw',
        database: 'bp9gmhcwuvh0yggs5khb',
        multipleStatements: true
    })
    myDB.on('error', function (err) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    })
};
handleError();

//Middleware
app.use(express.static('public'));
app.use(express.json());

//醫護人員login
app.post('/login', function (request, response) {

    let medical_account = request.body.medical_account;
    let password = request.body.password;
    console.log(request.body);
    // Ensure the input fields exists and are not empty
    if (medical_account && password) {
        // Execute SQL query that'll select the account from the database based on the specified medical_account and password
        myDB.query('SELECT office_code, name FROM login WHERE medical_account = ? AND password = ?',
         [medical_account, password], function (error, results) {
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.medical_account = medical_account;
                request.session.office_code = results[0].office_code;
                if (request.session.loggedin) {

                    let data = JSON.parse(JSON.stringify(results));
                    data[0]["loggedin"] = true;
                    return response.status(200).json(data);

                }
            } else {
                return response.status(200).json({ "loggedin": false });
            }
        })
    }
});
//Logout
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            return res.status(404).json({ "logoutSucced": false });
        } else {
            console.log('session destory');
            return res.json({ "logoutSucced": true });
        }
    });
})

//叫出今日初診病患 
app.get('/today', function (request, response) {
    //系統今天日期yyyy-mm-dd
    function getTodayDate() {
        var date = new Date();
        var yyyy = date.getFullYear();
        var MM = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1));
        var dd = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
        var todayy = yyyy + "-" + MM + "-" + dd;
        return todayy;
    }
    var today = getTodayDate();

    var db1 = `SELECT patient.medical_record_number,patient.name FROM patient JOIN register_date ON
    patient.medical_record_number = register_date.medical_record_number WHERE register_date.date = '${today}';`
    myDB.query(db1, function (error, results) {
        if (error) {
            console.log(error);
            return response.status(404).json({ "today": false });
        }
        console.log(results);
        let data1 = JSON.parse(JSON.stringify(results));
        data1[0]["today"] = true;
        data1[1]["today"] = true;
        return response.status(200).json(data1);
    })

});

//search bar
app.get('/search', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT name, medical_record_number FROM patient WHERE medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "search": false });
        }
        console.log(results);
        let data2 = JSON.parse(JSON.stringify(results));
        data2[0]["search"] = true;
        return response.status(200).json(data2);
    })

});

//select病患
app.get('/select/patient', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT medical_record_number,name,id_number,birth_date,sex FROM patient WHERE medical_record_number = ${medical_record_number}`;
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "selectPatient": false });
        }
        let data3 = JSON.parse(JSON.stringify(results));
        data3[0]["selectPatient"] = true;
        return response.status(200).json(data3);
    })
})
/*
//新增收案紀錄
app.post('/create/case', authCase(["A"]), function (request, response) {
    var medical_record_number = request.body.medical_record_number;
    var date = request.body.date
    var infect_covid = request.body.infect_covid;
    var infect_date = request.body.infect_date;
    var treatment_place = request.body.treatment_place;
    var oxygen_treatment = request.body.oxygen_treatment ? request.body.oxygen_treatment : null;;
    var ICU_treatment = request.body.ICU_treatment ? request.body.ICU_treatment : null;
    var discharged_date = request.body.discharged_date;
    var revisit = request.body.revisit ? request.body.revisit : null;
    var revisit_dicision = request.body.revisit_dicision ? request.body.revisit_dicision : null;
    var deal_with = request.body.deal_with ? request.body.deal_with : null;

    var db = `INSERT INTO case3(medical_record_number, infect_covid, date, infect_date, treatment_place, oxygen_treatment, ICU_treatment, discharged_date, revisit, revisit_dicision, deal_with) VALUES (${medical_record_number}, ${infect_covid}, '${date}', '${infect_date}', ${treatment_place}, ${oxygen_treatment}, ${ICU_treatment}, '${discharged_date}', ${revisit}, ${revisit_dicision}, ${deal_with})`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "createCase": false });
        }
        let data = JSON.parse(JSON.stringify(results));
        return response.status(200).json({ "createCase": true });
    })
});
*/
//select 收案紀錄
app.get('/select/case', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT medical_record_number,name, number,birth_date,sex,
    infect_covid, date,infect_date,treatment_place,oxygen_treatment,ICU_treatment,
    discharged_date,revisit,revisit_dicision,deal_with
    FROM patient WHERE medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "selectCase": false });
        }
        let data4 = JSON.parse(JSON.stringify(results));
        data4[0]["selectCase"] = true;
        return response.status(200).json(data4);
    })
});
//update 收案紀錄
app.post('/update/case', auth(["A"]), function (request, response) {
    var date = request.body.date;
    var infect_covid = request.body.infect_covid;
    var infect_date = request.body.infect_date;
    var treatment_place = request.body.treatment_place;
    var oxygen_treatment = request.body.oxygen_treatment ? request.body.oxygen_treatment : null;
    var ICU_treatment = request.body.ICU_treatment ? request.body.ICU_treatment : null;
    var discharged_date = request.body.discharged_date;
    var revisit = request.body.revisit ? request.body.revisit : null;
    var revisit_division = request.body.revisit_division ? request.body.revisit_division : null;
    var medical_record_number = request.body.medical_record_number ? request.body.medical_record_number : null;
    var deal_with = request.body.deal_with ? request.body.deal_with : null;

    var db = `UPDATE patient SET date = '${date}',infect_covid=${infect_covid},
        infect_date='${infect_date}',treatment_place=${treatment_place},oxygen_treatment=${oxygen_treatment},
        ICU_treatment=${ICU_treatment},discharged_date='${discharged_date}',revisit=${revisit},revisit_dicision=${revisit_division},
        deal_with=${deal_with} WHERE medical_record_number = ${medical_record_number}`;
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "updateCase": false });
        } else {
            let data = JSON.parse(JSON.stringify(results));
            return response.status(200).json({ "updateCase": true });
        }

    })
})

//新增DT
app.post('/create/DT', authPsychology(['B']),function (request, response) {
    var medical_record_number = request.body.medical_record_number ? request.body.medical_record_number : null;
    var DT = request.body.DT ? request.body.DT : null;

    var db = `INSERT INTO DT (medical_record_number,DT) VALUES (${medical_record_number}, ${DT});`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "createDT": false });
        } else {
            let data = JSON.parse(JSON.stringify(results));
            return response.status(200).json({ "createDT": true });
        }
    })
});
//select DT
app.get('/select/DT', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT medical_record_number , DT FROM DT WHERE medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "selectDT": false });
        }
        let data5 = JSON.parse(JSON.stringify(results));
        data5[0]["selectDT"] = true;
        return response.status(200).json(data5);
    })
})

//新增焦慮
app.post('/create/anxiety', authPsychology(['B']),function (request, response) {
    var medical_record_number = request.body.medical_record_number ? request.body.medical_record_number : null;
    var feeling_nervous = request.body.feeling_nervous ? request.body.feeling_nervous : null;
    var cant_stop_concern = request.body.cant_stop_concern ? request.body.cant_stop_concern : null;
    var worry_too_much = request.body.worry_too_much ? request.body.worry_too_much : null;
    var hard_to_relax = request.body.hard_to_relax ? request.body.hard_to_relax : null;
    var restless = request.body.restless ? request.body.restless : null;
    var irritability = request.body.irritability ? request.body.irritability : null;
    var scared = request.body.scared ? request.body.scared : null;
    var total = feeling_nervous+cant_stop_concern+worry_too_much+hard_to_relax+restless+irritability+scared;

    var db = `INSERT INTO anxiety_assessment (medical_record_number ,feeling_nervous ,cant_stop_concern ,worry_too_much ,hard_to_relax ,
        restless,irritability,scared,total)VALUES(${medical_record_number}, ${feeling_nervous},
            ${cant_stop_concern}, ${worry_too_much}, ${hard_to_relax}, ${restless}, ${irritability},${scared},${total});`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "createAnxiety": false });
        }
        let data = JSON.parse(JSON.stringify(results));
        return response.status(200).json({ "createAnxiety": true });
    })
})
//select 焦慮
app.get('/select/anxiety', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT medical_record_number,feeling_nervous,cant_stop_concern , worry_too_much ,hard_to_relax , restless ,irritability,scared 
    FROM anxiety_assessment WHERE medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "selectAnxiety": false });
        }
        let data6 = JSON.parse(JSON.stringify(results));
        data6[0]["selectAnxiety"] = true;
        return response.status(200).json(data6);
    })
})

//新增睡眠
app.post('/create/sleep', authPsychology(['B']),function (request, response) {
    var medical_record_number = request.body.medical_record_number;
    var sleep_time_hour = request.body.sleep_time_hour;
    var sleep_time_minute = request.body.sleep_time_minute;
    var fall_asleep = request.body.fall_asleep;
    var wakeup_hour = request.body.wakeup_hour;
    var wakeup_minute = request.body.wakeup_minute;
    var sleep_hour = request.body.sleep_hour;
    var sleep_minute = request.body.sleep_minute;
    var sleep_in_30mins = request.body.sleep_in_30mins;
    var wakeup_in_midnight = request.body.wakeup_in_midnight;
    var go_bathroom = request.body.go_bathroom;
    var breathless = request.body.breathless;
    var snoring = request.body.snoring;
    var feel_cold = request.body.feel_cold;
    var feel_hot = request.body.feel_hot;
    var nightmare = request.body.nightmare;
    var pain = request.body.pain;
    var other = request.body.other;
    var other_level = request.body.other_level;
    var sleeping_pills = request.body.sleeping_pills;
    var cant_stay_awake = request.body.cant_stay_awake;
    var troubled = request.body.troubled;
    var sleep_quality = request.body.sleep_quality;

    //計算摘要表睡眠潛伏期
    function getFallAsleep() {
        if (fall_asleep < 30) {
            var fall_asleep_score = 0;
        } else if (30 <= fall_asleep && fall_asleep < 60) {
            var fall_asleep_score = 1;
        } else if (60 <= fall_asleep) {
            var fall_asleep_score = 2;
        }
        return fall_asleep_score;
    }
    var get_fall_asleep_score = getFallAsleep();
    var get_latency = get_fall_asleep_score + sleep_in_30mins;
    function get_latency_identify() {
        if (get_latency == 0) {
            var get_latency_score = 0;
        } else if (1 <= get_latency && get_latency <= 2) {
            var get_latency_score = 1;
        } else if (3 <= get_latency && get_latency <= 4) {
            var get_latency_score = 2;
        } else if (5 <= get_latency && get_latency <= 6) {
            var get_latency_score = 3;
        }
        return get_latency_score;
    }
    var PSQI_25a = get_latency_identify();

    //計算摘要表睡眠時速
    function get_sleep_time() {
        var full_sleep_time = sleep_hour * 60 + sleep_minute;
        var full_sleep_hour = full_sleep_time / 60;
        var get_full_sleep_hour = parseFloat(full_sleep_hour).toFixed(2);
        return get_full_sleep_hour;
    }
    var get_sleep_hour1 = get_sleep_time();

    function get_sleep_hour_identify() {
        if (get_sleep_hour1 > 7) {
            var get_sleep_hour = 0;
        } else if (6 <= get_sleep_hour1 && get_sleep_hour1 <= 7) {
            var get_sleep_hour = 1;
        } else if (5 <= get_sleep_hour1 && get_sleep_hour1 < 6) {
            var get_sleep_hour = 2;
        } else if (get_sleep_hour1 < 5) {
            var get_sleep_hour = 3;
        }
        return get_sleep_hour;
    }
    var PSQI_4 = get_sleep_hour_identify();

    //總分計算
    function getFallAsleep() {
        if (fall_asleep < 30) {
            var fall_asleep_score = 0;
        } else if (30 <= fall_asleep && fall_asleep < 60) {
            var fall_asleep_score = 1;
        } else if (60 <= fall_asleep) {
            var fall_asleep_score = 2;
        }
        return fall_asleep_score;
    }
    var get_fall_asleep_score = getFallAsleep();
    function getSleepHour() {
        if (7 <= sleep_hour) {
            var sleep_hour_score = 0;
        } else if (6 <= sleep_hour && sleep_hour < 7) {
            var sleep_hour_score = 1;
        } else if (4 <= sleep_hour && sleep_hour <= 5) {
            var sleep_hour_score = 2;
        } else {
            var sleep_hour_score = 3;
        }
        return sleep_hour_score;
    }
    var get_sleep_hour_score = getSleepHour();
    function getSleepProblem() {
        var getScore = sleep_in_30mins + wakeup_in_midnight + go_bathroom + breathless + snoring + feel_cold + feel_hot + nightmare + pain + other_level + sleeping_pills + cant_stay_awake + troubled + sleep_quality;
        return getScore;
    }
    var get_sleep_problem_score = getSleepProblem();
    var total = get_fall_asleep_score + get_sleep_hour_score + get_sleep_problem_score;
    console.log(total);

    //睡眠效率（題4/躺床時數)
    var sleepTime = sleep_time_hour*60+sleep_time_minute;
    var lyingTime = sleep_hour*60 +  sleep_minute;
    sleepTime = parseFloat(sleepTime);
    lyingTime = parseFloat(lyingTime);
    function efficiency() {
        var sleep_efficiency;
        var efficiency_persent =  (Math.round(sleepTime / lyingTime * 10000) / 100.00 + "%");// 小数点后两位百分比
        console.log(efficiency_persent);
        if (85<= efficiency_persent){
            sleep_efficiency = 0;
        } else if(75<=efficiency_persent&& efficiency_persent<85) {
            sleep_efficiency = 1;
        } else if(65<=efficiency_persent && efficiency_persent<75) {
            sleep_efficiency = 2;
        } else {
            sleep_efficiency = 3;
        }
        return sleep_efficiency;
    }
    var sleep_efficiency = efficiency();

    //睡眠困擾(PSQI_bj)
    

    function disturbance() {
        var bj = wakeup_in_midnight +go_bathroom+breathless+snoring+feel_cold+feel_cold+nightmare+pain+other_level;
        var disturbance;
        if (bj ==0) {
            disturbance =0;
        } else if (1 <= bj && bj < 10) {
            disturbance = 1;
        } else if (10 <= bj && bj<19) {
            disturbance = 2;
        } else if  (19 <= bj && bj <=27) {
        disturbance =3;
        }
        return disturbance;
    }
    var PSQI_bj = disturbance();

    //白天功能運作
    function activity () {
        var PSQI78 = cant_stay_awake+troubled;
        var activity;
        if (PSQI78 ==0) {
            activity =0;
        } else if (1 <= PSQI78  && PSQI78<= 2) {
            activity = 1;
        } else if (3 <= PSQI78 && PSQI78<=4) {
            activity = 2;
        } else if  (5 <= PSQI78 && PSQI78 <=6) {
            activity =3;
        }
        return activity;
    }
    var PSQI_78 = activity();

    function total() {
        var total = PSQI_78+PSQI_bj+sleep_efficiency+sleep_quality+sleeping_pills+PSQI_25a + PSQI_4;
        return total;
    }
    var PSQI_total = total();     
    

    var db = `INSERT INTO sleep_quality_scale (medical_record_number ,sleep_time_hour, sleep_time_minute,fall_asleep,
        wakeup_hour, wakeup_minute , sleep_hour ,sleep_minute, sleep_in_30mins , wakeup_in_midnight, go_bathroom ,
        breathless ,snoring ,feel_cold ,feel_hot ,nightmare , pain ,other ,other_level ,
        sleeping_pills ,cant_stay_awake ,troubled , sleep_quality ,total,sleep_efficiency,PSQI_bj,PSQI_78,PSQI_25a ,PSQI_4,PSQI_total)VALUES
        (${medical_record_number},${sleep_time_hour},${sleep_time_minute},${fall_asleep},${wakeup_hour},${wakeup_minute},${sleep_hour},${sleep_minute},
        ${sleep_in_30mins},${wakeup_in_midnight},${go_bathroom},${breathless},${snoring},${feel_cold},${feel_hot},${nightmare},${pain},
        '${other}',${other_level},${sleeping_pills},${cant_stay_awake},${troubled},${sleep_quality},${total},
        ${sleep_efficiency},${PSQI_bj},${PSQI_78},${PSQI_25a},${PSQI_4},${PSQI_total});`;
    myDB.query(db, function (error, results) {
        if (error) {
            console.log(error);
            return response.status(404).json({ "createSleep": false });
        }
        let data = JSON.parse(JSON.stringify(results));
        return response.status(200).json({ "createSleep": true });
    })
})
//select睡眠
app.get('/select/sleep', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT sleep_time_hour,sleep_time_minute ,  fall_asleep, wakeup_hour ,wakeup_minute ,sleep_hour , sleep_minute ,  sleep_in_30mins , 
    wakeup_in_midnight ,go_bathroom ,  breathless , snoring ,feel_cold ,feel_hot , nightmare ,pain ,other ,other_level , sleeping_pills , 
    cant_stay_awake,troubled ,sleep_quality ,total FROM sleep_quality_scale WHERE medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "selectSleep": false });
        }
        let data7 = JSON.parse(JSON.stringify(results));
        data7[0]["selectSleep"] = true;
        return response.status(200).json(data7);
    })
});

//新增phq
app.post('/create/PHQ9', authPsychology(['B']),function (request, response) {
    var medical_record_number = request.body.medical_record_number ? request.body.medical_record_number : null;
    var noninteresting = request.body.noninteresting ? request.body.noninteresting : null;
    var frustrated = request.body.frustrated ? request.body.frustrated : null;
    var sleep_problem = request.body.sleep_problem ? request.body.sleep_problem : null;
    var tired = request.body.tired ? request.body.tired : null;
    var appetite_problem = request.body.appetite_problem ? request.body.appetite_problem : null;
    var terrible = request.body.terrible ? request.body.terrible : null;
    var focus_problem = request.body.focus_problem ? request.body.focus_problem : null;
    var activity_problem = request.body.activity_problem ? request.body.activity_problem : null;
    var bad_idea = request.body.bad_idea ? request.body.bad_idea : null;
    var total = noninteresting+frustrated+sleep_problem+tired+appetite_problem+terrible+focus_problem+activity_problem+bad_idea;

    var db = `INSERT INTO phq9 (medical_record_number ,noninteresting ,frustrated ,sleep_problem ,tired ,
        appetite_problem,terrible,focus_problem,activity_problem,bad_idea,total)VALUES
        (${medical_record_number},${noninteresting},${frustrated},${sleep_problem},${tired},${appetite_problem},
            ${terrible},${focus_problem},${activity_problem},${bad_idea},${total});`;
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "createPHQ9": false });
        }
        let data = JSON.parse(JSON.stringify(results));
        return response.status(200).json({ "createPHQ9": true });
    })
})
//select phq
app.get('/select/PHQ9', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT  medical_record_number, noninteresting ,  frustrated, sleep_problem ,tired ,
    appetite_problem ,terrible , focus_problem ,activity_problem , bad_idea FROM phq9 WHERE medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "selectPhq9": false });
        }
        let data8 = JSON.parse(JSON.stringify(results));
        data8[0]["selectPhq9"] = true;
        return response.status(200).json(data8);
    })
})

//新增 trauma
app.post('/create/trauma',authPsychology(['B']), function (request, response) {
    var medical_record_number = request.body.medical_record_number ? request.body.medical_record_number : null;
    var bad_memory = request.body.bad_memory ? request.body.bad_memory : null;
    var nightmare = request.body.nightmare ? request.body.nightmare : null;
    var repeat_happen = request.body.repeat_happen ? request.body.repeat_happen : null;
    var feel_unconfortable = request.body.feel_unconfortable ? request.body.feel_unconfortable : null;
    var remind_body_respond = request.body.remind_body_respond ? request.body.remind_body_respond : null;
    var cant_sleep = request.body.cant_sleep ? request.body.cant_sleep : null;
    var angry = request.body.angry ? request.body.angry : null;
    var cant_focus = request.body.cant_focus ? request.body.cant_focus : null;
    var raise_alertness = request.body.raise_alertness ? request.body.raise_alertness : null;
    var scared = request.body.scared ? request.body.scared : null;

    var total = bad_memory+nightmare+repeat_happen+feel_unconfortable+remind_body_respond+cant_focus+cant_sleep+angry+raise_alertness+scared;

    var db = `INSERT INTO trauma (medical_record_number ,bad_memory ,nightmare ,repeat_happen ,feel_unconfortable ,
        remind_body_respond,cant_sleep,angry ,cant_focus ,raise_alertness ,scared ,total)VALUES
        (${medical_record_number}, ${bad_memory}, ${nightmare}, ${repeat_happen}, ${feel_unconfortable}, ${remind_body_respond}, ${cant_sleep}, ${angry}, ${cant_focus}, ${raise_alertness}, ${scared},${total});`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "createTrauma": false });
        }
        let data = JSON.parse(JSON.stringify(results));
        return response.status(200).json({ "createTrauma": true });
    })
});
//select trauma
app.get('/select/trauma', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db = `SELECT bad_memory, nightmare , repeat_happen , feel_unconfortable ,  remind_body_respond , 
    cant_sleep , angry , cant_focus , raise_alertness , scared FROM trauma WHERE medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "selectTrauma": false });
        }
        let data9 = JSON.parse(JSON.stringify(results));
        data9[0]["selectTrauma"] = true;
        return response.status(200).json(data9);
    })
})

//select 摘要(摘要表分數)
app.get('/inquiryScore', function (request, response) {
    var medical_record_number = request.body.medical_record_number;

    var db =  `select medical_record_number,
    (select TSQ from trauma where medical_record_number = ${medical_record_number}) as TSQ ,
    (select GAD_7 from anxiety_assessment where medical_record_number = ${medical_record_number})AS GAD_7,
    (select PHQ_9 from phq9 where medical_record_number = ${medical_record_number}) AS PHQ_9,
    (select PSQI_total from sleep_quality_scale where medical_record_number = ${medical_record_number})AS PSQI_total,
    (select sleep_quality from sleep_quality_scale where medical_record_number = ${medical_record_number}) AS PSQI_9,
    (select PSQI_25a from sleep_quality_scale where medical_record_number = ${medical_record_number}) AS PSQI_25a,
    (select PSQI_4 from sleep_quality_scale where medical_record_number = ${medical_record_number}) AS PSQI_4, 
    (select sleep_efficiency from sleep_quality_scale where medical_record_number = ${medical_record_number}) AS sleep_efficiency,
    (select sleeping_pills from sleep_quality_scale where medical_record_number = ${medical_record_number}) AS PSQI_6,
    (select PSQI_bj from sleep_quality_scale where medical_record_number = ${medical_record_number}) AS PSQI_bj,
    (select PSQI_78  from sleep_quality_scale where medical_record_number = ${medical_record_number}) AS PSQI_78
    from inquiry_form where medical_record_number = ${medical_record_number};`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "inquiryScore": false });
        }
        let data10 = JSON.parse(JSON.stringify(results));
        data10[0]["inquiryScore"] = true;
        return response.status(200).json(data10);
    })
})


//新增摘要
app.post('/create/inquiry', authPsychology(['B']), function (request, response) {
    var medical_record_number = request.body.medical_record_number ? request.body.medical_record_number : null;
    var TSQ = request.body.TSQ ? request.body.TSQ : null;
    var GAD_7 = request.body.GAD_7 ? request.body.GAD_7 : null;
    var PHQ_9 = request.body.PHQ_9 ? request.body.PHQ_9 : null;
    var suicide = request.body.suicide ? request.body.suicide : null;
    var PS = request.body.PS ? request.body.PS : null;
    var PSQI_total = request.body.PSQI_total ? request.body.PSQI_total : null;
    var PSQI_9 = request.body.PSQI_9 ? request.body.PSQI_9 : null;
    var PSQI_25a = request.body.PSQI_25a ? request.body.PSQI_25a : null;
    var PSQI_4 = request.body.PSQI_4 ? request.body.PSQI_4 : null;
    var sleep_efficiency = request.body.sleep_efficiency ? request.body.sleep_efficiency : null;
    var PSQI_bj = request.body.PSQI_bj ? request.body.PSQI_bj : null;
    var PSQI_6 = request.body.PSQI_6 ? request.body.PSQI_6 : null;
    var PSQI_78 = request.body.PSQI_78 ? request.body.PSQI_78 : null;
    var date = request.body.date;
    var evaluators = request.body.evaluators;

    var db = `INSERT INTO inquiry_form(medical_record_number,TSQ,GAD_7,PHQ_9,suicide,PS,PSQI_total,PSQI_9,
    PSQI_25a,PSQI_4,PSQI_4+,PSQI_bj,PSQI_6,PSQI_78,date,evaluators) 
    VALUES(${medical_record_number},${TSQ},${GAD_7},${PHQ_9},${suicide},${PS},${PSQI_total},${PSQI_9},${PSQI_25a},${PSQI_4},${sleep_efficiency},${PSQI_bj},${PSQI_6},${PSQI_78},'${date}','${evaluators}');`
    myDB.query(db, function (error, results) {
        if (error) {
            return response.status(404).json({ "createInquiry": false });
        } else {

            return response.status(200).json({ "createInquiry": true });
        }
    })
});


//Server listner
let PORT = process.env.PORT || 899;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 