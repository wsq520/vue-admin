<template>
  <div>
    <div class="btn-container">
      <div class="item">
        <span class="label">年级:</span>
        <el-input placeholder="请输入年级(如:2020)" v-model="grade_name" clearable>
        </el-input>
      </div>
      <div class="item">
        <el-button type="primary" plain @click="queryGradeList">查询</el-button>
      </div>
    </div>
    <div class="op-btn">
      <el-popover placement="right" margin-left="50px" width="200" height="200px" v-model="batchDeleteBtnVisible"
        @hide="batchDeleteBtnVisible = false">
        <span>确定删除所选内容吗？</span>
        <div class="btn">
          <el-button size="mini" type="text" @click="batchDeleteBtnVisible = false">取消</el-button>
          <el-button type="primary" size="mini" plain @click="batchDeleteBtnConfirmClick">确定</el-button>
        </div>
        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" plain
          :disabled="btnDisabled">批量删除</el-button>
      </el-popover>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="createDialogVisible = true"
        style="margin-left:10px">新增</el-button>
    </div>
    <div class="list">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        :data="gradeList" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" type="index" width="120" align="center">
        </el-table-column>
        <el-table-column prop="grade_name" label="年级" width="200" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="创建年级" center :visible.sync="createDialogVisible" width="30%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="年级">
          <el-input v-model="createInfo.grade_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fuzzyQueryGradeList, createGrade, deleteGrade } from '../../service/grade';
export default {
  data() {
    return {
      loading: false,
      grade_name: '',
      gradeList: [],
      selectedData: [],
      createDialogVisible: false,
      createInfo: {
        grade_name: ''
      },
      batchDeleteBtnVisible: false
    }
  },
  mounted() {
    this.queryGradeList();
  },
  computed: {
    btnDisabled() {
      return this.selectedData.length <= 0;
    }
  },
  methods: {
    async queryGradeList() {
      this.loading = true;
      const res = await fuzzyQueryGradeList(this.grade_name);
      console.log(res);
      this.gradeList = res.data;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    async createConfirmBtnClick() {
      this.createDialogVisible = false;
      const { grade_name } = this.createInfo;
      const res = await createGrade({
        grade_name
      })
      console.log("res:", res);
      this.createInfo = {
        grade_name: ''
      }
      this.queryGradeList();
      this.$store.dispatch('fetchGrades');
    },
    handleEdit(row) {
      // const { grade_id } = row;
      this.$message.warning("还没做呢！");
    },
    async handleDelete(row) {
      const { grade_id } = row;
      const res = await deleteGrade(grade_id);
      console.log("删除结果：", res);
      this.queryGradeList();
      this.$store.dispatch('fetchGrades');
    },
    async batchDeleteBtnConfirmClick() {
      this.batchDeleteBtnVisible = false;
      for (const item of this.selectedData) {
        const { grade_id } = item;
        await deleteGrade(grade_id);
      }
      this.queryGradeList();
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

.list {
  //min-width: 1200px;
  // overflow-x: scroll;
  margin-top: 20px;
  padding: 0 15px;
}
</style>
