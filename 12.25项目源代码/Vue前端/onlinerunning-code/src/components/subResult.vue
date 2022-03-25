<template>
  <el-dialog
    :visible.sync="isShowResult"
    width="40%"
    center
    :before-close="closeLogin"
    :close-on-click-modal="false"
  >
    <i
      :class="isAc ? 'el-icon-success' : 'el-icon-error'"
      style="font-size: 78px"
      :style="{ color: setColor }"
    ></i>
    <br />
    <span class="Result" :style="{ color: setColor }">{{ result }}</span>
    <div class="resultInfo">
      <div class="resultContent">
        <div class="time">运行时间: {{ runcode.submitResult.runTime }}ms</div>
        <div>
          速度超过 <strong style="color: red">62.13%</strong> 提交的代码
        </div>
      </div>
      <i class="el-icon-time Result"></i>
    </div>

    <div class="resultOut">
      <div class="time">运行结果</div>
      <el-input
        type="textarea"
        :rows="10"
        resize="none"
        :value="userOut"
      ></el-input>
    </div>
  </el-dialog>
</template>

<style>
.el-dialog__body {
  text-align: center !important;
}
</style>

<style scoped>
.Result {
  font-size: 36px;
  font-weight: 800;
}
.resultInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  padding-top: 53px;
}
.resultContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.time {
  font-size: 18px;
  font-weight: 800;
}
.resultOut {
  padding-top: 20px;
  width: 87%;
  margin: 16px auto;
  border-top: 1px solid #ddd;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    closeLogin() {
      this.$store.commit("runcode/SET_CLOSE_RESULT");
    },
  },
  computed: {
    ...mapState(["runcode"]),
    isShowResult() {
      return this.runcode.isShowResult;
    },
    result() {
      return this.runcode.submitResult.outTitle;
    },
    isAc() {
      return this.runcode.submitResult.outTitle == "Accepted" ? true : false;
    },
    userOut() {
      return this.runcode.submitResult.userOut;
    },
    setColor() {
      return this.isAc ? "#6ac140" : "#e35048";
    },
  },
};
</script>