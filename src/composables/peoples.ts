import axios from "axios";
import { ref } from "vue";
import type { Ref, UnwrapNestedRefs } from "vue";
import type { peopleDescription } from "@/interfaces";
export const currentPeople = ref();

export const peoplesComp = () => {
  // const favoritesPeoples = computed(() => {
  // 	return JSON.parse(localStorage.getItem("favorites") || "[]");
  // });
  const peoples: Ref<[]> = ref([]);
  const searchResult: Ref<[]> = ref([]);
  const favoritesPeoples: Ref<peopleDescription[] | []> = ref([]);

  const getPeoples = () => {
    axios.get(" https://swapi.dev/api/people").then((response) => {
      peoples.value = response.data.results;
    });
  };
  const getCurrentPeople = async (id: string | string[]) => {
    try {
      const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
      currentPeople.value = res.data;
    } catch (er) {
      console.log("er", er);
    }
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
    return favoritesPeoples.value.findIndex((el) => el.name === name) !== -1
      ? true
      : false;
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
