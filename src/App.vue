<script setup lang="ts">
import axios from "axios";
import { ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router from "./router";
import { peoplesComp } from "./composables/peoples";

const {
  addToFavorites,
  deleteFromFavorites,
  isFavorite,
  getFavoritesPeoples,
  favoritesPeoples,
  getCurrentPeople,
} = peoplesComp();

const inputValue = ref("");
const results = ref();
const debounce = ref(false);
const goToCurrentPeople = (url: string) => {
  let id = url.replace(/\D/g, "");
  router.push(`/people/${id}`);
  inputValue.value = "";
  results.value = null;
  getCurrentPeople(id);
};

const loading = ref(false);

const cheackInfo = async (info: any) => {
  if (debounce.value) return;
  else {
    loading.value = true;
    try {
      debounce.value = true;
      setTimeout(() => {
        debounce.value = false;
      }, 1000);
      axios
        .get(`https://swapi.dev/api/people/?search${info}`)
        .then((response) => {
          results.value = response.data.results;
          loading.value = false;
        });
    } catch (er) {
      // оставил дубль в связи с тем что вне функции false отрабатывает сразу
      loading.value = false;
      console.log("er", er);
    }
  }
};

watch(inputValue, (newVal) => {
  if (newVal && newVal.length >= 1) {
    cheackInfo(inputValue.value);
  }
  if (newVal.length === 0) {
    results.value = null;
  }
});
</script>

<template>
  <header>
    <div class="header">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/peoples">Peoples</router-link>
        <router-link to="/favorites">Favorites</router-link>
      </nav>
    </div>
    <div class="search-container">
      <input v-model="inputValue" type="text" />
      <div v-if="!loading">
        <div
          class="search-container__list"
          v-for="res in results"
          :key="res.name"
        >
          <div
            class="search-container__item"
            @click="goToCurrentPeople(res.url)"
          >
            {{ res.name }}
          </div>
        </div>
      </div>
      <div v-else class="search-container__item">Загрузка</div>
    </div>
  </header>

  <RouterView class="wrapper" />
</template>
<style lang="scss" scoped>
.search-container {
  position: absolute;
  right: 15%;
  top: 10%;
  background: grey;
  padding: 20px;
  color: #fff;
  input {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
  }
  &__list {
  }
  &__item {
    padding: 5px;
    cursor: pointer;
    &:hover {
      background: aqua;
      color: black;
    }
  }
}
</style>
<style scoped>
header {
  position: relative;
  line-height: 1.5;
  max-height: 100vh;
}
.header {
  display: flex;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav {
  display: flex;
  gap: 20px;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
