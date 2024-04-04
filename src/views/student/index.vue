<template>
  <div>
    <div class="btn-container">
      <div class="item">
        <span class="label">名字:</span>
        <el-input placeholder="请输入名字" v-model="name" clearable>
        </el-input>
      </div>
      <div class="item">
        <span class="label">学号:</span>
        <el-input placeholder="请输入学号" v-model="xuehao" clearable>
        </el-input>
      </div>
      <div class="item">
        <span class="label">学院:</span>
        <el-input placeholder="请输入学院" v-model="college" clearable>
        </el-input>
      </div>
      <!-- <div class="item">
        <span class="label">专业:</span>
        <el-input placeholder="请输入专业" v-model="major" clearable>
        </el-input>
      </div> -->
      <div class="item">
        <el-button type="primary" plain @click="queryStudentList">查询</el-button>
      </div>
    </div>
    <div class="op-btn">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="createBtnClick">新增</el-button>
    </div>
    <div class="data_table">
      <el-table :data="studentList" border style="width: 100%">
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column prop="xuehao" label="学号" align="center">
        </el-table-column>
        <el-table-column prop="grade" label="年级" width="100" align="center">
        </el-table-column>
        <el-table-column prop="classname" label="班级" width="100" align="center">
        </el-table-column>
        <el-table-column prop="college" label="学院" width="140" align="center">
        </el-table-column>
        <el-table-column prop="major" label="专业" width="150" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" align="center">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <CreateStudent :show="createStuDialog" @create:student="createStudentApi" @create:cancel="closeCreateDialog">
    </CreateStudent>
    <UpdateStudent :show="updateStuDialog" :studentInfo="updateStudentInfo" @update:student="updateApi"
      @update:cancel="closeUpdateDialog"></UpdateStudent>
  </div>
</template>

<script>
import UpdateStudent from './updateStu.vue';
import CreateStudent from './createStu.vue'
import { fuzzyQueryStudentList, createStudentApi, updateStudentApi, deleteStudentByIdApi } from '../../service/student';
export default {
  components: {
    UpdateStudent,
    CreateStudent
  },
  data() {
    return {
      name: '',
      college: '',
      xuehao:'',
      studentList: [],
      createStuDialog: false,
      updateStuDialog: false,
      update_student_id: null,
      updateStudentInfo: {}
    }
  },
  mounted() {
    fuzzyQueryStudentList({}).then(res => {
      this.studentList = res.data;
    })
  },
  methods: {
    async queryStudentList() {
      // console.log("查询开始~");
      const queryParams = {
        name: this.name,
        xuehao: this.xuehao,
        college: this.college,
        major: this.major
      }
      const res = await fuzzyQueryStudentList(queryParams);
      this.studentList = res.data;
    },
    handleEdit(index, row) {
      // 保存被编辑的学生的id
      this.update_student_id = row.student_id;
      this.updateStuDialog = true;
      this.updateStudentInfo = { ...row };
    },
    async handleDelete(index, row) {
      console.log("删除学生", index, row);
      try {
        const { student_id } = row;
        const res = await deleteStudentByIdApi(student_id);
        console.log(res);
        this.$message.success("删除成功~");
        this.queryStudentList();
      } catch (error) {
        this.$message.error("操作失败~");
      }
    },
    createBtnClick() {
      this.createStuDialog = true;
    },
    // 发请求新增学生信息
    async createStudentApi(studentInfo) {
      try {
        // 发送请求
        const createParams = { ...studentInfo }
        const res = await createStudentApi(createParams);
        console.log(res);
        this.$message.success("创建成功~");
        this.createStuDialog = false;
        this.queryStudentList();
      } catch (error) {
        this.$message.error("创建学生信息失败");
        this.createStuDialog = false;
      }
    },
    closeCreateDialog() {
      this.createStuDialog = false;
    },
    async updateApi(studentInfo) {
      console.log("父组件拿到最新的学生信息", studentInfo);
      try {
        const new_info = { ...studentInfo, student_id: this.update_student_id };
        const res = await updateStudentApi(new_info);
        console.log(res);
        this.updateStuDialog = false;
        this.queryStudentList();
        this.$message.success("修改成功~");
      } catch (error) {
        this.$message.error("修改失败~");
        this.updateStuDialog = false;
      }
    },
    closeUpdateDialog() {
      // console.log("父组件收到子组件关闭弹窗行为");
      this.updateStuDialog = false;
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
