<template>
  <div>
    <h1> 管理员自己的主页</h1>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="身份">
        <el-input  placeholder="管理员"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input  placeholder="admin"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input  placeholder="admin"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: '',
      adminInfo: {
        type: '',
        account: 'admin',
        password: 'admin'
      }
    }
  }
}
</script>

<style  scoped></style>
