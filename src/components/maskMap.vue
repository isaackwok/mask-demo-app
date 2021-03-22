<template>
  <div class="mask-map" id="mask-map"></div>
</template>

<script>
import L from "leaflet";
import { mapGetters } from "vuex";
export default {
  name: "maskMap",
  data() {
    return {
      map: {},
      markers: [],
    };
  },
  computed: {
    ...mapGetters(["currDistrictInfo", "filteredStores"]),
  },
  watch: {
    currDistrictInfo(dist) {
      this.map.panTo(new L.LatLng(dist.latitude, dist.longitude));
    },
    filteredStores(stores) {
      this.clearMarkers();
      stores.forEach((store) => this.addMarker(store));
    },
  },
  methods: {
    addMarker(store) {
      const ICON = {
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/iamges/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      };
      const marker = L.marker([store.longitude, store.latitude], ICON)
        .addTo(this.map)
        .bindPopup(`<h2 class="popup-name">${store.name}</h2>`);

      marker.markerId = store.id;
      marker.lng = store.longitude;
      marker.lat = store.latitude;

      this.markers.push(marker);
    },
    clearMarkers() {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.marker) {
          this.map.removeLayer(layer);
        }
      });

      this.markers.length = 0;
    },
    triggerPopup(markerId) {
      const marker = this.markers.find((d) => d.markerId === markerId);

      this.map.flyTo(new L.LatLng(marker.lng, marker.lat), 15);
      marker.openPopup();
    },
  },
  mounted() {
    this.map = L.map("mask-map", {
      center: [25.03, 121.55],
      zoom: 14,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '<a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap 貢獻者</a>',
      maxZoom: 18,
    }).addTo(this.map);
  },
};
</script>

<style></style>
