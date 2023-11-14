<template>
  <div class="modal-card plans" style="width: auto">
    <header class="modal-card-head">
      <div class="selectors">
        <div class="signup active">
          <p>Planes</p>
        </div>
      </div>
    </header>
    <section class="modal-card-body">
      <div class="columns">
        <div class="column">
          <div class="card">
            <h1>Básico</h1>
            <h2>US$0.00</h2>
            <div class="benefits">
              <ul>
                <li class="benefit">
                  <b-icon icon="check" /> Texto de Beneficio
                </li>
                <li class="benefit">
                  <b-icon icon="check" />Texto de Beneficio
                </li>
                <li class="benefit">
                  <b-icon icon="check" />Texto de Beneficio
                </li>
                <li class="benefit">
                  <b-icon icon="check" />Texto de Beneficio
                </li>
              </ul>
            </div>
            <button class="basic-plan" v-if="userType != 0" @click="redirect">
              <span>Empezar</span>
            </button>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <h1><b-icon icon="crown" />Premium</h1>
            <h2>US$0.00</h2>

            <div class="benefits">
              <ul>
                <li class="benefit">
                  <b-icon icon="check" />Texto de Beneficio
                </li>
                <li class="benefit">
                  <b-icon icon="check" />Texto de Beneficio
                </li>
                <li class="benefit">
                  <b-icon icon="check" />Texto de Beneficio
                </li>
                <li class="benefit">
                  <b-icon icon="check" />Texto de Beneficio
                </li>
              </ul>
            </div>
            <button class="pro-plan" v-if="userType != 1" @click="redirect">
              <span>Hazte Premium</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      userType: this.$store.state.type
    };
  },

  methods: {
    redirect() {
      if (this.$store.state.type == null) {
        this.$emit("change-to-login")
      }
      else
      {
          this.$router.push({name: "plans"})
          this.$emit("hide-modal")
      }
    },

  
  },

  props: {
    isLoginModalActive: Boolean,
  },
});
</script>