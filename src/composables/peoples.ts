import axios from "axios";
import { reactive, ref } from "vue";
import type { Ref, UnwrapNestedRefs } from "vue";
import type { peopleDescription } from "@/interfaces";
export const currentPeople = ref();

export const peoplesComp = () => {
  // const favoritesPeoples = computed(() => {
  // 	return JSON.parse(localStorage.getItem("favorites") || "[]");
  // });
  const getCurrentPeople = async (id: string) => {
    try {
      const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
      currentPeople.value = res.data;
			console.log('currentPeople.value',currentPeople.value);
      console.log("res", res);
    } catch (er) {
      console.log("er", er);
    }
  };
  const peoples: Ref<[]> = ref([]);
  const searchResult: Ref<[]> = ref([]);
  // let favoritesPeoples: peopleDescription | [] = reactive([]);
  const favoritesPeoples: Ref<peopleDescription[] | []> = ref([]);
  const getPeoples = () => {
    axios.get(" https://swapi.dev/api/people").then((response) => {
      peoples.value = response.data.results;
    });
  };
  const getPeopleByName = (name: string) => {
    axios
      .post("https://swapi.dev/api/people", { search: name })
      .then((response) => {
        searchResult.value = response.data.results;
      });
  };
  const addToFavorites = (people: object) => {
    getFavoritesPeoples();
    favoritesPeoples.value.push(people);
    localStorage.setItem("favorites", JSON.stringify(favoritesPeoples.value));
    // localStorage.setItem("newFav", JSON.stringify(people));
  };
  const getFavoritesPeoples = () => {
    favoritesPeoples.value = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
  };
  const deleteFromFavorites = (name: string) => {
    getFavoritesPeoples();
    const preparedPeoples = favoritesPeoples.value.filter(
      (el: any) => el.name !== name
    );
    localStorage.setItem("favorites", JSON.stringify(preparedPeoples));
    favoritesPeoples.value = preparedPeoples;
  };

  const isFavorite = (name: string) => {
		// let a = favoritesPeoples.value.find((el) => el.name === name);
		console.log('a');
    return favoritesPeoples.value.findIndex((el) => el.name === name) !== -1 ? true : false;
  };

  return {
    getFavoritesPeoples,
    addToFavorites,
    deleteFromFavorites,
    getPeoples,
    getPeopleByName,
    peoples,
    favoritesPeoples,
    currentPeople,
    getCurrentPeople,
    isFavorite,
  };
};
