<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { peoplesComp, currentPeople } from "@/composables/peoples";

const {
  getCurrentPeople,
  isFavorite,
  addToFavorites,
  deleteFromFavorites,
  elements,
} = peoplesComp();
const route = useRoute();

onMounted(async () => {
  getCurrentPeople(route.params.id);
});
</script>

<template>
  <div class="table" v-if="currentPeople">
    <div class="table__header">
      <div v-for="el in elements" :key="el.label">{{ el.label }}</div>
      <div>удалить</div>
    </div>
    <div class="table__body">
      <div v-for="el in elements" :key="el.label">
        {{ currentPeople[el.label] }}
      </div>
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
