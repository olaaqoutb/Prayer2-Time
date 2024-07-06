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

export default function MainContent() {
  // States //
  const [timings, setTimings] = useState({
    Fajr: "04:38",
    Dhuhr: "12:58",
    Asr: "16:34",
    Maghrib: "20:00",
    Isha: "21:18",
  });
  const [selectedCity, setSelectedCity] = useState({
    displayName: "مصر العربية",
    ApiName: "Cairo",
  });

  const [today, setToday] = useState("");

  const avilableCities = [
    {
      displayName: "مصر العربية",
      ApiName: "Cairo",
    },
    {
      displayName: "مكة المكرمة",
      ApiName: "Makkah",
    },
    {
      displayName: "الدمام",
      ApiName: "Dammam",
    },
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
    setToday(t.format("dddd, MMMM Do YYYY, h:mm:ss a"));
  }, [selectedCity]);

  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
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
            <h2>متبقي حتي صلاة العصر</h2>
            <h1>00:10:20</h1>
          </div>
        </Grid>
      </Grid>
      <Divider />

      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="../../public/fajr-prayer.png"
        />
        <Prayer
          name="الضهر"
          time={timings.Dhuhr}
          image="../../public/dhhr-prayer-mosque.png"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="../../public/asr-prayer-mosque.png"
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="../../public/sunset-prayer-mosque.png"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="../../public/night-prayer-mosque.png"
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
            {avilableCities.map((city) => (
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
