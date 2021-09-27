<template>
<div class="bg-white px-4 py-12 rounded shadow-md">
  <h2 class="text-gray-600 text-xl">{{!!getUser ? `Добро пожаловать ${getUser.name}` : 'Войти'}}</h2>
  <div class="flex flex-col mt-4">
    <input v-if="getUser" type="text" placeholder="name" v-model="name">
    <input class="my-4" type="text" placeholder="email" v-model="email">
    <input v-if="getUser" type="text" placeholder="Старый пароль" v-model="oldPassword">
    <input type="text" placeholder="password" v-model="password">
  </div>
  <div class="flex mt-4  text-gray-100">
    <button v-if="!getUser" class="mt-4 bg-button-play px-4 py-2 text-sm rounded" @click="login(); close()">Войти</button>
    <div v-else>
      <button class="bg-button-play px-4 py-2 text-sm rounded" @click="update(); close()">Обновить</button>
      <button class="bg-button-play ml-4 px-4 py-2 text-sm rounded" @click="logout(); close()">Выйти</button>
    </div>
    <button class="ml-4 bg-button-play px-4 py-2 text-sm rounded" @click="close()">Отмена</button>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      email: '',
      password: '',
      oldPassword: '',

    }
  },
  mounted() {
    if(this.getUser) {
      this.email = this.getUser.email;
      this.name = this.getUser.name;
    }
  },
  computed: {
    getUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('auth/AUTH_REQUEST', {email: this.email, password: this.password}).then((res)=> {
        this.$store.dispatch('user/GET_WATCHLIST', res.data);
        this.$router.go(0)
      });
    },
    async logout() {
      await this.$store.dispatch('auth/LOGOUT').then(()=> {
        this.$router.go(0)
      });
    },
    async update() {
      let {data} = await this.dispatch('auth/UPDATE', {name: this.name, email: this.email, password: this.password, oldPassword: this.oldPassword, gender: this.getUser.gender})
      console.log(data);
    },
    close() {
      this.$emit('close');
    },
    async getPosts() {
      let {data} = await axios.get('http://localhost:3000/api/v1/posts');
      console.log(data);
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  border: 1px solid #aaa;
  padding: 2px 4px;
  margin: 4px 0;
  border-radius: 3px;
}
</style>