<template>
  <div>
    <!-- 三级联动组件------已经注册为全局组件,不需要引入直接使用 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },

  mounted() {
    this.$store.dispatch('getFloorList')
    // 获取用户信息在首页展示
    // this.$store.dispatch('getUserInfo')
  },
}
</script>

<style></style>
