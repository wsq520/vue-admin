<template>
  <div>
    <div class="btn-container">
      <div class="item">
        <span class="label">年级:</span>
        <el-input placeholder="请输入年级(如:2020)" v-model="grade_name" clearable>
        </el-input>
      </div>
      <div class="item">
        <span class="label">学院:</span>
        <el-input placeholder="请输入学院(如:信科院)" v-model="college_name" clearable>
        </el-input>
      </div>
      <div class="item">
        <el-button type="primary" plain @click="queryCollegeList">查询</el-button>
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
        <el-table-column prop="college_name" label="学院" width="200" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="创建学院" center :visible.sync="createDialogVisible" width="30%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="年级">
          <el-select v-model="createInfo.grade_name" clearable placeholder="请选择年级">
            <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-input v-model="createInfo.grade_name"></el-input> -->
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="createInfo.college_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑学院" center :visible.sync="editDialogVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="年级">
          <!-- <el-select v-model="editInfo.grade_name" clearable placeholder="请选择年级">
            <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <el-input v-model="editInfo.grade_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="editInfo.college_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fuzzyQueryCollegeList, createCollege, deleteCollege, updateCollege } from '../../service/college';
export default {
  data() {
    return {
      loading: false,
      grade_name: '',
      college_name: '',
      gradeList: [],
      selectedData: [],
      createDialogVisible: false,
      createInfo: {
        college_name: '',
        grade_name: '',
      },
      batchDeleteBtnVisible: false,
      editInfo: {},
      editDialogVisible: false,
    }
  },
  mounted() {
    this.queryCollegeList();
  },
  computed: {
    btnDisabled() {
      return this.selectedData.length <= 0;
    },
    gradeOptions() {
      return this.$store.state.gradeOptions;
    }
  },
  methods: {
    async queryCollegeList() {
      this.loading = true;
      // console.log("当前搜索参数：", this.grade_name, this.college_name);
      const res = await fuzzyQueryCollegeList(this.grade_name, this.college_name);
      console.log(res);
      this.gradeList = res.data;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    async createCollegeAPI(param) {
      const res = await createCollege(param);
      console.log("创建结果：", res);
      this.queryCollegeList();
    },
    // 确定创建
    async createConfirmBtnClick() {
      this.createDialogVisible = false;
      const { college_name, grade_name } = this.createInfo;
      let grade_id = null;
      for (const item of this.$store.state.grades) {
        if (item.grade_name === grade_name) {
          grade_id = item.grade_id;
        }
      }
      // console.log(college_name, grade_name, grade_id);
      this.createInfo = {
        college_name: '',
        grade_name: ''
      }
      this.createCollegeAPI({ college_name, grade_id });
    },
    async deleteCollegeAPI(college_id) {
      const res = await deleteCollege(college_id);
      console.log("删除结果：", res);
    },
    // 点击删除按钮
    async handleDelete(row) {
      const { college_id } = row;
      await this.deleteCollegeAPI(college_id);
      this.queryCollegeList();
    },
    // 确定批量删除
    async batchDeleteBtnConfirmClick() {
      this.batchDeleteBtnVisible = false;
      for (const item of this.selectedData) {
        const { college_id } = item;
        await deleteCollege(college_id);
      }
      this.queryCollegeList();
    },
    async updateCollegeAPI() {
      const res = await updateCollege();
      console.log("更新结果：", res);
    },
    // 点击编辑按钮
    handleEdit(row) {
      this.editDialogVisible = true;
      this.editInfo = { ...row };
    },
    async editConfirmBtnClick() {
      const { college_id, college_name } = this.editInfo;
      await this.updateCollegeAPI({ college_id, college_name });
      this.queryCollegeList();
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
