<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="400px" persistent>
      <v-card>
        <v-card-title class="text-h5">
         Confirmación
        </v-card-title>

        <v-card-text>
          ¿Desea eliminar el comentario? Esta acción no se puede deshacer.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>

          <v-btn color="green darken-1" text @click="execDelete">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ["dialog"],

    methods: {
        closeDialog(){
            this.$emit("closeDeleteDialog");
        },

        execDelete(){
            this.$emit("delete");
        }
    }
})
</script>