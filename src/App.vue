<template>
  <div>
    <Header></Header>
    <!-- <Home></Home> -->
    <!-- <h1>我是根组件</h1> -->
    <!-- 路由出口、展示区域 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Home from '@/pages/Home'
import Footer from '@/components/Footer/Footer.vue'
export default {
  components: { Header, Footer, Home },
  mounted() {
    this.$store.dispatch('categoryList')
  },
}
</script>

<style></style>
