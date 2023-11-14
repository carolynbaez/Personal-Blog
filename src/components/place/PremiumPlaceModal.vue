<template>
  <section>
    <div class="modal-card modal-premium-place">
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="place-galery">
              <div class="main-image">
                <img :src="apiUrl + mainPicture" alt="" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="place-information">
              <h1 class="place-name">
                {{ place.name }}
              </h1>
              <div class="complementary-info">
                <div class="start-rating">
                  <span
                    class="fa fa-star"
                    :class="{ checked: place.assessment >= 1 }"
                  ></span>
                  <span
                    class="fa fa-star"
                    :class="{ checked: place.assessment >= 2 }"
                  ></span>
                  <span
                    class="fa fa-star"
                    :class="{ checked: place.assessment >= 3 }"
                  ></span>
                  <span
                    class="fa fa-star"
                    :class="{ checked: place.assessment >= 4 }"
                  ></span>
                  <span
                    class="fa fa-star"
                    :class="{ checked: place.assessment >= 5 }"
                  ></span>
                </div>
                  <div class="premium-message">
                <v-alert outlined type="warning" prominent border="left">
                 Este lugar está disponible solo en la versión premium. Suscríbete para poder ver toda la información.
                </v-alert>
              </div>
              </div>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import settings from "@/core/utils/app-settings";
export default Vue.extend({
  data() {
    return {
      apiUrl: `${settings.API_URL}/`,
      mainPicture: this.place.images[0].url,
    };
  },
  props: ["place"],
});
</script>