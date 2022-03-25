<template>
  <el-popover placement="bottom" width="260" trigger="click">
    <div style="text-align: left; margin: 0">
      <h4>通用</h4>
      <hr />
      <el-row :gutter="20" style="padding-top: 10px">
        <el-col :span="12" :offset="0">
          <h5 class="paddingbottom">
            <icon name="font" class="MenuFont"></icon>字体大小
          </h5>
          <el-slider
            :value="editor.fontSize"
            :format-tooltip="ChangeSlider"
            :min="12"
            :max="32"
            size="mini"
          ></el-slider>
        </el-col>
        <el-col :span="12" :offset="0">
          <h5 class="paddingbottom">
            <icon name="gamepad" class="MenuFont"></icon>主题
          </h5>
          <el-select
            :value="editor.theme"
            placeholder="请选择"
            size="mini"
            @change="SelectTheme"
          >
            <el-option
              v-for="item in options_.Themes"
              :key="item.value"
              :label="item.key"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-top: 20px">
        <el-col :span="12" :offset="0">
          <h5 class="paddingbottom">
            <icon name="outdent" class="MenuFont"></icon>Tab 长度
          </h5>
          <el-select
            :value="editor.tabLen"
            placeholder="请选择"
            size="mini"
            @change="SelectTablen"
          >
            <el-option
              v-for="item in options_.TabLen"
              :key="item.value"
              :label="item.key"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <!-- 设置 -->
    <el-button
      icon="el-icon-s-tools"
      size="medium"
      class="MenuButton"
      circle
      slot="reference"
    ></el-button>
  </el-popover>
</template>

<style >
.MenuButton {
  margin-left: 10px;
  float: right;
}
/* 滑动条调整 */
.el-slider__runway {
  margin: 11px 0;
}

.paddingbottom {
  padding-bottom: 15px;
}
.MenuFont {
  padding-right: 7px;
}
</style>

<script>
// 引入 vuex
import { mapState } from "vuex";
// 导入设置列表
import SettingList from "./data/Menu";

export default {
  computed: {
    ...mapState(["editor"]),
  },
  methods: {
    ChangeSlider(val) {
      this.$store.commit("editor/SET_EDITOR_FONTSIZE", val);
    },
    SelectTheme(val) {
      this.$store.commit("editor/SET_EDITOR_THEME", val);
    },
    SelectTablen(val) {
      this.$store.commit("editor/SET_EDITOR_TABLEN", val);
    },
  },
  data() {
    return {
      options_: SettingList,
    };
  },
};
</script>