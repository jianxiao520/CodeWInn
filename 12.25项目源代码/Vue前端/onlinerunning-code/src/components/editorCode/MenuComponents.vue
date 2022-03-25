<template>
  <!-- 代码编辑器工具栏 -->
  <div class="CodeToolbar">
    <el-button type="success" round size="medium" @click="subCode">
      <i class="el-icon-caret-right"></i> 执行代码 &nbsp;
    </el-button>

    <!-- 设置弹出框 -->
    <Popover />

    <!-- 还原代码 -->
    <el-button
      icon="el-icon-refresh-right"
      size="medium"
      class="MenuButton"
      circle
    ></el-button>

    <!-- 下载代码 -->
    <el-button
      icon="el-icon-download"
      size="medium"
      class="MenuButton"
      circle
    ></el-button>

    <!-- 代码语言环境下拉框 -->
    <el-select
      :value="editor.lang"
      placeholder="请选择"
      class="MenuButton selectOption"
      size="medium"
      @change="SelectItem"
    >
      <el-option
        v-for="(item, i) in options"
        :key="i"
        :label="item.lang"
        :value="i"
      >
      </el-option>
    </el-select>

    <subCodeLoading />
    <subResult />
  </div>
</template>

<style>
/* 工具栏 */
.CodeToolbar {
  padding: 10px;
  border-bottom: 1px solid #ededed;
  background-color: white;
}

/* 下拉框 */
.selectOption {
  width: 120px;
}

/* 横线 */
hr {
  background-color: #f3f3f6;
  height: 1px;
  border: none;
}

/* 菜单中按钮 */
.MenuButton {
  margin-left: 10px;
  float: right;
}
</style>

<script>
// 弹出框引入
import Popover from "./PopoverComponents.vue";
// 引入 vuex
import { mapState } from "vuex";
// 导入设置列表
import SettingList from "./data/Menu";
// 状态显示弹出框
import subCodeLoading from "@/components/subCodeLoading.vue";
// 结果显示弹出框
import subResult from "@/components/subResult.vue";
export default {
  components: {
    Popover,
    subCodeLoading,
    subResult,
  },
  computed: {
    // 编辑器状态
    ...mapState(["editor"]),
    ...mapState(["runcode"]),
  },
  data() {
    return {
      Refresh: false,
      options: [
        {
          lang: undefined,
          snippet: undefined,
          mode: undefined,
        },
      ],
    };
  },
  created() {
    this.options = SettingList.Lang;
    // 渲染语言列表数据
    this.$store.commit("editor/SET_EDITOR_LANG", this.options[0].lang);
    this.$store.commit("editor/SET_EDITOR_SNIPPET", this.options[0].snippet);
  },

  methods: {
    // 提交代码
    subCode() {
      // this.$store.commit("runcode/SET_SHOW_RESULT");
      let runObject = {};
      runObject.userCode = this.$Base64Util.Base64encode(this.editor.snippet);
      runObject.lang = this.runcode.lang;
      // 判断提交代码的类型，若为自测类型则需要另外附加自定义输入
      if (!this.runcode.isSubmitProblem) {
        runObject.CustomInput = this.$Base64Util.Base64encode(
          this.runcode.customInput
        );
      }
      // 触发actions发送请求，下面的dispatch路径则根据是否为自测类型进行判断
      this.$store
        .dispatch(
          `runcode/${
            this.runcode.isSubmitProblem ? "submitCodeJudge" : "submitCode"
          }`,
          runObject
        )
        .then(
          () => {
            this.$store.commit("runcode/SET_SHOW_LODING", true);
          },
          (error) => {
            this.$notify.error({
              title: "运行失败",
              message: error.message,
              position: "top-left",
            });
          }
        );
    },
    // 选择相对应的语言处理 -> [ 展示默认代码、清空运行环境 ]
    SelectItem(value) {
      // 展示对应语言默认代码
      this.$store.commit(
        "editor/SET_EDITOR_SNIPPET",
        this.options[value].snippet
      );

      // 设置在运行类 state 中
      this.$store.commit("runcode/SET_LANG", this.options[value].lang);

      // 设置当前选中项
      this.$store.commit("editor/SET_EDITOR_LANG", this.options[value].lang);

      // 设置当前语言环境
      this.$store.commit("editor/SET_EDITOR_MODE", this.options[value].mode);
    },

    // 刷新编辑器内容 (以更新编辑器内容使其自动刷新样式)
    RefreshEdit() {
      this.Refresh = true;
      let content = this.editor.snippet;
      this.$store.commit("editor/SET_EDITOR_SNIPPET", content + " ");
      setTimeout(() => {
        this.$store.commit("editor/SET_EDITOR_SNIPPET", content);
        this.Refresh = false;
      }, 0);
    },
  },

  watch: {
    // 滑动条改变文字大小后刷新编辑器展示
    "editor.fontSize": {
      handler() {
        if (!this.Refresh) this.RefreshEdit();
      },
    },
  },
};
</script>