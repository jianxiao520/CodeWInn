<template>
  <div class="description-content">
    <div class="answer-header">
      <h2 style="margin-bottom: 5px">{{ problem.pid }}.{{ problem.title }}</h2>
      <div class="answer-header-description">
        <el-tag
          size="mini"
          class="mr-40"
          :type="
            problem.difficulty === '简单'
              ? 'success'
              : problem.difficulty === '中等'
              ? 'warning'
              : 'danger'
          "
          >{{ problem.difficulty }}</el-tag
        >

        <span class="mr-40"
          ><i class="el-icon-user"></i>提交人数:
          {{ problem.amountCompleted }}</span
        >
        <span class="mr-40"
          ><i class="el-icon-time"></i>时间限制: {{ problem.timeLimit }}秒</span
        >
      </div>
    </div>
    <div class="answer-content" v-html="problem.html"></div>
  </div>
</template>
<style >
.answer-content > h2 {
  padding: 24px 0;
}
</style>

<style scoped>
.description-content {
  display: flex;
  flex-direction: column;
  margin-left: 22px;
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 135px);
}

.description-content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.description-content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 5px rgb(253 253 253 / 0%); */
  background: #d7d7d7;
}
.description-content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgb(0 0 0 / 20%); */
  border-radius: 10px;
  background: #f9f7f799;
}

.answer-header {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 10px;
}
.answer-header-description {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.answer-header-description > span {
  font-size: 14px;
}
</style>

<script>
import "@/assets/css/public.css";
// 用户状态模块
import { getProblemInfo } from "@/service/codeService";
export default {
  data() {
    return {
      problem: {
        pid: "",
        title: "89.最长回文子串",
        difficulty: "容易",
        amountCompleted: "128",
        timelimit: "1",
        html: "<h1>HHHH</h1>",
      },
    };
  },
  created() {
    // 获取
    getProblemInfo(this.problemId).then((res) => {
      // 内容渲染更新
      console.log(res);
      this.problem = res.data.message;
    });
  },
  computed: {
    problemId() {
      return this.$store.state.runcode.problemId;
    },
  },
};
</script>