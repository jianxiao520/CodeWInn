<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="username" label-width="0px">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
          prefix-icon="el-icon-s-custom"
          placeholder="请输入您的邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0px">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          prefix-icon="el-icon-s-finance"
          placeholder="请输入您的密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked">记住我</el-checkbox>

      <el-form-item label-width="0px" style="margin-top: 10px">
        <el-button
          type="success"
          style="width: 100%"
          @click="submitForm('ruleForm')"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      checked: false,
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        // 邮箱输入规则
        username: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱",
          },
        ],
        // 密码输入规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, message: "密码名至少4位" },
          { max: 20, message: "密码最多20位" },
        ],
      },
    };
  },
  methods: {
    // 提交表达 - 登陆
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/login", this.$refs[formName].model).then(
            () => {
              this.$message({
                message: "登陆成功",
                type: "success",
              });
              // 跳至首页
              this.$router.push("/");
              // 设置弹出窗关闭
              this.$store.commit("global/SET_SDIALOG_VALUE", false);
            },
            (error) => {
              this.$message.error(error);
            }
          );
        } else {
          this.$message({
            message: "请正确填写账号密码!",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>