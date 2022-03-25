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
      <AnswerContent />
    </div>
  </div>
</template>



<script>
// 代码编辑器
import Code from "@/components/editorCode/codeComponents.vue";
// 代码菜单栏
import Menu from "@/components/editorCode/MenuComponents.vue";

import AnswerContent from "./AnswerContent";

import { ShrinkSidebarUpdate, dragControllerDiv } from "@/utils/Drag/index.js";

// 引入 vuex
import { mapState } from "vuex";
export default {
  created() {
    this.$store.commit("runcode/SET_PROBLEM_SUBMIT");
    this.$store.commit("runcode/SET_PROBLEM_ID", this.pid);
  },
  computed: {
    ...mapState(["global"]),
  },
  components: {
    Code,
    Menu,
    AnswerContent,
  },
  props: ["pid"],
  mounted() {
    dragControllerDiv();
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

<style scoped>
.left {
  width: 40%;
  float: left;
}
.mid {
  width: 60%;
  float: left;
}
.globalContent {
  height: calc(100vh - 60px);
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
  z-index: 999;
}
</style>
