<template>
  <el-tabs
    v-model="activeName"
    type="card"
    @tab-click="handleClick"
    class="AnswerTabs"
  >
    <el-tab-pane label="题目描述" name="first">
      <!-- 题目详细组件 -->
      <DescriptionCom />
    </el-tab-pane>
    <el-tab-pane label="评论/题解" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="提交记录" name="third">角色管理</el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.AnswerTabs {
  background-color: white;
  height: 100%;
  padding-top: 16px;
}
</style>

<script>
// 题目详细组件引入
import DescriptionCom from "./DescriptionCom.vue";
export default {
  data() {
    return {
      // 标签页切换
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    DescriptionCom,
  },
};
</script>