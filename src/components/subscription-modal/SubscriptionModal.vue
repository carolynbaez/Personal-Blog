<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" v-if="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nuevo simpatizante</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form fast-fail @submit.prevent>
              <v-text-field
                label="Cédula*"
                placeholder="Sin guiones"
                outlined
                color="#a7a7a7"
                required
                :counter="charCount"
                :rules="textRules"
                id="documentId"
                v-model="member.documentId"
              ></v-text-field>

              <v-text-field
                label="Nombre"
                outlined
                color="#a7a7a7"
                readonly
                v-model="member.name"
                id="name"
              ></v-text-field>

              <v-text-field
                label="Apellidos"
                outlined
                color="#a7a7a7"
                readonly
                v-model="member.lastName"
                id="lastname"
              ></v-text-field>

              <v-text-field
                label="Teléfono*"
                type="number"
                placeholder="Sin guiones"
                outlined
                color="#a7a7a7"
                required
                v-model="member.phone"
                id="phone"
              ></v-text-field>

              <v-row>
                <v-col cols="12">
                  <div class="labe">
                    <label for="day">Fecha de Cumpleaños*</label>
                  </div>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Día"
                    type="number"
                    class="text-center"
                    max="31"
                    outlined
                    required
                    color="#a7a7a7"
                    v-model="member.day"
                    id="day"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Mes"
                    id="month"
                    type="number"
                    class="text-center"
                    max="12"
                    outlined
                    color="#a7a7a7"
                    required
                    v-model="member.month"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showSubscribeDialog">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" @click="submitMember" text>
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { MemberModel } from "@/core/models/subscription.model";
export default {
  data: () => ({
    charCount: 11,
    dialog: true,
    member: new MemberModel(),
  }),

  methods: {
    showSubscribeDialog() {
      this.$emit("showSubscribeDialog");
    },

    handleDocumentIdChange() {
      if (this.member.documentId.length == 11) {
        fetch(
          `${process.env.VUE_APP_BASE_API_URL}/member/consulta/${this.member.documentId}`,
          {
            method: "get",
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((dataStr) => {
            const data = JSON.parse(dataStr);
            if (data.ok == false) {
              alert("Cédula no reconocida");
            } else {
              this.member.name = data.Nombres;
              this.member.lastName = `${data.Apellido1} ${
                data.Apellido2 ? data.Apellido2 : ""
              }`;
              const phone = document.getElementById("phone");
              phone.focus();
            }
          });
      }
    },

    submitMember() {
      if (this.member.documentId != "" && this.member.documentId.length == 11) {
        fetch(`${process.env.VUE_APP_BASE_API_URL}/member/to-registe`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            document: this.member.documentId,
            name: this.member.name,
            lastname: this.member.lastname,
            phone: this.member.phone,
            day: this.member.day,
            month: this.member.month,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            alert(data.msg);
            this.showSubscribeDialog();

            this.member = new MemberModel();
          });
      } else {
        alert("Número de cédula inválido");
      }
    },
  },

  mounted() {
    const documentIdElement = document.getElementById("documentId");
    if (documentIdElement) {
      documentIdElement.addEventListener("change", this.handleDocumentIdChange);
    }
  },

  computed: {
    textRules() {
      return [
        (v) =>
          (v || "").length <= this.charCount ||
          `Máximo ${this.charCount} caracteres`,
      ];
    },
  },
};
</script>