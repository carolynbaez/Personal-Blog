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
          <li><router-link to="/forum">Foro</router-link></li>
          <li><router-link to="/forum">Comentarios</router-link></li>
        </ol>
      </nav>
    </div>
    <v-divider />
    <CommentDeleteModal
      :dialog="deleteDialog"
      @closeDeleteDialog="closeDeleteDialog"
      @delete="deleteAnswer"
    />
    <v-container class="comment-body">
      <v-row class="center-xs">
        <v-col cols="10" xs="12">
          <div class="comment">
            <template>
              <v-card>
                <v-card-title>
                  <v-row>
                    <div class="header-card">
                      <div class="avatar">
                        <v-avatar color="#F2F2F2" size="60px">
                          <span class="text-h5 initials">{{
                            getInitials(comment.userName)
                          }}</span>
                        </v-avatar>
                      </div>

                      <div class="title-col">
                        {{ comment.userName }}
                        <v-card-subtitle>{{
                          helper.calculateDays(new Date(comment.createdAt))
                        }}</v-card-subtitle>
                      </div>
                    </div>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  {{ comment.description }}
                </v-card-text>
                <v-card-actions>
                  <v-btn class="btn btn-add-answer" @click="openForm">
                    <i class="fa-regular fa-comments"></i>
                    Responder</v-btn
                  >
                </v-card-actions>
              </v-card>
              <!-- <div class="actions">
                <span @click="openForm">Editar</span>
                <v-divider vertical class="mx-2"> </v-divider>
                <span @click="openDeleteDialog(comment._id)">Eliminar</span>
              </div> -->
            </template>
            <h2 class="title-answers" v-if="isFormVisible">Nueva Respuesta</h2>
            <div class="form" v-if="isFormVisible">
              <CommentForm @save="save" @changeFormVisibility="closeForm" />
            </div>
            <div class="answers">
              <h2 class="title-answers">
                Respuestas ({{ comment.answers_count }})
              </h2>
              <div class="form" v-if="isEditFormVisible">
                <CommentForm
                  @save="save"
                  @changeFormVisibility="closeEditForm"
                  :commentToEdit="answer"
                />
              </div>
              <div class="no-data" v-if="comment.answers_count == 0">
                <i class="fa-solid fa-comments"></i>

                Aún no hay respuesta para mostrar.
              </div>
              <ul class="answers-list" v-else>
                <li
                  v-for="(answer, index) in comment.answers"
                  :key="index"
                  class="answer"
                >
                  <template>
                    <v-card>
                      <!-- <v-card-title>
                        <v-row>
                          <v-col cols="1">
                            <div class="avatar">
                              <v-avatar color="#F2F2F2" size="60px">
                                <span class="text-h5 initials">{{
                                  getInitials(answer.userName)
                                }}</span>
                              </v-avatar>
                            </div>
                          </v-col>
                          <v-col cols="11" class="title-col">
                            {{ answer.userName }}
                            <v-card-subtitle>{{
                              helper.calculateDays(new Date(answer.createdAt))
                            }}</v-card-subtitle>
                          </v-col>
                        </v-row>
                      </v-card-title> -->
                      <v-card-title>
                        <v-row>
                          <div class="header-card">
                            <div class="avatar">
                              <v-avatar color="#F2F2F2" size="60px">
                                <span class="text-h5 initials">{{
                                  getInitials(answer.userName)
                                }}</span>
                              </v-avatar>
                            </div>

                            <div class="title-col">
                              {{ answer.userName }}
                              <v-card-subtitle>{{
                                helper.calculateDays(new Date(answer.createdAt))
                              }}</v-card-subtitle>
                            </div>
                          </div>
                        </v-row>
                      </v-card-title>
                      <v-card-text>
                        {{ answer.description }}
                      </v-card-text>
                      <!-- <v-card-actions>
                        <v-btn class="btn btn-add-answer" @click="openForm">
                          <i class="fa-regular fa-comments"></i>
                          Responder</v-btn
                        >
                      </v-card-actions> -->
                    </v-card>
                    <div class="actions" v-if="answer.userId == user">
                      <span @click="openEditForm(answer)">Editar</span>
                      <v-divider vertical class="mx-2"> </v-divider>
                      <span @click="openDeleteDialog(answer._id)"
                        >Eliminar</span
                      >
                    </div>
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </v-col>
        <!-- <v-col cols="4">
          <div class="user-info"></div>
        </v-col> -->
      </v-row>
    </v-container>
  </section>
</template>
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
/* Cooment body */

.comment-body {
  margin: 20px auto;
}

.initials {
  color: #a7a7a7;
}

.title-col {
  padding-left: 3px;
  padding-top: 18px;
  word-break: break-word;
}

