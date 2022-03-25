
<script>
// 代码编辑器
import Code from "@/components/editorCode/codeComponents.vue";
// 代码菜单栏
import Menu from "@/components/editorCode/MenuComponents.vue";
// 右侧终端
import Terminal from "./components/ConsoleComponents.vue";
// 公共样式
import "@/assets/css/public.css";
// 引入 vuex
import { mapState } from "vuex";
// 导入组件
import { ShrinkSidebarUpdate, dragControllerDiv } from "@/utils/Drag/index.js";

export default {
  computed: {
    ...mapState(["global"]),
  },
  components: {
    Code,
    Menu,
    Terminal,
  },
  mounted() {
    dragControllerDiv();
  },
  created() {
    this.$store.commit("runcode/SET_PROBLEM_SELF_TEST");
  },
  watch: {
    "global.isShrinkSidebar": {
      handler() {
        // 当侧边栏宽度发生改变
        ShrinkSidebarUpdate();
      },
    },
  },
};
</script>

<template>
  <div class="globalContent">
    <!-- 左侧代码编辑区 -->
    <div class="h-100 left">
      <div class="CodeEdit h-100">
        <!-- 代码菜单栏 -->
        <Menu />

        <!-- 代码编辑器 -->
        <Code />
      </div>
    </div>

    <!-- 右侧控制台 -->
    <div class="h-100 mid">
      <div class="resize" title="收缩侧边栏">⋮</div>
      <!-- 执行结果输出组件 -->
      <Terminal />
    </div>
  </div>
</template>

<style>
.left {
  width: 60%;
  float: left;
}
.mid {
  width: 40%;
  float: left;
}
.globalContent {
  height: calc(100vh - 60px);
  /* padding-top: 51px; */
  overflow-x: hidden;
  overflow-y: hidden;
}
/*拖拽区div样式*/
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 45%;
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-top: -10px;
  width: 10px;
  height: 50px;
  background-size: cover;
  background-position: center;
  font-size: 32px;
  color: white;
}
</style>
