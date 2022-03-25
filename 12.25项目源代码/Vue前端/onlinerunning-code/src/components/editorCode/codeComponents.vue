


<script>
// CodeMirror 库引入主题以及语法检查
import { codemirror } from "vue-codemirror";

// 选中行高亮
import "codemirror/addon/selection/active-line";
// -----------引入所有主题-----------
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/panda-syntax.css";
// -----------引入所有主题-----------

// -----------引入所有语言-----------
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/mode/go/go");
require("codemirror/mode/clike/clike.js");
// -----------引入所有语言-----------

// 引入 vuex
import { mapState } from "vuex";
// 公共样式
import "@/assets/css/public.css";
export default {
  created() {
    this.code = this.editor.snippet;
  },
  methods: {
    onCmCodeChanges(cm) {
      this.$store.commit("editor/SET_EDITOR_SNIPPET", cm.getValue());
    },
  },
  computed: {
    ...mapState(["editor"]),
  },
  components: {
    codemirror,
  },
  watch: {
    // 监控各编辑器状态是否被改变
    "editor.theme": {
      handler(v) {
        this.cmOptions.theme = v;
      },
    },
    "editor.tabLen": {
      handler(v) {
        this.cmOptions.tabSize = v;
      },
    },
    "editor.mode": {
      handler(v) {
        this.cmOptions.mode = v;
      },
    },
    "editor.snippet": {
      handler(v) {
        this.code = v;
      },
    },
  },
  data() {
    return {
      code: "",
      // 配置 code-mirror
      cmOptions: {
        tabSize: 2, // 默认制表符大小
        mode: "text/x-python", // 默认语法
        theme: "mdn-like", // 默认主题
        smartIndent: true,
        lineNumbers: true,
        styleActiveLine: true,
      },
    };
  },
};
</script>


<style>
.CodeMirror {
  line-height: 120%;
  height: 100%;
}
</style>

<template>
  <div style="height: calc(100% - 57px)">
    <codemirror
      ref="mycode"
      :value="code"
      :options="cmOptions"
      @changes="onCmCodeChanges"
      class="code h-100"
      :style="{ fontSize: editor.fontSize + 'px' }"
    >
    </codemirror>
  </div>
</template>