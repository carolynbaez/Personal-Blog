<template>
  <section>
    <v-form fast-fail @submit.prevent>
      <v-text-field
        label="Nombre"
        :rules="nameRules"
        outlined
        color="#a7a7a7"
        v-model="comment.userName"
      ></v-text-field>
      <v-textarea
        clearable
        label="Escribe aquí tu comentario"
        variant="solo"
        outlined
        :rules="descriptionRules"
        color="#a7a7a7"
        v-model="comment.description"
      ></v-textarea>
      <div class="buttons">
        <v-btn class="btn-add-comment btn" color="#00a758" @click="save">
          <b-icon
            pack="fas"
            size="is-small"
            icon="floppy-disk"
            class="icon-pencil"
          >
          </b-icon>
          Guardar
        </v-btn>
        <v-btn
          class="btn-cancel btn"
          color="#505050"
          @click="changeFormVisibility"
          ><b-icon pack="fas" size="is-small" icon="trash" class="icon-pencil">
          </b-icon>
          Cancelar
        </v-btn>
      </div>
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { CommentModel } from "@/core/models/comment.model";

export default Vue.extend({
  props: {
    commentToEdit: {
      type: CommentModel,
      default: () => Object.assign({}, new CommentModel()),
    },
  },

  data() {
    return {
      comment: new CommentModel(),
      nameRules: [
        (value: any) => {
          const regex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/;
          if (regex.test(value)) return true;
          return "Solo se aceptan letras A-Z";
        },
      ],
      descriptionRules: [
        (value: any) => {
          if (value != "") return true;
          return "Complete este campo";
        },
      ],
    };
  },

  methods: {
    changeFormVisibility() {
      this.comment = new CommentModel();
      this.$emit("changeFormVisibility");
    },

    save() {
      this.$emit("save", this.comment);
    },

    chargeValues(comment: CommentModel){
      this.comment = comment
    }
  },

  beforeMount() {
    if (this.$props.commentToEdit._id) {
      this.comment = this.$props.commentToEdit;
    }
  },
});
</script>
<style scoped>
.buttons {
  margin: auto;
  display: flex;
  column-gap: 20px;
  justify-content: flex-end;
  margin-bottom: 50px !important;
}

.btn {
  transition: background-color 0.25s ease-in-out;
  color: #fff !important;
  border-radius: 0;
  text-transform: none;
  box-shadow: none;
}
</style>