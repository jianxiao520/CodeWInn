<template>
  <div id="app">
    <el-row style="height: 100vh">
      <div
        class="h-100 scroll-y"
        style="position: fixed"
        :class="isShrinkSidebar ? 'ShrinkMenu' : 'ExpandMenu'"
      >
        <!-- 左侧弹出导航栏 -->
        <Nav />
      </div>
      <div
        class="h-100 scroll-y content"
        style="float: right"
        :class="isShrinkSidebar ? 'ShrinkContent' : 'ExpandContent'"
      >
        <NavBar />
        <div class="h-100 main-panel">
          <!-- 路由视图  -->
          <router-view />
        </div>
      </div>
    </el-row>
  </div>
</template>


<script>
// 公共样式
import "@/assets/css/public.css";
// 引入左侧导航栏
import Nav from "./views/NavPage";
// 引入左侧导航栏
import NavBar from "./views/NavPage/navbar.vue";
import { mapState } from "vuex";
export default {
  computed: {
    // 映射左侧弹出导航栏的弹出 State
    isShrinkSidebar() {
      return this.$store.state.global.isShrinkSidebar;
    },
    // 把全局的 State 放到主组件
    // 方便 Vue-devtools 监控状态
    ...mapState(["user", "global", "runcode", "editor"]),
  },
  components: {
    Nav,
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.scroll-y {
  overflow-y: auto;
}
.main-panel {
  max-height: calc(100vh - 60px);
}
.content {
  position: relative;
  background-color: antiquewhite;
}
.ShrinkMenu {
  width: 65px;
}
.ShrinkContent {
  width: calc(100% - 64px);
}

.ExpandMenu {
  width: 241px;
}
.ExpandContent {
  width: calc(100% - 240px);
}
</style>
