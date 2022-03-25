<template>
  <div class="navbar">
    <div class="navbar-minmize" @click="Tominmize">
      <i class="el-icon-caret-left"></i>
    </div>
    <h2 style="color: #e3c6a1">码虫客栈</h2>
    <div class="navbar-wrapper">
      <el-input
        placeholder="输入题目ID"
        v-model="inputToId"
        style="width: 220px"
        class="spacing"
        size="small"
      >
        <el-button slot="append" icon="el-icon-s-promotion"></el-button>
      </el-input>
      <!-- 题目跳转 -->
      <el-input
        placeholder="搜索题目"
        v-model="inputToTitle"
        style="width: 420px"
        class="spacing"
        size="small"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div>{{ user.isAuthenticated ? user.userInfo.Email : "未登陆" }}</div>
      <el-dropdown style="padding-left: 20px; padding-right: 20px">
        <span class="el-dropdown-link">
          <i class="el-icon-message-solid" style="font-size: 30px"></i>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>系统消息</el-dropdown-item>
          <el-dropdown-item>站内邮件</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  height: 60px;
  box-shadow: 0 3px 5px 0px #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  z-index: 999;
  position: sticky;
  top: 0;
}

.navbar-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #15ba47;
}
.spacing {
  padding-right: 20px;
}

.navbar-minmize {
  line-height: 60px;
  text-align: center;
  font-size: 40px;
  width: 40px;
  color: #2c3e50;
  transition: all 0.2s;
  cursor: pointer;
}
.navbar-minmize:hover {
  background-color: #7f8489;
  color: aliceblue;
}
</style>

<script>
// 引入 vuex
import { mapState } from "vuex";
export default {
  data() {
    return {
      inputToId: "",
      inputToTitle: "",
    };
  },
  computed: {
    // 编辑器状态
    ...mapState(["user"]),
    isShrinkSidebar() {
      return this.$store.state.global.isShrinkSidebar;
    },
  },
  methods: {
    Tominmize() {
      this.$store.commit("global/SET_SIDEBAR_VALUE", !this.isShrinkSidebar);
    },
  },
};
</script>