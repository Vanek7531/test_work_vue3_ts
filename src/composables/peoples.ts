import axios from "axios";
import { reactive, ref} from "vue";
import type { Ref, UnwrapNestedRefs } from 'vue'
import type { peopleDescription } from "@/interfaces";

export const peoplesComp = () => {
    const peoples: Ref<[]> = ref([])
    const searchResult: Ref<[]> = ref([])
    let favoritesPeoples: peopleDescription = reactive([])
    const getPeoples = () => {
        axios
            .get(' https://swapi.dev/api/people')
            .then((response) => {
                peoples.value = response.data.results
            })
    }
    const getPeopleByName = (name: string) => {
        axios
            .post('https://swapi.dev/api/people', {search: name})
            .then((response) => {
                searchResult.value = response.data.results
            })
    }
    const addToFavorites = (people: object) => {
        getFavoritesPeoples()
        console.log(favoritesPeoples)
        favoritesPeoples.push(JSON.stringify(people))
        localStorage.setItem('favorites', JSON.stringify(favoritesPeoples))
    }
    const getFavoritesPeoples = () => {
        favoritesPeoples = JSON.parse(localStorage.getItem('favorites') || '[]');
    }
    const deleteFromFavorites = (name: string) => {
        getFavoritesPeoples()
        const preparedPeoples = favoritesPeoples.filter((el: any) => JSON.parse(el).name !== name)
        localStorage.setItem('favorites', JSON.stringify(preparedPeoples))
    }

    return {getFavoritesPeoples, addToFavorites, deleteFromFavorites, getPeoples, getPeopleByName, peoples }
}