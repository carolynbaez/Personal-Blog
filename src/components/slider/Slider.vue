<template>
    <section>
         <div class="home-first-container">
      <div class="slider">
        <b-carousel
          :pause-hover="true"
          :arrow="false"
          :animated="'fade'"
          :interval="5000"
        >
          <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <section>
              <div class="hero-body">
                <h1 class="title-slide">
                  {{ carousel.title }}
                </h1>
                <p class="content-slide">
                  {{ carousel.content }}
                </p>
                <router-link
                  to="places"
                  class="button-slide"
                  >Descubrir</router-link
                >
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
      </div>
    </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(){
    return{
       carousels: [
        {
          title: "Playas",
          content:
            "Encuentra y descubre una gran diversidad de playas que se adaptan a ti.",
          path: "",
        },
        {
          title: "Restaurantes",
          content:
            "Encuentra restaurantes para todas las ocasiones y todos los precios.",
          path: "",
        },
        {
          title: "Hoteles",
          content:
            "Encuentra hoteles de todas las categorías, estrellas y gustos.",
          path: "",
        },
      ],
    }
  }
})
</script>