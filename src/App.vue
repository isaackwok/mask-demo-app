<template>
  <div id="app">
    <!-- aside-menu 左側欄 -->
    <aside-menu @triggerMarkerPopup="openPopup" ref="menu"/>
    <!-- 地圖區塊 -->
    <mask-map ref="map"/>
    <light-box />
  </div>
</template>

<script>
import asideMenu from "./components/asideMenu.vue";
import lightBox from "./components/lightbox.vue";
import maskMap from "./components/maskMap.vue";

import { mapActions } from "vuex";
export default {
  components: { asideMenu, lightBox, maskMap },
  name: "App",
  methods: {
    openPopup(id) {
      this.$refs.map.triggerPopup(id);
    },
    ...mapActions(["fetchLocations", "fetchPharmacies"]),
  },
  mounted() {
    this.fetchLocations();
    this.fetchPharmacies();
  },
};
</script>

<style lang="scss" src="@/assets/style.scss"></style>
