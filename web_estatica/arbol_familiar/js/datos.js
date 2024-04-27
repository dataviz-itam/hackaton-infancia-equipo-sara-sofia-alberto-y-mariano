function Adopciones(year, gender) {
    this.year = year;
    this.gender = gender;
}

// URL del archivo JSON
const data = 
  [
    {"year": 2015, "gender": 1},
    {"year": 2015, "gender": 1},
    {"year": 2015, "gender": 0},
    {"year": 2015, "gender": 0},
    {"year": 2015, "gender": 0},
    {"year": 2015, "gender": 0},
    {"year": 2015, "gender": 0},
    {"year": 2015, "gender": 0},
    {"year": 2016, "gender": 1},
    {"year": 2016, "gender": 0},
    {"year": 2016, "gender": 0},
    {"year": 2016, "gender": 0},
    {"year": 2016, "gender": 0},
    {"year": 2016, "gender": 0},
    {"year": 2016, "gender": 0},
    {"year": 2016, "gender": 0},
    {"year": 2017, "gender": 1},
    {"year": 2017, "gender": 0},
    {"year": 2017, "gender": 0},
    {"year": 2017, "gender": 0},
    {"year": 2017, "gender": 0},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 1},
    {"year": 2018, "gender": 0},
    {"year": 2018, "gender": 0},
    {"year": 2018, "gender": 0},
    {"year": 2018, "gender": 0},
    {"year": 2018, "gender": 0},
    {"year": 2018, "gender": 0},
    {"year": 2018, "gender": 0},
    {"year": 2019, "gender": 1},
    {"year": 2019, "gender": 1},
    {"year": 2019, "gender": 1},
    {"year": 2019, "gender": 0},
    {"year": 2019, "gender": 0},
    {"year": 2019, "gender": 0},
    {"year": 2019, "gender": 0},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 1},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2020, "gender": 0},
    {"year": 2021, "gender": 1},
    {"year": 2021, "gender": 1},
    {"year": 2021, "gender": 1},
    {"year": 2021, "gender": 1},
    {"year": 2021, "gender": 1},
    {"year": 2021, "gender": 0},
    {"year": 2021, "gender": 0},
    {"year": 2021, "gender": 0},
    {"year": 2021, "gender": 0},
    {"year": 2021, "gender": 0},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 1},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2022, "gender": 0},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 1},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0},
    {"year": 2023, "gender": 0}
  ];

const all_adopciones = data.map(item => new Adopciones(item.year, item.gender));