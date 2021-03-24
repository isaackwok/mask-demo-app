<template>
  <div id="app">
    <!-- aside-menu 左側欄 -->
    <aside-menu />
    <!-- 地圖區塊 -->
    <mask-map />
    <light-box />
  </div>
</template>

<script>
import asideMenu from "./components/asideMenu.vue";
import lightBox from "./components/lightbox.vue";
import maskMap from "./components/maskMap.vue";

import mapStore from "@/composition/store.js";
import map from "@/composition/map.js";
import { provide } from "vue";

export default {
  components: { asideMenu, lightBox, maskMap },
  name: "App",
  setup() {
    provide("mapStore", mapStore);
    provide("map", map);
    mapStore.fetchLocations();
    mapStore.fetchPharmacies();
  },
};
</script>

<style lang="scss" src="@/assets/style.scss"></style>
