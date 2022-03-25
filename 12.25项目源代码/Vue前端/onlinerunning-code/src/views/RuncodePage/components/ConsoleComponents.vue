<template>
  <div class="terminal h-100">
    <div class="console-header">
      <div>
        <el-button type="info" round size="small" @click="onClear"
          >清除终端</el-button
        >
      </div>
    </div>
    <div class="console-out" id="new_message">
      <div
        class="console-body"
        v-for="item in consoleOutPutList"
        :key="item.id"
      >
        <span
          class="outTitle"
          :style="{ color: item.isSuccess ? '' : 'red' }"
          >{{ item.outTitle }}</span
        >
        <el-tag type="success" size="mini">{{ item.runTime }}ms</el-tag>
        <el-tag type="info" effect="plain" size="mini">
          {{ item.time.replace("T", " ") }}
        </el-tag>
        <div class="out" :style="{ color: item.isSuccess ? '' : 'red' }">
          {{ $Base64Util.Base64decode(item.userOut) }}
        </div>
      </div>
    </div>
    <div>
      <div class="CustomTitle">
        <el-switch v-model="value1" active-text="传输入" inactive-text="仅运行">
        </el-switch>
      </div>
      <el-input
        type="textarea"
        placeholder="程序重定向输入："
        v-model="textarea"
        show-word-limit
        :value="textarea"
        resize="none"
        :disabled="!value1"
      >
      </el-input>
    </div>
  </div>
</template>

<style>
.outText {
  font-weight: 500;
  font-size: 16px;
  color: rgb(0 0 0 / 51%);
}
.console-header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.console-body {
  padding: 10px;
}
.outTitle {
  font-size: 20px;
  font-weight: 500;
  color: #78b43a;
  padding-right: 15px;
}
.out {
  /* 识别换行符 */
  white-space: pre-line;
  padding-top: 10px;
}
.console-out {
  height: calc(80% - 70px);
  overflow: hidden;
  overflow-y: scroll;
}
.el-textarea__inner {
  height: calc(20vh - 10px);
}
.terminal {
  background-color: #f5f5f5;
  box-shadow: inset 2px -9px 5px 0px #bdbdbd52;
}

.CustomTitle {
  padding-left: 10px;
  height: 32px;
  line-height: 32px;
  background-color: white;
  box-shadow: 0px -2px 2px 0px #ddd;
}
</style>

<script>
export default {
  computed: {
    // 用户执行输出
    consoleOutPutList() {
      return this.$store.state.runcode.consoleOutPutList;
    },
  },
  data() {
    return {
      textarea: "",
      value1: false,
    };
  },
  methods: {
    onClear() {
      this.$store.commit("runcode/CLEAR_OUTPUT_MESSAGE");
    },
  },
  watch: {
    textarea(val) {
      this.$store.commit("runcode/SET_CUSTOM_INPUT", val);
    },
    // 当有新数据加入时，保持滑动条在最下方
    consoleOutPutList() {
      setTimeout(() => {
        var container = this.$el.querySelector("#new_message");
        container.scrollTop = container.scrollHeight;
      }, 0); // 排队等插入完毕最后再置列表高度
    },
  },
};
</script>