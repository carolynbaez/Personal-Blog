<template>
  <section>
    <div v-if="showSubscribeModal">
      <SubscriptionModal @showSubscribeDialog="showSubscriptionModal" />
    </div>
    <div class="header-nav">
      <b-navbar>
        <template #brand> </template>
        <template #start>
          <b-navbar-item href="/"> Inicio </b-navbar-item>
          <b-navbar-item href="#mision" @click="navigate('#mision')">
            Misión
          </b-navbar-item>
          <b-navbar-item href="#vision" @click="navigate('#vision')">
            Visión
          </b-navbar-item>
          <b-navbar-item href="/forum"> Comentarios </b-navbar-item>
          <b-navbar-item href="/contact"> Contacto </b-navbar-item>
          <!-- <b-navbar-item
          href="#"
          class="subscribe-item"
          @click="showSubscriptionModal"
        >
          Inscribirse
        </b-navbar-item> -->
        </template>
        <!-- <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link to="#" disabled>
              <v-btn
                class="ma-2 elevation-6"
                outlined
                color="white"
                @click="showSubscriptionModal"
                id="subButton"
                >Inscríbete</v-btn
              >
            </router-link>
          </div>
        </b-navbar-item>
      </template> -->
      </b-navbar>
      <div>
        <template>
          <b-navbar-item tag="div">
            <div class="buttons">
              <router-link to="#" disabled>
                <v-btn
                  class="ma-2 elevation-6"
                  outlined
                  color="white"
                  @click="showSubscriptionModal"
                  id="subButton"
                  >Inscríbete</v-btn
                >
              </router-link>
            </div>
          </b-navbar-item>
        </template>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      showSubscribeModal: false,
    };
  },
  methods: {
    showSubscriptionModal() {
      this.showSubscribeModal = !this.showSubscribeModal;
    },

    navigate(section: string) {
      if (this.$route.name != "home") {
        this.$router.push({name: 'home', hash:section})
      }
    },
  },
});
</script>
<style>
.header-nav {
  font-family: "Open Sans", sans-serif !important;
  background-color: #159740;
  display: flex;
  justify-content: space-between;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 30px;
  font-size: 13px;
  min-width: 139px;
}

.header {
  font-family: "Open Sans", sans-serif !important;
  background-color: #139e4c;
}

.v-btn:not(.v-btn--round).v-size--default {
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
}

.subscribe-item {
  display: none;
}

@media screen and (max-width: 1023px) {
  .subscribe-item {
    display: flex;
  }

  .navbar-burger {
    margin-left: 0;
  }
}

.actions a button {
  width: 126.2px;
}

@media screen and (max-width: 622px) {
  .footer-card.container {
    flex-direction: column;
    row-gap: 10px;
  }

  .footer-card.container .actions {
    flex-direction: column;
    display: flex;
    row-gap: 11px;
  }
}
</style>
