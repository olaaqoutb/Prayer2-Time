import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios"; // it is about api//
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import fajr from "../image/fajr-prayer.png"
import Duhr from "../image/dhhr-prayer-mosque.png"
import Asr from "../image/asr-prayer-mosque.png"
import Magreb from "../image/sunset-prayer-mosque.png"
import Esha from "../image/night-prayer-mosque.png"

moment.locale("ar");

export default function MainContent() {
  // States //
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [timings, setTimings] = useState({
    Fajr: "04:38",
    Dhuhr: "12:58",
    Asr: "16:34",
    Maghrib: "20:00",
    Isha: "21:18",
  });
  const [selectedCity, setSelectedCity] = useState({
    displayName: "مصر العربية",
    ApiName: "Egypt",
  });

  const [today, setToday] = useState("");
  const [timer, setTimer] = useState(10);

  const availableCities = [
    {
      displayName: "مصر العربية",
      ApiName: "Egypt",
    },
    {
      displayName: "مكة المكرمة",
      ApiName: "Makkah al Mukarramah",
    },
    {
      displayName: "الدمام",
      ApiName: "Dammam",
    },
  ];

  const prayerArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const getTimings = async (city) => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${selectedCity.ApiName}&method=2`
    );
    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    getTimings(selectedCity.ApiName);
    const t = moment();
    setToday(t.format("dddd , MMMM Do , YYYY | h:mm:ss a"));
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountDownTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountDownTimer = () => {
    const momentNow = moment();
    let PrayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "HH:mm"))
    ) {
      PrayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "HH:mm"))
    ) {
      PrayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "HH:mm"))
    ) {
      PrayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "HH:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "HH:mm"))
    ) {
      PrayerIndex = 4;
    } else {
      PrayerIndex = 0;
    }
    setNextPrayerIndex(PrayerIndex);

    const nextPrayerTime = moment(timings[prayerArray[PrayerIndex].key], "HH:mm");
    const duration = moment.duration(nextPrayerTime.diff(momentNow));
    setTimer(`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`);
  };

  const handleCityChange = (event) => {
    const cityObject = availableCities.find((city) => {
      return city.ApiName === event.target.value;
    });
    setSelectedCity(cityObject);
  };

  return (
    <>
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
    
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة {prayerArray[nextPrayerIndex].displayName}</h2>
            <h1>{timer}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider />

      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "40px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image={fajr}
        />
        {console.log()}
        <Prayer
          name="الضهر"
          time={timings.Dhuhr}
          image={Duhr}
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image={Asr}
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image={Magreb}
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image={Esha}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity.ApiName}
            label="المدينة"
            onChange={handleCityChange}
          >
            {availableCities.map((city) => (
              <MenuItem key={city.ApiName} value={city.ApiName}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
