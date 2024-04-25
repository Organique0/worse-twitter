import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    HiRefresh,
    HiChat,
    HiHeart,
    HiUpload,
    HiSearch
} from "oh-vue-icons/icons";

addIcons(HiRefresh, HiChat, HiHeart, HiUpload, HiSearch);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
});