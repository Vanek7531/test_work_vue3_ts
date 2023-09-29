import axios from "axios";
import { ref } from "vue";
import type { Ref, UnwrapNestedRefs } from "vue";
import type { peopleDescription } from "@/interfaces";
export const currentPeople = ref();

export const peoplesComp = () => {
  const peoples: Ref<[]> = ref([]);
  const searchResult: Ref<[]> = ref([]);
  const favoritesPeoples: Ref<peopleDescription[] | []> = ref([]);

  const getPeoples = async () => {
    try {
      const res = await axios.get(`https://swapi.dev/api/people/`);
      peoples.value = res.data.results;
    } catch (er) {
      console.log("er", er);
    }
  };
  const getCurrentPeople = async (id: string | string[]) => {
    try {
      const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
      currentPeople.value = res.data;
    } catch (er) {
      console.log("er", er);
    }
  };
  const addToFavorites = (people: object) => {
    getFavoritesPeoples();
    favoritesPeoples.value.push(people);
    localStorage.setItem("favorites", JSON.stringify(favoritesPeoples.value));
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
    return favoritesPeoples.value.findIndex((el) => el.name === name) !== -1;
  };
  const elements: any[] = [
    {
      label: "name",
      value: "имя",
    },
    {
      label: "height",
      value: "рост",
    },
    {
      label: "mass",
      value: "вес",
    },
    {
      label: "hair_color",
      value: "цвет волос",
    },
    {
      label: "skin_color",
      value: "цвет кожи",
    },
    {
      label: "birth_year",
      value: "др",
    },
    {
      label: "gender",
      value: "гендер",
    },
    {
      label: "homeworld",
      value: "земля",
    },
    {
      label: "species",
      value: "виды",
    },
    {
      label: "vehicles",
      value: "машины",
    },
    {
      label: "starships",
      value: "звездолеты",
    },
    {
      label: "created",
      value: "создать",
    },
    {
      label: "edit",
      value: "редактировать",
    },
    {
      label: "url",
      value: "адресс",
    },
  ];

  return {
    getFavoritesPeoples,
    addToFavorites,
    deleteFromFavorites,
    getPeoples,
    peoples,
    favoritesPeoples,
    currentPeople,
    getCurrentPeople,
    isFavorite,
    elements,
  };
};
