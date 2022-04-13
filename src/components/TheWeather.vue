<template>
  <section>
    <main>
      <div class="search__box">
        <input
          type="text"
          class="search-bar"
          placeholder="Please enter your city name ..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>
      <div class="weather__wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location__box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ dateBulder() }}</div>
          <div class="wheather__img">
            <img id="wicon" :src="icon" alt="Weather icon" />
          </div>
        </div>
        <div class="weather__box">
          <div class="temp">
            {{ Math.round(weather.main.temp) }}
            <sup>℃</sup>
          </div>
          <div class="weather">
            {{ weather.weather[0].description }}
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      api_key: 'f5225655ef6f8f7d1339fa12cef80d1e',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      iconcode: '',
    }
  },
  computed: {
    icon() {
      return `http://openweathermap.org/img/wn/${this.iconcode}.png`
    },
  },
  methods: {
    async fetchWeather(e) {
      if (e.key == 'Enter') {
        await fetch(
          `${this.url_base}weather?q=${this.query}&appid=${this.api_key}&units=metric`,
        )
          .then((res) => {
            return res.json()
          })
          .then(this.setResults)
      }
    },
    setResults(results) {
      this.weather = results
      this.iconcode = results.weather[0].icon
    },
    dateBulder() {
      let d = new Date()
      let months = [
        'January',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dec',
      ]
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      let day = days[d.getDay()]
      let date = d.getDate()
      let month = months[d.getMonth()]
      let year = d.getFullYear()
      return `${day} ${date} ${month} ${year}`
    },
  },
}
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wheather__img {
  text-align: center;
  margin-top: 10px;
}
section {
  width: 96%;
  margin: 0 auto;
  background-image: url('../assets/weather.jpg');
  background-repeat: no-repeat;
  height: 95vh;
  border-radius: 5px;
  background-size: cover;
  transition: 0.4s;
  background-position-y: bottom;
}
main {
  min-height: 95vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.7)
  );
  .search__box {
    width: 100%;
    margin-bottom: 30px;
    input {
      display: block;
      width: 100%;
      padding: 15px;
      color: #313131;
      font-size: 20px;
      appearance: none;
      border: none;
      outline: none;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
      background: none;
      border-radius: 0px 16px 0 16px;
      transition: 0.4s;
      background-color: rgba(255, 255, 255, 0.15);
      &:focus {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
        border-radius: 16px 0 16px 0;

        background-color: rgba(255, 255, 255, 0.75);
      }
    }
  }
  .location__box {
    .location {
      color: #fff;
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }
    .date {
      color: #fff;
      font-size: 20px;
      font-weight: 300;
      font-style: italic;
      text-align: center;
    }
  }
  .weather__box {
    text-align: center;
    .temp {
      display: inline-block;
      padding: 10px 25px;
      color: #fff;
      font-size: 102px;
      font-weight: 900;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      margin: 30px 0;
      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }
    .weather {
      color: #fff;
      font-size: 48px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }
  }
}
body {
  font-family: 'montserrat', sans-serif;
}
</style>
