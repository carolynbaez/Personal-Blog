import Vue from 'vue'
import CommentForm from '@/components/comment-form/CommentForm.vue';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/footer/Footer.vue';
import CommentDeleteModal from '@/components/comment-delete-modal/CommentDeleteModal.vue';
import SubscriptionModal from '@/components/subscription-modal/SubscriptionModal.vue'

Vue.component("CommentForm", CommentForm);
Vue.component("HeaderComponent", Header);
Vue.component("FooterComponent", Footer);
Vue.component("CommentDeleteModal", CommentDeleteModal);
Vue.component("SubscriptionModal", SubscriptionModal);