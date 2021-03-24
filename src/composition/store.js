import { reactive, computed } from "vue";

const state = reactive({
  //states
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

  //getters
  cityList: computed(() => state.location.map((d) => d.name)),
  districtList: computed(
    () => state.location.find((d) => d.name === state.currCity)?.districts || []
  ),
  filteredStores: computed(() => {
    return state.keywords
      ? state.stores.filter((d) => d.name.includes(state.keywords)).slice(0, 30)
      : state.stores.filter(
          (d) => d.county === state.currCity && d.town === state.currDistrict
        );
  }),
  currDistrictInfo: computed(
    () => state.districtList.find((d) => d.name === state.currDistrict) || {}
  ),
});

//setters
const setCurrCity = (val) => {
  state.currCity = val;
};
const setCurrDistrict = (val) => {
  state.currDistrict = val;
};
const setShowModal = (val) => {
  state.showModal = val;
};
const setInfoBoxSid = (val) => {
  state.infoBoxSid = val;
};
const setKeywords = (val) => {
  console.log(val);
  state.keywords = val;
};

const fetchLocations = async () => {
  const json = await fetch(
    "https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json"
  ).then((res) => res.json());
  state.location = json;
};

const fetchPharmacies = async () => {
  const json = await fetch(
    "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
  ).then((res) => res.json());

  const data = json.features.map((d) => ({
    ...d.properties,
    latitude: d.geometry.coordinates[0],
    longitude: d.geometry.coordinates[1],
  }));

  state.stores = data;
};

export default {
  state,
  setCurrCity,
  setCurrDistrict,
  setShowModal,
  setInfoBoxSid,
  setKeywords,
  fetchLocations,
  fetchPharmacies,
};
