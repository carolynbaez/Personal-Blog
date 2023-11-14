<template>
  <section>
    <div class="modal-card place-form" style="width: auto">
      <section class="modal-card-body">
        <header>
          <b-steps v-model="step" type="is-info">
            <b-step-item label="Datos" icon="circle-info" icon-pack="fa-solid">
              <b-field label="Nombre">
                <b-input
                  type="text"
                  v-model="place.name"
                  placeholder="Nombre del lugar"
                  required
                >
                </b-input>
              </b-field>

              <b-field label="Categoría" v-if="place._id != 'undefined'">
                <v-select
                  :required="true"
                  :placeholder="place.category.name"
                  v-model="place.category"
                  class="category-select"
                  id="selectCategory"
                  :items="categories"
                  :item-text="'name'"
                  :item-value="'_id'"
                >
                </v-select>
              </b-field>
              <b-field label="Categoría" v-else>
                <select
                  :required="true"
                  :placeholder="place.category.name"
                  class="category-select"
                  id="selectCategory"
                >
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                    :selected="category._id == place.category._id"
                    v-show="category._id != place.category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </b-field>
              <b-field label="Precio">
                <b-input
                  type="number"
                  v-model="place.price"
                  placeholder="Precio del lugar"
                  required
                >
                </b-input>
              </b-field>
              <b-field label="Valoración">
                <b-select
                  type="is-info"
                  placeholder="Valoración"
                  expanded
                  v-model="place.assessment"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </b-select>
              </b-field>
              <b-field label="Descripción corta">
                <b-input
                  type="text"
                  v-model="place.shortDescription"
                  placeholder="Cuentanos un poco del lugar"
                  required
                >
                </b-input>
              </b-field>
              <b-field label="Descripción larga">
                <VueEditor v-model="place.longDescription"></VueEditor>
              </b-field>
              <b-field>
                <b-switch
                  :rounded="true"
                  :outlined="false"
                  :size="'is-medium'"
                  :type="'is-info'"
                  :left-label="true"
                  :true-value="true"
                  :left-value="false"
                  v-model="place.public"
                >
                  <b>Público</b>
                </b-switch>
                <b-switch
                  :rounded="true"
                  :outlined="false"
                  :size="'is-medium'"
                  :type="'is-info'"
                  :left-label="true"
                  :true-value="true"
                  :left-value="false"
                  v-model="place.premium"
                >
                  <b>Premium</b>
                </b-switch>
              </b-field>
            </b-step-item>
            <b-step-item label="Fotos" icon="car" icon-pack="fa-solid">
              <b-field type="is-info">
                <input
                  id="inputVal"
                  name="image"
                  type="file"
                  @change="handleFileUpload"
                />
              </b-field>
              <div class="tags">
                <span
                  v-for="(file, index) in place.images"
                  :key="index"
                  class="tag is-primary"
                >
                <span v-if="file.url">
                   {{ formatImageName(file.url) }}
                </span>
                <span v-else>
                  {{ file.name }}
                </span>
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)"
                  ></button>
                </span>
              </div>
            </b-step-item>
            <b-step-item label="Transporte" icon="car" icon-pack="fa-solid">
              <div class="trans-container">
                <div class="columns transport-columns">
                  <div class="column">
                    <div class="trans-form">
                      <b-field label="Tipo">
                        <b-select
                          placeholder="Seleccione el tipo"
                          v-model="transport.type"
                          expanded
                        >
                          <option
                            :value="index"
                            v-for="(
                              transportation, index
                            ) in transportationEnum"
                            :key="index"
                          >
                            {{ transportationEnum[index] }}
                          </option>
                        </b-select>
                      </b-field>
                      <b-field label="Precio">
                        <b-input
                          type="number"
                          placeholder="Precio"
                          v-model="transport.price"
                          required
                        >
                        </b-input>
                      </b-field>
                      <b-field label="Desde">
                        <b-input
                          type="text"
                          placeholder="Punto de partida"
                          v-model="transport.from"
                          required
                        >
                        </b-input>
                      </b-field>
                      <b-field label="Hasta">
                        <b-input
                          type="text"
                          placeholder="Punto de Final"
                          v-model="transport.to"
                          required
                        >
                        </b-input>
                      </b-field>
                      <b-button
                        @click="saveTransport()"
                        type="is-info"
                        outlined
                      >
                        Guardar
                      </b-button>
                    </div>
                  </div>
                  <div class="column">
                    <div class="trans-list">
                      <div class="trans-added">
                        <ul>
                          <li
                            class="transportation"
                            v-for="(
                              transportation, index
                            ) in place.transportations"
                            :key="index"
                          >
                            <div class="card">
                              <p class="tr-name">
                                <b-icon
                                  pack="fas"
                                  icon="bus"
                                  size="is-medium"
                                  v-if="transportation.type == 0"
                                >
                                </b-icon>
                                <b-icon
                                  pack="fas"
                                  icon="car"
                                  size="is-medium"
                                  v-if="
                                    transportation.type == 1 ||
                                    transportation.type == 2
                                  "
                                >
                                </b-icon>
                                <b-icon
                                  pack="fas"
                                  icon="train"
                                  size="is-medium"
                                  v-if="transportation.type == 4"
                                >
                                </b-icon>
                                <b-icon
                                  pack="fas"
                                  icon="motorcycle"
                                  size="is-medium"
                                  v-if="transportation.type == 3"
                                >
                                </b-icon>
                                {{ transportationEnum[transportation.type] }}
                              </p>
                              <p class="transportation-info">
                                Desde {{ transportation.from }} - Hasta
                                {{ transportation.to }}
                                <br />
                                Costo RD$ {{ transportation.price }}
                              </p>

                              <div class="actions">
                                <b-button
                                  icon-pack="fas"
                                  icon-right="pencil"
                                  @click="editTransport(transportation, index)"
                                />
                                <b-button
                                  icon-pack="fas"
                                  icon-right="trash"
                                  @click="deleteTransport(index)"
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-step-item>
            <b-step-item
              label="Contactos"
              icon="address-book"
              icon-pack="fa-solid"
            >
              <b-field>
                <b-input
                  placeholder="Número de teléfono"
                  type="text"
                  icon-pack="fas"
                  icon="phone"
                  v-model="place.contacts.phoneNumber"
                >
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  placeholder="Número de WhatsApp"
                  type="text"
                  icon-pack="fa-brands"
                  icon="whatsapp"
                  v-model="place.contacts.whatsappNumber"
                >
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  placeholder="Correo"
                  type="email"
                  icon-pack="fas"
                  icon="envelope"
                  v-model="place.contacts.email"
                >
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  placeholder="Facebook"
                  type="text"
                  icon-pack="fa-brands"
                  icon="facebook-f"
                  v-model="place.contacts.facebook"
                >
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  placeholder="Instagram"
                  type="text"
                  icon-pack="fa-brands"
                  icon="instagram"
                  v-model="place.contacts.instagram"
                >
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  placeholder="Sitio Web"
                  type="url"
                  icon-pack="fas"
                  icon="globe"
                  v-model="place.contacts.web"
                >
                </b-input>
              </b-field>
            </b-step-item>
          </b-steps>
        </header>
      </section>
      <footer class="modal-card-foot">
        <b-button
          label="Atrás"
          v-if="step > 0"
          type="is-white"
          @click="previousStep"
        ></b-button>
        <b-button
          label="Siguiente"
          v-if="step < 3"
          type="is-info"
          @click="nextStep"
        ></b-button>
        <b-button
          label="Guardar"
          v-if="step == 3"
          type="is-info"
          @click="save"
        ></b-button>
      </footer>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Transportation } from "@/core/utils/enums/transportation.enum";
