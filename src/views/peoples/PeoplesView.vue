<script setup lang="ts">
import { onMounted } from "vue";

import { peoplesComp } from "@/composables/peoples";
import PeoplesTable from "@/components/peoplesView/peoplesTable.vue";

const { getPeoples, peoples } = peoplesComp();

onMounted(() => {
  getPeoples();
});
</script>

<template>
  <div>
    <template v-if="peoples.length">
      <peoples-table :peoples="peoples" />
    </template>
    <template v-else> Идет загрузка данных </template>
  </div>
</template>

<style scoped></style>
