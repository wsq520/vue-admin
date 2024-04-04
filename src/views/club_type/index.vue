<template>
  <div>
    <div class="btn-container">
      <div class="item">
        <span class="label">学院:</span>
        <el-input placeholder="请输入类型(如:运动)" v-model="club_type" clearable>
        </el-input>
      </div>
      <div class="item">
        <el-button type="primary" plain @click="queryClubTypeList">查询</el-button>
      </div>
    </div>
    <div class="op-btn">
      <el-button type="primary" icon="el-icon-plus" size="medium">新增</el-button>
    </div>
    <div class="grade_list">
      <el-table :data="club_typeList" border style="width: 100%">
        <el-table-column label="序号" type="index" width="120" align="center">
        </el-table-column>
        <el-table-column prop="club_type" label="社团类型" width="200" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      club_type: '',
      // gradeList: [],
    }
  },
  mounted() {
  },
  computed: {
    club_typeList() {
      // console.log("grade组件List", this.$store.state.club_types);
      return this.$store.state.club_types;
    },
  },
  methods: {
    queryClubTypeList() {
      console.log("grade");
    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {

    }
  }
}
</script>

<style  scoped lang="scss">
.el-input {
  width: 200px;
}

.btn-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 50px;
  margin-top: 20px;

  .item {
    width: 23%;

    .label {
      font-size: 14px;
      padding-right: 5px;
    }
  }
}

.op-btn {
  margin-top: 10px;
  margin-left: 50px;
  //background-color: red;
}

.data_table {
  //min-width: 1200px;
  overflow-x: scroll;
  margin-top: 45px;
  padding: 0 15px;
}
</style>
