<template>
  <section>
    <div class="content-nav container">
      <nav aria-label="breadcrumb" class="container">
        <ol class="breadcrumb">
          <li>
            <router-link to="/"
              ><i> <b-icon pack="fas" icon="home"> </b-icon></i
            ></router-link>
          </li>
          <li>Foro</li>
          <li><router-link to="/forum">Comentarios</router-link></li>
        </ol>
      </nav>
    </div>
    <v-divider />
    <CommentDeleteModal
      :dialog="deleteDialog"
      @closeDeleteDialog="closeDeleteDialog"
      @delete="deleteComment"
    />
    <div class="container">
      <div class="forum-body container">
        <v-btn class="btn-add-comment btn" @click="openForm" id="editFormDiv"
          ><b-icon pack="fas" size="is-small" icon="pencil" class="icon-pencil">
          </b-icon>
          Añadir un comentario
        </v-btn>
        <div v-if="isFormVisible" style="margin-top:25px">
          <CommentForm @changeFormVisibility="closeForm" @save="save" />
        </div>
        <div class="comments" v-if="paginatedItems.length > 0">
          <ul class="comments-list">
            <li>
              <div class="form" v-if="isEditFormVisible">
                <CommentForm
                  @save="save"
                  @changeFormVisibility="closeEditForm"
                  :commentToEdit="comment"
                />
              </div>
            </li>
            <li>
              <template>
                <v-card
                  class="comment-card container"
                  v-for="(comment, index) in paginatedItems"
                  :key="index"
                >
                  <div class="content">
                    <v-card-title>
                      <v-row>
                        <div class="header-card">
                          <b-tooltip :label="comment.userName" type="is-dark">
                            <div class="avatar">
                              <v-avatar color="#F2F2F2" size="60px">
                                <span class="text-h5 initials">{{
                                  getInitials(comment.userName)
                                }}</span>
                              </v-avatar>
                            </div>
                          </b-tooltip>
                          <div class="title-col">
                            <div class="comment-title">
                              <router-link
                                :to="{
                                  name: 'comment',
                                  params: { id: comment._id },
                                }"
                              >
                                {{ comment.description }}
                              </router-link>
                            </div>
                            <v-card-subtitle>
                              Por
                              <span class="by-name">{{ comment.userName }}</span
                              >,
                              {{
                                helper.calculateDays(
                                  new Date(comment.createdAt)
                                )
                              }}</v-card-subtitle
                            >
                          </div>
                        </div>
                      </v-row>
                    </v-card-title>

                    <div class="footer-card container">
                      <router-link
                        :to="{ name: 'comment', params: { id: comment._id } }"
                      >
                        <b-tooltip label="Ver respuestas" type="is-dark">
                          <div class="answers">
                            <!-- <b-icon
                              pack="fas"
                              size="is-small"
                              icon="comments"
                              class="icon-pencil"
                            >
                            </b-icon> -->
                            <i class="fa-regular fa-comments"></i>
                            Ver respuestas
                          </div>
                        </b-tooltip>
                      </router-link>
                      <div class="actions">
                        <router-link
                          :to="{ name: 'comment', params: { id: comment._id } }"
                        >
                          <v-btn class="btn-add-answer" color="green darken-1">
                            <!-- <b-icon
                            pack="fa"
                            size="is-small"
                            icon="comment"
                            class="icon-pencil"
                          >
                          </b-icon> -->
                            <i class="fa-regular fa-comment"></i>
                            Responder
                          </v-btn>
                        </router-link>
                        <router-link to="#" v-if="comment.userId == user">
                          <v-btn
                            color="yellow darken-3"
                            class="btn-add-answer"
                            @click="openEditForm(comment)"
                          >
                            <!-- <b-icon
                            pack="fa"
                            size="is-small"
                            icon="comment"
                            class="icon-pencil"
                          >
                          </b-icon> -->
                            <i class="fa-regular fa-pen-to-square"></i>
                            Editar
                          </v-btn>
                        </router-link>
                        <router-link to="#" v-if="comment.userId == user">
                          <v-btn
                            class="btn-add-answer"
                            @click="openDeleteDialog(comment._id)"
                            color="red darken-2"
                          >
                            <!-- <b-icon
                            pack="fa"
                            size="is-small"
                            icon="comment"
                            class="icon-pencil"
                          >
                          </b-icon> -->
                            <i class="fa-regular fa-trash-can"></i> Eliminar
                          </v-btn>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </v-card>
              </template>
            </li>
          </ul>
        </div>
        <v-pagination
          v-if="paginatedItems.length > 0"
          v-model="currentPage"
          :total-visible="7"
          :length="Math.ceil(comments.length / itemsPerPage)"
          color="#00a758"
          class="pagination"
        ></v-pagination>
      </div>
      <div class="no-data" v-if="paginatedItems.length == 0">
        <i class="fa-solid fa-comments"></i>
        Aún no hay comentarios para mostrar.
      </div>
    </div>
  </section>
</template>
            </li>
          </ul>
        </div>
      </div>
    </div>
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

