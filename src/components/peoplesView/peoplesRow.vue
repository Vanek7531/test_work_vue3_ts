<script setup lang="ts">
import { peoplesComp } from "@/composables/peoples";
import type { peopleDescription } from "@/interfaces";
import router from "@/router";
import { computed, onMounted } from "vue";

const {
  addToFavorites,
  deleteFromFavorites,
  isFavorite,
  getFavoritesPeoples,
  favoritesPeoples,
} = peoplesComp();

const props = defineProps({
  people: {
    type: Object as () => peopleDescription,
    default: [],
  },
});
onMounted(() => {
  getFavoritesPeoples();
});
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
    <td class="actions">
      <div style="color:rgb(40, 231, 72)" @click="addToFavorites(people)" v-if="!isFavorite(people.name)">
        добавить элемент в избраное
      </div>
      <div style="color:rgb(231, 40, 40)" @click="deleteFromFavorites(people.name)" v-else>
        удалить элемент из избраного
      </div>
    </td>
  </tr>
  <div></div>
</template>

<style scoped lang="scss">
.actions {
  // display: flex;
  // flex-direction: column;
  // gap: 10px;
  & div {
    padding: 2px;
    cursor: pointer;
  }
  & div:hover {
    color: rgb(0, 17, 255) !important;
  }
}
</style>
