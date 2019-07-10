<template>
  <div @keyup.enter="submit">
    <el-form :model="model" :rules="rules" ref="login" class="login">
      <h3 class="title">后台管理登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="model.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="model.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" :loading="loading" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../apis/login";

export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    submit() {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.loading = true;
          login(this.model.username, this.model.password).then(resp => {
            this.loading = false;
            if (resp.ok) {
              this.success("登录成功");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  margin: 0 auto;
  margin-top: 100px;
  max-width: 350px;
  padding: 35px 35px 15px 35px;

  .title {
    margin: 0px auto 40px auto;
    font-size: 30px;
    text-align: center;
    color: #505458;
  }
}
</style>

