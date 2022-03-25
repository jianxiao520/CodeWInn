<template>
  <div class="problem">
    <div style="padding: 30px">
      <el-row :gutter="30">
        <el-col :span="16">
          <!-- 每日题目 -->
          <ProblemList />
        </el-col>
        <el-col :span="8">
          <!-- 右侧用户信息 -->
          <UsreInfo />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 全部问题列表组件
import ProblemList from "./components/ProblemList.vue";
// 用户信息组件
import UsreInfo from "./components/UserInfo.vue";
export default {
  components: {
    ProblemList,
    UsreInfo,
  },
};
</script>