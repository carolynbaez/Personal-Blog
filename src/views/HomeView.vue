<template>
  <section>
    <figure class="banner">
      <img src="../assets/images/banner2.webp" height="680px" width="100%" />
    </figure>

    <div class="about-us container">
      <h1 class="title about-us-title">Sobre nosotros</h1>
      <p>
        Nuestro propósito es garantizar la seguridad y el bienestar de nuestros
        residentes, construyendo una ciudad inclusiva y acogedora. Nos
        esforzamos por ser líderes en sostenibilidad ambiental y preservar
        nuestro entorno natural para las generaciones venideras. En todo
        momento, nuestro propósito es trabajar en colaboración con la comunidad
        para lograr una ciudad próspera y en constante crecimiento.
      </p>
    </div>

    <div class="general-info">
      <figure class="video">
        <video
          src="../assets/images/videoedmundo.mp4"
          height="680px"
          width="100%"
          controls
        />
      </figure>
      <v-lazy v-model="isActive" transition="fade-transition">
        <v-row id="mision">
          <v-col>
            <div class="title">Misión</div>
            <div class="content">
              Liderar con integridad y compromiso, trabajando en estrecha
              colaboración con los ciudadanos para construir una comunidad
              próspera y unida. Nos esforzamos por mejorar la calidad de vida de
              nuestros residentes, promoviendo el desarrollo económico, la
              educación de calidad, la seguridad ciudadana y la protección del
              medio ambiente. Nuestro objetivo es crear un entorno donde todas
              las personas se sientan valoradas, respetadas y tengan igualdad de
              oportunidades para crecer y prosperar. Juntos, podemos hacer de
              nuestra ciudad un lugar vibrante y deseable para vivir.
            </div>
          </v-col>
          <v-col>
            <div class="image">
              <figure>
                <img src="../assets/images/mision.jpg" alt="" />
              </figure>
            </div>
          </v-col>
        </v-row>
      </v-lazy>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-row id="vision">
          <v-col>
            <div class="image">
              <figure>
                <img src="../assets/images/vision.jpg" alt="Foto candidato" />
              </figure>
            </div>
          </v-col>
          <v-col>
            <div class="title">Visión</div>
            <div class="content">
              Transformar nuestra ciudad en un referente de desarrollo
              sostenible, equidad y calidad de vida. Queremos ser reconocidos
              como un lugar donde la innovación florezca, creando oportunidades
              económicas para todos los residentes. Nos esforzamos por ser una
              comunidad inclusiva, donde todas las voces sean escuchadas y
              valoradas. Buscamos preservar y proteger nuestro entorno natural,
              construyendo un legado de sostenibilidad para las generaciones
              futuras. Juntos, forjaremos una ciudad vibrante y próspera que
              inspire a todos a alcanzar su máximo potencial.
            </div>
          </v-col>
        </v-row>
      </v-lazy>
    <b-carousel autoplay pause-text="Pausado" :indicator="false">
        <b-carousel-item v-for="(image, i) in carousels" :key="i">
                <div class="hero-body has-text-centered">
                    <img :src="image" />
                </div>
        </b-carousel-item>
    </b-carousel>
    </div>

    <div class="subscribe-banner container">
      <em>
        Tu voz tiene el poder de cambiar el rumbo de tu comunidad. <br />
        Inscríbete y haz que tu opinión cuente en la construcción de un futuro
        mejor.
      </em>

      <router-link to="/">
        <v-btn class="ma-2" outlined color="white" @click="openSubscribeModal"
          >Inscríbete</v-btn
        ></router-link
      >
    </div>
  </section>
</template>
<style scoped>
.banner {
  margin-top: -125px;
}

.carousel-arrow .icon {
    color: gray !important;
}

.image {
  height: 250px;
  width: 91%;
  margin-top: 60px;
}

.v-lazy {
  padding-bottom: 60px;
  font-family: 'Open Sans', sans-serif;
}

.general-info {
  padding: 56px 10%;
  display: flex;
  flex-direction: column;
  row-gap: 70px;
  margin-top: 50px;
  background: #fdfdfd;
}

.subscribe-banner {
  width: 100%;
  min-height: 400px;
  background: radial-gradient(circle at 0 0, #27aa46, #107729);
  align-items: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 33px;
  font-weight: 700;
  line-height: 2;
    font-family: 'Open Sans', sans-serif !important;

  text-align: center;
}

.subscribe-banner button {
  height: 54px;
  min-width: 179px;
  padding: 0 16px;
  font-size: 22px;
  text-transform: capitalize;
  font-weight: 200;
}

.v-application .title {
  font-size: 2.25rem !important;
  font-weight: 400;
  letter-spacing: 0.0125em !important;
  color: #139e4c;
}



.content {
  color: #2c343d;
  line-height: 30px;
  font-size: 18px;
}

.about-us {
  width: 80%;
  margin: 16px auto;
  font-size: 18px;
  font-weight: 700;
  line-height: 2.5;
  text-align: center;
  padding-top: 40px;
  font-family: 'Open Sans', sans-serif !important;
}

.image img {
  display: block;
  height: auto;
  width: 81%;
  margin: auto;
}

figure img {
  width: 100%;
}

@media screen and (min-width: 1216px) {
  .places-container.container:not(.is-max-desktop),
  .container:not(.is-max-desktop) {
    max-width: 100% !important;
  }
}

@media screen and (max-width: 1180px) {
  .row#mision {
    flex-direction: column;
  }

  .row#vision {
    flex-direction: column-reverse;
  }

  .image {
    margin-top: 0px;
    height: auto;
  }
}

.subscribe-banner.container {
  max-width: 100% !important;
  margin: 0;
}

@media screen and (max-width: 640px) {
  .general-info {
    row-gap: 0;
  }
}

@media screen and (max-width: 860px) {
  .banner {
    margin-top: -50px;
  }
}

</style>
<script>
export default {
  data: () => ({
    isActive: true,
    carousels: [
      require("../assets/images/portadaedmundo.jpeg"), require("../assets/images/slide4.jpeg"), require("../assets/images/slide3.jpeg")
    ]
  }),
  methods: {
    openSubscribeModal(){
      let button = document.getElementById("subButton");
      button.click();
    }
  }
};
</script>