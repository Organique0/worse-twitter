import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    HiRefresh,
    HiChat,
    HiHeart,
    HiUpload,
    HiSearch,
    HiChevronDown
} from "oh-vue-icons/icons";

addIcons(HiRefresh, HiChat, HiHeart, HiUpload, HiSearch, HiChevronDown);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
});