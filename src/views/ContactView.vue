<template>
  <section>
    <div class="content-nav container">
      <nav aria-label="breadcrumb" class="container breadcrum">
        <ol class="breadcrumb">
          <li>
            <router-link to="/"
              ><i> <b-icon pack="fas" icon="home"> </b-icon></i
            ></router-link>
          </li>
          <li><router-link to="/contact">Contacto</router-link></li>
        </ol>
      </nav>
    </div>
    <v-divider />
    <v-container class="contact-body">
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title>Formulario de Contacto</v-card-title>
          <v-card-text>
            <v-form fast-fail @submit.prevent>
              <v-text-field
                label="Nombre*"
                outlined
                color="#a7a7a7"
                required
                :rules="nameRules"
                v-model="contact.name"
              ></v-text-field>

              <v-text-field
                label="Asunto"
                outlined
                color="#a7a7a7"
                v-model="contact.subject"
              ></v-text-field>

              <v-textarea
                label="Mensaje*"
                type="number"
                placeholder="Sin guiones"
                outlined
                color="#a7a7a7"
                required
                v-model="contact.message"
              ></v-textarea>

              <v-row>
                <div class="buttons">
                  <a
                    :href="mailto"
                    :class="{ 'disabled-link': noAvailableToSend }"
                  >
                    <v-btn
                      class="btn-add-comment btn"
                      color="#00a758"
                      @click="clean"
                      :disabled="noAvailableToSend"
                    >
                      <b-icon
                        pack="fas"
                        size="is-small"
                        icon="floppy-disk"
                        class="icon-pencil"
                      >
                      </b-icon>
                      Enviar
                    </v-btn></a
                  >

                  <v-btn class="btn-cancel btn" color="#505050" @click="clean"
                    ><b-icon
                      pack="fas"
                      size="is-small"
                      icon="trash"
                      class="icon-pencil"
                    >
                    </b-icon>
                    Cancelar
                  </v-btn>
                </div></v-row
              >
            </v-form>
          </v-card-text>
        </v-col>

        <v-col cols="12" md="4" class="contact-info">
          <v-card>
            <v-card-title>Información de Contacto</v-card-title>
            <v-card-text>
              <p><strong>Correo Electrónico:</strong> candidato@example.com</p>
              <p><strong>Teléfono:</strong> +123 456 789</p>
              <p><strong>Dirección:</strong> Dirección de Campaña, Ciudad</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script lang="ts">
import { ContactModel } from "@/core/models/contact.model";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      contact: new ContactModel(),
      nameRules: [
        (value: any) => {
          const regex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/;
          if (regex.test(value)) return true;
          return "Solo se aceptan letras A-Z";
        },
      ],
    };
  },
  methods: {
    clean() {
      this.contact = new ContactModel();
    },
  },
  computed: {
    mailto() {
      let newSubject = `${this.contact.subject.replace(/ /g, "%20")} Por ${
        this.contact.name
      }`;
      let newMessage = this.contact.message.replace(/ /g, "%20");
      return `mailto:${this.contact.email.toString()}?subject=${newSubject}&body=${newMessage}`;
    },
    noAvailableToSend() {
      if (
        (this.contact.message == "" &&
        this.contact.name == "" &&
        this.contact.subject == "") || this.contact.message == "" || this.contact.name == "" || this.contact.subject == ""
      )
      return true;

    },
  },
});
</script>
<style scoped>
/* Breadcrum */
.container.content-nav {
  padding: 5px 12px 5px 7px;
}

ol.breadcrumb {
  display: flex;
  font-size: 17px;
  align-items: flex-start;
}

.breadcrumb li {
  align-items: flex-end;
}

.breadcrumb > li + li:before {
  display: inline-block;
  padding: 0 9px 0 0px;
  font-family: FontAwesome;
  font-size: 1.125rem;
  transform: translateY(1px);
  color: rgb(132, 132, 132);
  content: "";
}

.v-application a,
li {
  padding: 0 0.5em;
  color: #494848;
}

.breadcrumb .icon:last-child {
  margin-left: 0.5em;
  color: #00a758;
  padding-top: 3px;
}

.v-divider {
  margin: 0;
}

/* Contact Section */
.contact-body .row {
  align-content: space-between;
  justify-content: space-around;
}

.btn-add-comment {
  background: #00a758 !important;
}

.btn-add-comment:hover {
  background: #017740 !important;
}

.btn {
  transition: background-color 0.25s ease-in-out;
  color: #fff !important;
  border-radius: 0;
  text-transform: none;
  box-shadow: none;
}

.buttons {
  margin: auto;
  display: flex;
  column-gap: 20px;
  justify-content: flex-end;
  margin-bottom: 50px !important;
}

.disabled-link {
  pointer-events: none; /* Esto evita que el enlace sea clickeable */
  color: gray; /* Cambia el color del texto para indicar que está deshabilitado */
  text-decoration: none; /* Elimina la subrayado del enlace */
  cursor: not-allowed; /* Cambia el cursor cuando pasas sobre él */
}

@media screen and (min-width: 960px) {
  .row .contact-info {
    margin-top: 66px;
  }
}
</style>