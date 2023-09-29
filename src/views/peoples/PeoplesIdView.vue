<script setup lang="ts">
import { onMounted } from "vue";
import router from "../../router";

import { peoplesComp, currentPeople } from "@/composables/peoples";

const { getCurrentPeople, isFavorite, addToFavorites, deleteFromFavorites } =
  peoplesComp();

onMounted(async () => {
  console.log("router", router.currentRoute._rawValue.params.id);
  getCurrentPeople(router.currentRoute._rawValue.params.id);
});
</script>

<template>
  <div class="table" v-if="currentPeople">
    <div class="table__header">
      <div>name</div>
      <div>height</div>
      <div>mass</div>
      <div>hair_color</div>
      <div>skin_color</div>
      <div>birth_year</div>
      <div>gender</div>
      <div>homeworld</div>
      <div>films</div>
      <div>species</div>
      <div v-if="currentPeople.vehicles.length > 0">vehicles</div>
      <div v-if="currentPeople.starships.length > 0">starships</div>
      <div>created</div>
      <div>edit</div>
      <div>url</div>
      <div>Delete</div>
    </div>
    <div class="table__body">
      <div>{{ currentPeople.name }}</div>
      <div>{{ currentPeople.height }}</div>
      <div>{{ currentPeople.mass }}</div>
      <div>{{ currentPeople.hair_color }}</div>
      <div>{{ currentPeople.skin_color }}</div>
      <div>{{ currentPeople.birth_year }}</div>
      <div>{{ currentPeople.gender }}</div>
      <div>{{ currentPeople.homeworld }}</div>
      <div>{{ currentPeople.films }}</div>
      <div>{{ currentPeople.species }}</div>
      <div v-if="currentPeople.vehicles.length > 0">
        {{ currentPeople.vehicles }}
      </div>
      <div v-if="currentPeople.starships.length > 0">
        {{ currentPeople.starships }}
      </div>
      <div>{{ currentPeople.created }}</div>
      <div>{{ currentPeople.edit }}</div>
      <div>{{ currentPeople.url }}</div>
      <div class="actions">
        <div
          style="color: rgb(40, 231, 72)"
          @click="addToFavorites(currentPeople)"
          v-if="!isFavorite(currentPeople.name)"
        >
          добавить элемент в избраное
        </div>
        <div
          style="color: rgb(231, 40, 40)"
          @click="deleteFromFavorites(currentPeople.name)"
          v-else
        >
          удалить элемент из избраного
        </div>
      </div>
    </div>
  </div>
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
.table {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  & * {
    border-collapse: collapse;
  }
  & > div {
    // width: 450px;
    border: 1px solid black;
  }
  &__header {
    display: flex;
    // justify-content: space-between;
    // gap: 10px;
    & > div {
      padding: 5px;
      border-right: 1px solid black;
      flex: 1 0 5%;
      width: 100px;
      display: flex;
      align-items: start;
      overflow: hidden;
      justify-content: center;
    }
  }
  &__body {
    @extend .table__header;
  }
}
</style>