.v-card__title {
  padding-bottom: 4px;
}

.v-card__subtitle {
  padding-left: 0;
  padding-top: 0;
}

.v-card__text {
  font-size: 1.125rem;
  line-height: 27px;
  font-family: arial;
  color: rgb(22, 22, 22) !important;
}

.v-card__actions {
  justify-content: flex-end;
}

.btn-add-answer {
  background: #139e4c !important;
  border-radius: 0;
  border: none;
  color: white !important;
  transition: color 0.25s ease-in-out, box-shadow 0.25s ease-in-out,
    background-color 0.25s ease-in-out;
  line-height: 1.5rem;
  padding: 4px 12px !important;
  text-transform: capitalize;
  font-size: 0.9375rem !important;
}

.btn {
  transition: background-color 0.25s ease-in-out;
  border-radius: 0;
  text-transform: none;
  box-shadow: none;
}

h2.title-answers {
  font-size: 1.375rem;
  margin: 1.9rem auto;
  font-weight: 600;
  line-height: 1.29;
}

.answer {
  margin-bottom: 30px;
}

.actions {
  margin-top: 7px;
  color: #4f4a4a;
  font-weight: 500;
  cursor: pointer;
}

.actions span:hover {
  color: #00a758;
  transition: color 0.25s ease-in-out;
}

.no-data {
  color: #afafaf7a;
  display: flex;
  font-size: 30px;
  flex-direction: column;
  align-items: center;
  height: 400px;
  justify-content: flex-start;
  gap: 40px;
  padding-top: 105px;
}

.no-data i {
  font-size: 70px;
}

.header-card {
  display: flex;
  align-items: baseline;
  column-gap: 10px;
}

@media screen and (max-width: 348px) {
  .container.breadcrum {
    display: none;
  }
}

@media screen and (max-width: 620px) {
  .row.center-xs {
    justify-content: center;
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import FormatHelper from "@/core/utils/format-util";
import { AnswerModel } from "@/core/models/answer.model";
import AnswerService from "@/core/services/answer.service";
import CommentService from "@/core/services/comment.service";
import VueScrollTo from "vue-scrollto";

export default Vue.extend({
  data() {
    return {
      helper: new FormatHelper(),
      service: new AnswerService(),
      answer: new AnswerModel(),
      isFormVisible: false,
      commentService: new CommentService(),
      deleteDialog: false,
      commentToDelete: "",
      isEditFormVisible: false,
      user: this.$store.state.userId,
    };
  },

  props: ["comment"],

  methods: {
    getInitials(name: string) {
      return this.helper.getInitials(name);
    },

    async save(comment: AnswerModel) {
      if (comment.description != "" && comment.userName != "") {
        comment.comment = this.$route.params["id"];
        let userId = localStorage.getItem("UserId");
        if (userId != null) {
          comment.userId = JSON.parse(localStorage.getItem("UserId")!);
        }
        await this.service
          .saveAnswer(comment)
          .then(async () => {
            this.$props.comment = await this.commentService.getComment(
              this.$route.params["id"]
            );
            this.$buefy.toast.open({
              message: "¡Comentario guardado correctamente!",
              type: "is-success",
            });

            this.closeForm();
            this.closeEditForm();
          })
          .catch(() => {
            this.$buefy.toast.open({
              message: "Ha ocurrido un error. Intente de nuevo.",
              type: "is-danger",
            });
          });
      } else {
        this.$buefy.toast.open({
          message: "Debe llenar todos los campos.",
          type: "is-danger",
        });
      }
    },

    openForm() {
      this.isFormVisible = true;
    },

    openEditForm(answer: AnswerModel) {
      this.answer = answer;
      this.isEditFormVisible = true;
      VueScrollTo.scrollTo("#editFormDiv", 500);
    },

    closeEditForm() {
      this.answer = new AnswerModel();
      this.isEditFormVisible = false;
    },

    closeForm() {
      this.isFormVisible = false;
    },

    async getComment() {
      this.$props.comment = await this.commentService.getComment(
        this.$route.params["id"]
      );
    },

    openDeleteDialog(id: string) {
      this.deleteDialog = true;
      this.commentToDelete = id;
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
    },

    async deleteAnswer() {
      await this.service
        .delete(this.commentToDelete)
        .then(async () => {
          this.$props.comment = await this.commentService.getComment(
            this.$route.params["id"]
          );
          this.$buefy.toast.open({
            message: "¡Comentario eliminado correctamente!",
            type: "is-success",
          });
          this.closeDeleteDialog();
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: "Ha ocurrido un error. Intente de nuevo.",
            type: "is-danger",
          });
        });
    },
  },

  async beforeMount() {
    await this.getComment();
  },
});
</script>