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
          placeholder="请输入注册所需的邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0px">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          prefix-icon="el-icon-s-finance"
          placeholder="请输入注册所需的密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label-width="0px">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          prefix-icon="el-icon-s-finance"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked">记住我</el-checkbox>

      <el-form-item label-width="0px" style="margin-top: 10px">
        <el-button
          type="success"
          style="width: 100%"
          @click="submitForm('ruleForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :append-to-body="true"
    >
      <el-result icon="success" title="成功" subTitle="请前往您的邮箱激活账户">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="$router.go(0)"
            >首页</el-button
          >
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    // 检验确认密码框
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      checked: false,
      dialogVisible: false,
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        // 邮箱框输入规则
        username: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱",
          },
        ],
        // 密码框输入规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, message: "密码名至少4位" },
          { max: 20, message: "密码最多20位" },
        ],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交方法 - 提交注册
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("user/register", this.$refs[formName].model)
            .then(
              () => {
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.dialogVisible = true;
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