import { createStore } from "vuex";

export default createStore({
  state: {
    // 使用者目前所選縣市
    currCity: "臺北市",
    // 使用者目前所選行政區
    currDistrict: "北投區",
    // 存放 API 回傳的縣市/行政區的列表資訊
    location: [],
    // 存放 API 回傳的所有藥局資訊
    stores: [],
    keywords: "",
    showModal: false,
    infoBoxSid: null,
  },
  mutations: {
    setCurrCity(state, payload) {
      state.currCity = payload;
    },
    setCurrDistrict(state, payload) {
      state.currDistrict = payload;
    },
    setAreaLocation(state, payload) {
      state.location = payload;
    },
    setStores(state, payload) {
      state.stores = payload;
    },
    setKeywords(state, payload) {
      state.keywords = payload;
    },
    setShowModal(state, payload) {
      state.showModal = payload;
    },
    setInfoBoxSid(state, payload) {
      state.infoBoxSid = payload;
    },
  },
  actions: {
    async fetchLocations({ commit }) {
      const json = await fetch(
        "https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json"
      ).then((res) => res.json());
      commit("setAreaLocation", json);
    },
    async fetchPharmacies({ commit }) {
      const json = await fetch(
        "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
      ).then((res) => res.json());

      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));

      commit("setStores", data);
    },
  },
  getters: {
    cityList(state) {
      return state.location.map((d) => d.name);
    },
    districtList(state) {
      return (
        state.location.find((d) => d.name === state.currCity)?.districts || []
      );
    },
    filteredStores(state) {
      const { stores } = state;
      return state.keywords
        ? stores.filter((d) => d.name.includes(state.keywords))
        : stores.filter(
            (d) => d.county === state.currCity && d.town === state.currDistrict
          );
    },
    currDistrictInfo(state, getters) {
      return getters.districtList.find(d => d.name === state.currDistrict) || {};
    }
  },
  modules: {},
});
