<template>
  <div>
    <div style="text-align: center">
      <img alt="Vue logo" src="@/assets/Logo_01.png" class="Logo" />
    </div>
    <hr class="hr-class" />
    <LoginCom v-if="isLogin" />
    <RegisterCom v-else />
    <div class="goTo" v-if="isLogin">
      还没有账户？ <span @click="isLogin = false">注册</span>
    </div>
    <div class="goTo" v-else>
      有账号了还想注册？ <span @click="isLogin = true">登陆</span>
    </div>
  </div>
</template>

<style scoped>
/* 调整Logo大小 */
.Logo {
  width: 120px;
}
.hr-class {
  margin-bottom: 20px;
  border: none;
  height: 1px;
  background-color: #e5e5e5;
}
.goTo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.goTo > span {
  color: #6d94dd;
  cursor: pointer;
}
</style>

<style>
.el-input__icon {
  font-size: 20px !important;
}
.el-dialog__body {
  padding: 25px 32px !important;
}
.el-dialog__header {
  padding: 10px 20px 10px !important;
}
/* 修改 elementUI 勾选框颜色 */
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #5aad30 !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #5aad30 !important;
  border-color: #5aad30 !important;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #5aad30 !important;
}
.el-checkbox__inner:hover {
  border-color: #5aad30 !important;
}
</style>

<script>
// 登陆组件
import LoginCom from "./components/LoginCom.vue";
// 注册组件
import RegisterCom from "./components/RegisterCom.vue";
export default {
  // 组件注册
  components: {
    LoginCom,
    RegisterCom,
  },
  data() {
    return {
      isLogin: true,
    };
  },
};
</script>