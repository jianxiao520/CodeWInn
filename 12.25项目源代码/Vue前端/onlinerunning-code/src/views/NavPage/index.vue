<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isShrinkSidebar"
    router
  >
    <div class="ImageLogo">
      <img
        alt="Vue logo"
        :src="isShrinkSidebar ? Logo_2 : Logo_1"
        class="Logo"
        :style="isShrinkSidebar ? { width: '45px' } : { width: '120px' }"
      />
    </div>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/problem">
      <i class="el-icon-s-marketing"></i>
      <span slot="title">训练题库</span>
    </el-menu-item>
    <el-menu-item index="/coding">
      <i class="el-icon-s-flag"></i>
      <span slot="title">运行测试</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <i class="el-icon-s-comment"></i>
      <span slot="title">社区</span>
    </el-menu-item>
    <el-submenu index="/me">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>我的</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-2">文章</el-menu-item>
        <el-menu-item index="1-1">评测记录</el-menu-item>
        <el-menu-item @click="setDialogVisible">{{
          isLogin ? "退出登陆" : "登陆"
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 弹出登陆框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
      :before-close="closeLogin"
      :close-on-click-modal="false"
    >
      <AccountPage />
    </el-dialog>
  </el-menu>
</template>



<script>
import AccountPage from "../AccountPage/index.vue";

export default {
  components: { AccountPage },
  data() {
    return {
      Logo_1: require("@/assets/Logo_01.png"),
      Logo_2: require("@/assets/logo.png"),
    };
  },
  computed: {
    // 左侧导航栏展开状态
    dialogVisible() {
      return this.$store.state.global.isSdialogVisible;
    },
    isShrinkSidebar() {
      return this.$store.state.global.isShrinkSidebar;
    },
    isLogin() {
      return this.$store.state.user.isAuthenticated;
    },
  },
  methods: {
    // 设置左侧导航栏展开状态 或 退出登陆
    setDialogVisible() {
      if (this.isLogin) {
        localStorage.removeItem("userToken");
        this.$store.commit("user/SET_LOGIN_FAIL");
      } else {
        this.$store.commit("global/SET_SDIALOG_VALUE", true);
      }
    },
    // 设置关闭登陆弹出框状态
    closeLogin() {
      this.$store.commit("global/SET_SDIALOG_VALUE", false);
    },
  },
};
</script>

<style scoped>
* {
  font-weight: 900;
}
/* 图标大小 */
i {
  font-size: 34px !important;
}
/* 菜单内容 */
span {
  padding-left: 16px;
  font-size: 16px;
}
</style>
<style>
.el-menu {
  height: 100%;
}

/* 调整Logo大小 */
.ImageLogo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.Logo {
  /* width: 120px; */
  padding-top: 10px;
  padding-bottom: 20px;
}
</style>