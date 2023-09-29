<script setup lang="ts">
import { computed, onMounted } from "vue";

import { peoplesComp } from "@/composables/peoples";
const { favoritesPeoples, getFavoritesPeoples, deleteFromFavorites } = peoplesComp();

// const favoritesPeoples = computed(() => {
//   return JSON.parse(localStorage.getItem("favorites") || "[]");
// });
onMounted(()=>{
	getFavoritesPeoples()
})
</script>

<template>
  <div class="table" v-if="favoritesPeoples && favoritesPeoples.length > 0">
    <div class="table__header">
      <div>name</div>
      <div>height</div>
      <div>mass</div>
      <div>hair_color</div>
      <div>Delete</div>
    </div>
    <div class="table__body" v-for="favPeople in favoritesPeoples" :key="favPeople.name">
      <div>{{ favPeople.name }}</div>
      <div>{{ favPeople.height }}</div>
      <div>{{ favPeople.mass }}</div>
      <div>{{ favPeople.hair_color }}</div>
      <div style="cursor: pointer;" @click="deleteFromFavorites(favPeople.name)">Удалить из избраного</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table {
  display: flex;
  flex-direction: column;
  & * {
    border-collapse: collapse;
  }
  & > div {
    width: 550px;
    border: 1px solid black;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    & > div {
      padding: 10px;
      flex: 0 1 20%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > div:not(:last-child) {
      border-right: 1px solid black;
    }
  }
  &__body {
    @extend .table__header;
  }
}
</style>
