<template>
  <div>
    <div class="btn-container">
      <div class="item">
        <span class="label">学院:</span>
        <el-input placeholder="请输入学院(如:信科院)" v-model="college" clearable>
        </el-input>
      </div>
      <div class="item">
        <el-button type="primary" plain>查询</el-button>
      </div>
    </div>
    <div class="op-btn">
      <el-button type="primary" icon="el-icon-plus" size="medium">新增</el-button>
    </div>
    <div class="table">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="data"
        border style="width: 100%">
        <el-table-column label="序号" type="index" width="120" align="center">
        </el-table-column>
        <!-- <el-table-column prop="account" label="注册账号" width="130" align="center">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="130" align="center">
      </el-table-column> -->
        <!-- <el-table-column prop="content" label="内容" width="110" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain @click="queryContentDetail(scope.row)">内容详情</el-button>
        </template>
      </el-table-column> -->
        <el-table-column prop="status" label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="success" v-if="scope.row.status === 1">通过</el-button>
          <el-button size="mini" type="primary" plain v-if="scope.row.status === 0">待审核</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.status === 2">拒绝</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<!-- v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" -->
<!--       setTimeout(() => {
        this.loading = false;
      }, 300); -->

      <!-- <el-date-picker type="date" foramt="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="gonggaoInfo.publishtime" style="width: 100%;"></el-date-picker> -->
<script>
export default {
  data() {
    return {
      data: []
    }
  }
}
</script>

<style  scoped>
.el-input {
  width: 200px;
}

.btn-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 50px;
  margin-top: 20px;

  .item {
    width: 33%;

    .label {
      font-size: 14px;
      padding-right: 5px;
    }
  }
}
</style>