import { TransportationModel } from "@/core/models/place.model";
import PlaceService from "@/core/services/place.service";
import { ToastProgrammatic as Toast } from "buefy";
import CategoryService from "@/core/services/category.service";
import ImageService from "@/core/services/image.service";

export default Vue.extend({
  data() {
    return {
      step: 0,
      transportationEnum: Transportation,
      transport: new TransportationModel(),
      service: new PlaceService(),
      categories: [],
      categoryService: new CategoryService(),
      selectedCategory: "",
      transportToEdit: null,
      imageService: new ImageService(),
    };
  },

  methods: {
    nextStep() {
      this.step += 1;
    },

    previousStep() {
      this.step -= 1;
    },

    handleFileUpload(e: any) {
      console.log(this.place.images);
      this.place.images.push(e.target.files[0]);
    },

    async save() {
      try {
        const response = await this.service.post(this.place);
        if (response.status == 201) {
          let placeId = response.data.data._id;
          this.place.images.forEach(async (image: any) => {
            let newImage = new FormData();
            newImage.append("image", image);
            await this.imageService.addImage(newImage, placeId);
          });

          Toast.open({
            message: "Lugar guardado correctamente",
            type: "is-success",
            position: "is-top",
          });

          setTimeout(() => {
            location.reload();
          }, 50);
        } else {
          Toast.open({
            message: "El lugar no se guardado correctamente",
            type: "is-danger",
            position: "is-top",
          });
        }
      } catch (error) {
        console.error(error);
        Toast.open({
          message: "Ha ocurrido un error. Intente de nuevo",
          type: "is-danger",
          position: "is-top",
        });
      }
    },

    async deleteDropFile(index: any) {
      if (this.place.images[index]._id) {
        await this.imageService.delete(this.place.images[index]._id);
      }
      this.place.images!.splice(index, 1);
    },

    saveTransport() {
      if (this.transportToEdit != null) {
        this.place.transportations.splice(this.transportToEdit, 1);
        this.place.transportations.splice(
          this.transportToEdit,
          0,
          this.transport
        );
      } else {
        this.place.transportations.push(this.transport);
      }
      this.transport = new TransportationModel();
      this.transportToEdit = null;
    },

    async getCategories() {
      let categories = await this.categoryService.getAll();
      this.categories = categories.data;
    },

    editTransport(transport: TransportationModel, index: any) {
      this.transport = transport;
      this.transportToEdit = index;
    },

    deleteTransport(index: number) {
      this.place.transportations.splice(index, 1);
    },

    formatImageName(name: string) {
      return name.replace("uploads\\", "");
    },
  },

  props: ["place"],

  async beforeMount() {
    console.log(this.place);
    await this.getCategories();
  },
});
</script>