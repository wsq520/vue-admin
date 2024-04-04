<template>
  <div class="table">
    <el-table :data="studentList" border style="width: 100%">
      <el-table-column label="序号" type="index" width="120" align="center">
      </el-table-column>
      <el-table-column prop="grade" label="年级" width="130" align="center">
      </el-table-column>
      <el-table-column prop="college" label="学院" width="130" align="center">
      </el-table-column>
      <el-table-column prop="major" label="专业" width="130" align="center">
      </el-table-column>
      <el-table-column prop="classname" label="班级" width="130" align="center">
      </el-table-column>
      <el-table-column prop="xuehao" label="学号" width="130" align="center">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="130" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="130" align="center">
      </el-table-column>
      <!-- <el-table-column prop="年级" label="grade" width="110" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain @click="queryContentDetail(scope.row)">内容详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    studentList: {
      type: Array,
      default: () => []
    }
  },
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
