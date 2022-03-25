<template>
  <div style="height: 100%; background: #002833; padding-top: 50px">
    <div id="terminal" ref="terminal"></div>
  </div>
</template>


<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import "xterm/css/xterm.css";

export default {
  data() {
    return {
      shllWs: "",
      term: "",
      rows: 40,
      cols: 100,
      newData: "",
    };
  },
  created() {
    this.wsShell();
  },
  mounted() {
    let _this = this;

    let term = new Terminal({
      rendererType: "canvas", //渲染类型
      rows: parseInt(_this.rows), //行数
      cols: parseInt(_this.cols), // 不指定行数，自动回车后光标从下一行开始
      convertEol: true, //启用时，光标将设置为下一行的开头
      disableStdin: false, //是否应禁用输入。
      cursorStyle: "underline", //光标样式
      cursorBlink: true, //光标闪烁
      theme: {
        foreground: "#7e9192", //字体
        background: "#002833", //背景色
        cursor: "help", //设置光标
        lineHeight: 16,
      },
    });

    // 创建terminal实例
    term.open(this.$refs["terminal"]);

    // 定义新行初始文本
    term.prompt = () => {
      term.write("\r\n$ ");
    };
    term.prompt();

    // // canvas背景全屏
    var fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    // Terminal 配置以及事件处理
    function runFakeTerminal(_this) {
      if (term._initialized) {
        return;
      }

      // 格式化发送的数据
      term.formatOrder = (Data) => {
        return {
          Data: Data,
          Op: "stdin",
        };
      };

      // 初始化
      term._initialized = true;

      // 欢迎语
      term.writeln("Welcome to use Superman. ");
      term.writeln(
        `This is Web Terminal of pod\x1B[1;3;31m \x1B[0m in namespace\x1B[1;3;31m \x1B[0m`
      );
      term.prompt();

      term.onData(function (key) {
        // 先写入方便监控按键使用
        _this.newData = key;
      });

      // 监听 Ctrl + v 事件
      term.attachCustomKeyEventHandler(function (ev) {
        if (ev.key == "v" && (ev.metaKey == true || ev.ctrlKey == true)) {
          setTimeout(() => {
            _this.onSend(term.formatOrder(_this.newData));
          }, 10);
        }
      });

      // 监控输入的字符
      term.onKey((e) => {
        var order = term.formatOrder(e.key);
        if (e.domEvent.keyCode === 8) {
          if (term._core.buffer.x > 2) {
            // delete键
            order = term.formatOrder("\b \b");
          }
        }
        _this.onSend(order);
      });

      _this.term = term;
    }

    runFakeTerminal(_this);
  },
  methods: {
    wsShell() {
      const _this = this;
      this.ws = new WebSocket("ws://localhost:8181");

      // 消息监听
      this.ws.onmessage = (Msg) => {
        if (Msg) {
          _this.term.write(Msg.data);
        }
      };
    },
    onSend(data) {
      // 发送消息
      data = this.isObject(data) ? JSON.stringify(data) : data;
      data = this.isArray(data) ? data.toString() : data;
      data = data.replace(/\\\\/, "\\");
      this.ws.send(data);
    },
    isObject(val) {
      return val != null && typeof val === "object";
    },
    isArray(val) {
      return Array.isArray(val);
    },
  },
};
</script>