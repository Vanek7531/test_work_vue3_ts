<script setup lang="ts">
import {peoplesComp} from "@/composables/peoples";
import type { peopleDescription } from "@/interfaces";
import {computed} from "vue";

const { addToFavorites, deleteFromFavorites  } = peoplesComp()

const props = defineProps({
  people: {
    type: Object as () => peopleDescription,
    default: [],
  },
})
const favoritesPeoples = JSON.parse(localStorage.getItem('favorites') || '[]');
const canAdd = computed(() => {
  return !favoritesPeoples.findIndex((el: any) => JSON.parse(el).name !== props.people.name)
})
const canRemove = computed(() => {
  return favoritesPeoples.findIndex((el: any) => JSON.parse(el).name === props.people.name)
})

</script>

<template>
  <tr>
    <td>
      <div>{{ people.name }}</div>
    </td>
    <td>
      <div>{{ people.height }}</div>
    </td>
    <td>
      <div>{{ people.mass }}</div>
    </td>
    <td>
      <div>{{ people.hair_color }}</div>
    </td>
    <td>
      <div @click="addToFavorites(people)" > добавить элемент </div>
      <div @click="deleteFromFavorites(people.name)"  > удалить элемент </div>
    </td>
  </tr>
</template>

<style scoped>

</style>