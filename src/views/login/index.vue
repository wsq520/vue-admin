<template>
  <div class="wrapper">
    <div class="login-container">
      <h2 class="title">校园社团招新系统</h2>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="loginForm.identity">
            <el-radio label="admin">管理员</el-radio>
            <el-radio label="user">用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button plain>注册</el-button>
          <el-button type="primary" plain @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'));
      }
      if (value.length < 3 || value.length > 10) {
        return callback(new Error('账号长度在 3 到 10 个字符'));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      if (value.length < 6 || value.length > 18) {
        return callback(new Error('密码长度在 6 到 18 个字符'));
      }
      callback();
    };
    return {
      loginForm: {
        username: '',
        password: '',
        identity: 'admin' // 默认身份为管理员
      },
      loginRules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
      // 进入首页
      const { username, password, identity} = this.loginForm;
      
      this.$router.push({ path: '/' })
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  //background-image: url('../../assets/bg_imgae.jpg');

  .title {
    text-align: center;
  }

  .login-container {
    width: 400px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #e4e4e4;
    border-radius: 20px;
  }
}

.el-input {
  width: 240px;
}
</style>
