
<template>
  <div class="home">
    <div style="padding: 30px">
      <el-row :gutter="30">
        <el-col :span="16">
          <!-- 每日题目 -->
          <DailyTopic />
          <!-- 项目简介 -->
          <ProjectOverview />
        </el-col>
        <el-col :span="8">
          <!-- 用户排行 -->
          <RankingList />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
.home {
  height: 100%;
  background-color: antiquewhite;
}
</style>

<script>
// 引入组件
// ...
// 每日推荐题目组件
import DailyTopic from "./components/DailyTopic.vue";
// 用户排行组件
import RankingList from "./components/RankingList.vue";
// 项目介绍组件
import ProjectOverview from "./components/ProjectOverview.vue";
export default {
  name: "Home",
  components: {
    DailyTopic,
    RankingList,
    ProjectOverview
  },
};
</script>
