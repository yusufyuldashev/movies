<template>
  <section>
    <div class="container">
      <h1 class="main__title">Movies</h1>
      <ul class="movies__genres">
        <li
          class="movie__genre"
          v-for="genre in genres"
          :key="genre.id"
          @click="genreClick(genre.id)"
        >
          {{ genre.name }}
        </li>
      </ul>
      <ul class="main__list">
        <li class="main__item" v-for="film in datasMovie" :key="film.id">
          <div class="wrapper__img">
            <img :src="image + film.poster_path" />
          </div>
          <p
            class="wrapper__rate"
            :class="{
              vote2: film.vote_average * 10 > 75,
              vote: film.vote_average * 10 < 60,
            }"
          >
            {{ film.vote_average * 10 }}
          </p>
          <p class="main__title2">{{ film.release_date }}</p>
          <p class="main__text">{{ film.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['datas'],
  data() {
    return {
      datasMovie: [],
      genres: [
        {
          id: 28,
          name: 'Action',
        },
        {
          id: 12,
          name: 'Adventure',
        },
        {
          id: 16,
          name: 'Animation',
        },
        {
          id: 35,
          name: 'Comedy',
        },
        {
          id: 80,
          name: 'Crime',
        },
        {
          id: 99,
          name: 'Documentary',
        },
        {
          id: 18,
          name: 'Drama',
        },
        {
          id: 10751,
          name: 'Family',
        },
        {
          id: 14,
          name: 'Fantasy',
        },
        {
          id: 36,
          name: 'History',
        },
        {
          id: 27,
          name: 'Horror',
        },
        {
          id: 10402,
          name: 'Music',
        },
        {
          id: 9648,
          name: 'Mystery',
        },
        {
          id: 10749,
          name: 'Romance',
        },
        {
          id: 878,
          name: 'Science Fiction',
        },
        {
          id: 10770,
          name: 'TV Movie',
        },
        {
          id: 53,
          name: 'Thriller',
        },
        {
          id: 10752,
          name: 'War',
        },
        {
          id: 37,
          name: 'Western',
        },
      ],
      selectedGenres: null,
    }
  },
  computed: {
    image() {
      return 'https://image.tmdb.org/t/p/w500'
    },
  },
  mounted() {
    this.fetchHomePage5()
    console.log(this.datas)
  },

  methods: {
    genreClick(genre) {
      // if (this.selectedGenres == 0) {
      //   this.selectedGenres.push(genre)
      // } else {
      //   if (this.selectedGenres.includes(genre)) {
      //     this.selectedGenres.forEach((id, idx) => {
      //       if (id == genre.id) {
      //         this.selectedGenres.splice(idx, 1)
      //       }
      //     })
      //   } else {
      //     this.selectedGenres.push(genre)
      //   }
      // }
      this.selectedGenres = genre
      this.fetchHomePage5()
    },
    async fetchHomePage5() {
      try {
        const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
        const base_url = 'https://api.themoviedb.org/3'
        const api_url =
          base_url + `/discover/movie?sort_by=popularity.desc&${api_key}`
        const api = api_url + '&with_genres=' + this.selectedGenres
        const response = await axios.get(api).then((res) => {
          const data = res.data.results
          this.datasMovie = data
          // console.log(api)
          return res.data.results
        })

        return response
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.movies__genres {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-top: 20px;
  justify-content: center;
  li {
    color: white;
    padding: 10px;
    font-family: 'Roboto';
    font-weight: normal;
    background: black;
    margin: 5px 5px;
    border-radius: 10px;
  }
}
.vote {
  background: red !important;
}
.vote2 {
  background: green !important;
}
.container {
  width: 1050px;
  margin: 0 auto;
  .main__title {
    color: white;
    font-weight: normal;
    text-align: center;
    font-size: 30px;
    margin-top: 30px;
  }
  .main__list {
    display: flex;
    list-style: none;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0;
    margin-top: 50px;
    //   justify-content: space-between;
    .wrapper__rate {
      position: absolute;
      color: white;
      background: black;
      margin-left: 165px;
      top: -18px;
      padding: 10px;
      border-radius: 20px;
    }
    .main__item {
      padding: 0;
      width: 20%;
      margin: 10px 0;
      height: auto !important;
      position: relative;

      cursor: pointer;
      .wrapper__img {
        width: 90%;
        height: 250px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          // aspect-ratio: 5/5 !important;
          object-fit: cover;
        }
      }
      .main__title2 {
        color: white;
        font-weight: normal;
        font-weight: bold;
        color: green;
        display: inline-block;
        font-family: 'Roboto';
        margin-left: 50px;
        margin-bottom: 0;
      }
      .main__text {
        width: 150px;
        text-align: center;
        margin-left: 20px;
        margin-top: 0;
        font-size: 15px;
        font-family: 'Roboto';
        font-weight: normal;
        color: white;
      }
    }
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
