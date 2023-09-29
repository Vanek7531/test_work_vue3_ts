<script setup lang="ts">
import PeoplesRow from "@/components/peoplesView/peoplesRow.vue";
import type { peopleDescription } from "@/interfaces";

defineProps({
  peoples: {
    type: Object as () => peopleDescription,
    default: [],
  },
});
</script>

<template>
  <table>
    <tr>
      <th>Имя</th>
      <th>Рост</th>
      <th>Вес</th>
      <th>цвет волос</th>
      <th>actions</th>
    </tr>
    <peoples-row
      v-for="people in peoples"
      :key="people.birth_year"
      :people="people"
    />
  </table>
</template>

<style lang="scss">
table {
  border-collapse: collapse;
  border: 1px solid black;
  td {
    border: 1px solid black;
    text-align: center;
  }
  td,
  th {
    padding: 5px;
  }
}
</style>
