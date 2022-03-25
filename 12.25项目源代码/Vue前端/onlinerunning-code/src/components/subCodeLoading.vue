<template>
  <div class="loading">
    <el-dialog
      title="提示"
      :visible.sync="isShowLoading"
      width="70%"
      :beforeClose="onCloseLoading"
      :closeOnClickModal="false"
      center
    >
      <el-steps :active="LoadingIndex" finish-status="finish" align-center>
        <el-step title="发起任务" icon="el-icon-s-promotion"></el-step>
        <el-step title="任务申请" icon="el-icon-s-claim"></el-step>
        <el-step title="处理任务" icon="el-icon-cpu"></el-step>
        <el-step title="代码运行" icon="el-icon-video-play"></el-step>
        <el-step title="执行完毕" icon="el-icon-check"></el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>

<style>
.loading {
  background-color: white;
  width: 500px;
}
</style>

<script>
export default {
  destroyed() {
    this.stopSetInterval();
  },
  data() {
    return {
      timer: null, // 定时器
      LoadingIndex: 1,
    };
  },
  watch: {
    isShowLoading(val) {
      // 当弹窗被显示则开始轮询
      if (val) {
        // 启动轮询
        this.createSetInterval();
      }
    },
  },
  computed: {
    // 取得是否展示正在处理
    isShowLoading() {
      return this.$store.state.runcode.isShowLoading;
    },
    // 取得任务ID
    taskId() {
      return this.$store.state.runcode.currentTaskId;
    },
  },
  methods: {
    // 关闭后设置处理窗口展示状态
    onCloseLoading() {
      this.$store.commit("runcode/SET_SHOW_LODING", false);
    },
    // 创建轮询获取最新任务状态定时器
    createSetInterval() {
      this.LoadingIndex = 1;
      this.stopSetInterval();
      let _this = this;
      this.timer = setInterval(async () => {
        await _this.$store
          .dispatch("runcode/getCurrentState", _this.taskId)
          .then((CurrentRes) => {
            switch (CurrentRes) {
              case "Queuing":
                this.LoadingIndex = 2;
                break;
              case "Compiling":
                this.LoadingIndex = 3;
                break;
              case "Running":
                this.LoadingIndex = 4;
                break;
              default:
                this.LoadingIndex = 5;
                // 状态结束
                _this.$store
                  .dispatch("runcode/getTaskInfo", _this.taskId)
                  .then((res) => {
                    console.log(res);
                  });
                _this.stopSetInterval();
                _this.onCloseLoading();
            }
          });
      }, 1000);
    },
    // 关闭轮询
    stopSetInterval() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>