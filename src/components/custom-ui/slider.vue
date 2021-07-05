<template>
  <div class="splide" :cls="cls">
    <div class="splide__track">
      <div class="splide__arrows">
        <div class="splide__arrows splide__arrows-prev">
          <svg width="17" height="36" viewBox="0 0 17 36" fill="none" xmlns="http://www.w3.org/2000/svg"
               data-tid="75eaaec3" style="transform: rotate(180deg);">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.5001 17.9998L16.6001 3.1998L13.4001 0.799805L0.500097 17.9998L13.4001 35.1998L16.6001 32.7998L5.5001 17.9998Z"
                  fill="white"></path>
          </svg>
        </div>
      </div>
      <div class="splide__arrows  splide__arrows-next">
        <svg width="17" height="36" viewBox="0 0 17 36" fill="none" xmlns="http://www.w3.org/2000/svg"
             data-tid="75eaaec3">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M5.5001 17.9998L16.6001 3.1998L13.4001 0.799805L0.500097 17.9998L13.4001 35.1998L16.6001 32.7998L5.5001 17.9998Z"
                fill="white"></path>
        </svg>
      </div>
      <div class="splide__track">
        <ul class="splide__list">
          <card v-for="movie in movies" :key="movie.id" :movie="movie" class="splide__slide"></card>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import movie from '../movie'
export default {
  name: "slider",
  props: {
    cls: String,
    movies: Array
  },
  components: {
    movie
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
