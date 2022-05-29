<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{ categoryList }}</h1> -->
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search"
                        >{{ c2.categoryName }}
                      </router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{
                          c3.categoryName
                        }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 按需引入节流模块(默认导出,不需要加花括号)
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  // 组件挂在完毕,向服务器发请求
  data() {
    return {
      currentIndex: -1,
      show: true,
    }
  },
  methods: {
    // 为鼠标进入事件设置节流,throttle函数别用箭头寒素,可能出现this问题
    changeIndex: throttle(function (index) {
      // 鼠标移上某个一级分类的index
      // 正常情况:操作很慢,鼠标进入每一个一级分类,都会触发鼠标进入事件
      // 异常情况 :操作很快,鼠标进入每一个一级分类,但只有部分触发
      // 浏览器反应不过来,当前回调有一些大量业务,就会出现卡顿现象
      // console.log(index)
      this.currentIndex = index
    }, 50),
    leaveShow() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    goSearch(event) {
      // 编程式导航 + 事件委派
      // 存在问题,事件委派,把全部子系欸但的事件委派给父节点,如何确定点击的是a标签
      //  如何确定点击的是几级导航

      let element = event.target
      // 自定义属性时大写,但在dataset中是小写,所以引入是要去掉驼峰
      let { categoryname, category1id, category2id, category3id } =
        element.dataset

      if (categoryname) {
        // 整理路由跳转的参数
        // 要跳转的路由名称
        let location = { name: 'search' }
        // 选中的产品名称
        let query = { categoryName: categoryname }

        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          // console.log(location)
        }

        this.$router.push(location)
        // 最终实现的结果是
        // this.$router.push({name:'search,query:{categoryName:categoryName,category某Id:category某Id}})
      }
    },
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
  },
  mounted() {
    // 每次跳转都要发一次数据请求,效率不高,影响性能,所以将请求放到App根组件中,只发送一次
    // this.$store.dispatch('categoryList')
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧需要一个函数,当使用这个计算属性时,就会调用这个函数
      categoryList: (state) => {
        // console.log(state)
        return state.home.categoryList
      },
    }),
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画的开始装填
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);
    }
    // 过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画的时间,速率
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