.v-application a {
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
/* Forum Body */

.header-card {
  display: flex;
  align-items: flex-start;
  -moz-column-gap: 10px;
  column-gap: 10px;
}

.title-col {
  padding-left: 3px;
  padding-top: 18px;
}

.v-card__subtitle {
  padding-left: 0;
  padding-top: 0;
  word-break: break-word;
}

.forum-body.container {
  padding: 35px 12px 5px 34px;
}

.btn {
  transition: background-color 0.25s ease-in-out;
  color: #fff !important;
  border-radius: 0;
  text-transform: none;
  box-shadow: none;
}

.btn-add-comment {
  background: #00a758 !important;
}

.btn-add-comment:hover {
  background: #017740 !important;
}

.v-btn__content {
  align-items: flex-end;
}

.icon-pencil {
  margin-right: 4px;
}

.comments {
  margin-top: 40px;
}

.comments-list {
  padding-left: 0;
}

.comment-card {
  display: flex;
  align-items: flex-start;
  padding-top: 15px;
  width: 100%;
  border-bottom: 2px solid rgba(22, 22, 22, 0.15) !important;
  border-radius: 0 !important;
}

.comment-card .content {
  width: 92%;
}

.initials {
  color: #a7a7a7;
}

.v-card__title {
  padding-top: 0px;
}

.avatar .v-avatar:hover {
  border: 1px solid #017740 !important;
}

.avatar .v-avatar {
  transition: border 0.25s ease-in-out;
}

.avatar .v-avatar span:hover {
  cursor: default;
}

.footer-card.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-add-answer {
  background: transparent !important;
  border-radius: 0;
  color: white !important;
  box-shadow: inset 0 0 0 0.125rem rgba(22, 22, 22, 0.1);
  transition: color 0.25s ease-in-out, box-shadow 0.25s ease-in-out,
    background-color 0.25s ease-in-out;
  line-height: 1.5rem;
  padding: 4px 12px !important;
  text-transform: capitalize;
  font-size: 0.9375rem !important;
}

.comment-title {
  white-space: break-spaces;
  word-break: break-word;
}

.comment-title a,
.answers {
  padding: 0;
  transition: color 0.25s ease-in-out;
}

.comment-title a:hover,
.answers:hover {
  color: #017740;
}

.v-card__subtitle {
  color: #848484;
  font-weight: 300;
}

.v-card__subtitle span {
  color: #848484;
  font-weight: 500;
}

.pagination {
  padding-left: 0;
  margin: 40px auto !important;
}

/* Responsive */

.contenedor {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}

.contenido {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.show-all {
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}

.boton-ver-mas {
  flex-shrink: 0;
  margin-left: 10px;
}

.b-tooltip.is-dark.is-top.is-medium {
  margin-top: 15px;
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
</style>
<script lang="ts">
import Vue from "vue";
import CommentService from "@/core/services/comment.service";
import AnswerService from "@/core/services/answer.service";
import { CommentModel } from "@/core/models/comment.model";
import FormatHelper from "@/core/utils/format-util";
import VueScrollTo from "vue-scrollto";

export default Vue.extend({
  data() {
    return {
      comments: [],
      currentPage: 1,
      itemsPerPage: 5,
      commentService: new CommentService(),
      answerService: new AnswerService(),
      isFormVisible: false,
      helper: new FormatHelper(),
      deleteDialog: false,
      commentToDelete: "",
      isEditFormVisible: false,
      comment: new CommentModel(),
      user: this.$store.state.userId,
    };
  },

  methods: {
    openEditForm(comment: CommentModel) {
      this.comment = comment;
      this.isEditFormVisible = true;
      VueScrollTo.scrollTo("#editFormDiv", 500);
    },
    closeEditForm() {
      this.comment = new CommentModel();
      this.isEditFormVisible = false;
    },
    openDeleteDialog(id: string) {
      this.deleteDialog = true;
      this.commentToDelete = id;
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
    },

    async deleteComment() {
      await this.commentService
        .delete(this.commentToDelete)
        .then(async () => {
          this.comments = await (
            await this.commentService.getComments()
          ).data.reverse();
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

    async getComments() {
      this.comments = await (
        await this.commentService.getComments()
      ).data.reverse();
      // console.log(this.comments)
      this.$store.state.comments = this.comments;
    },

    getInitials(name: string) {
      if (this.comments.length > 0) {
        return this.helper.getInitials(name);
      }
    },

    openForm() {
      this.isFormVisible = true;
    },

    closeForm() {
      this.isFormVisible = false;
    },

    async save(comment: CommentModel) {
      if (comment.description != "" && comment.userName != "") {
        let userId = localStorage.getItem("UserId");
        if (userId != null) {
          comment.userId = JSON.parse(localStorage.getItem("UserId")!);
        }
        await this.commentService
          .saveComment(comment)
          .then(() => {
            this.$buefy.toast.open({
              message: "¡Comentario guardado correctamente!",
              type: "is-success",
            });
            this.getComments();
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
  },

  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.comments.slice(startIndex, endIndex);
    },
  },

  async beforeMount() {
    await this.getComments();
  },
});
</script>