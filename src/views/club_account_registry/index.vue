<template>
  <div>
    <div class="btn-container">
      <div class="item">
        <span class="label">社团名字:</span>
        <el-input placeholder="请输入社团名字" v-model="club_name" clearable>
        </el-input>
      </div>
      <div class="item">
        <span class="label">社团类型:</span>
        <el-input placeholder="请输入社团类型" v-model="club_type" clearable>
        </el-input>
      </div>
      <div class="item">
        <span class="label">学号:</span>
        <el-input placeholder="请输入学号" v-model="xuehao" clearable>
        </el-input>
      </div>
      <div class="item">
        <span class="label">状态:</span>
        <el-select v-model="queryStatus" placeholder="请选择" clearable>
          <el-option v-for="item in queryStatusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-button type="primary" @click="queryRegistryList">查询</el-button>
      </div>
    </div>
    <div class="op-btn">
      <el-popover placement="right" width="200" v-model="visible" @hide="hideCallback">
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option v-for="item in auditStatusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="btn">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" plain @click="passedAudit">确定</el-button>
        </div>
        <el-button slot="reference" type="primary" icon="el-icon-view" size="mini" plain
          :disabled="btnDisabled">审核</el-button>
      </el-popover>
      <el-popover placement="right" margin-left="50px" width="200" height="200px" v-model="deleteVisible"
        @hide="deleteVisible = false">
        <span>确定删除所选内容吗？</span>
        <div class="btn">
          <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
          <el-button type="primary" size="mini" plain @click="batchDeleteBtnClick">确定</el-button>
        </div>
        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" plain
          :disabled="btnDisabled">批量删除</el-button>
      </el-popover>
    </div>
    <div class="zhaoxin_list">
      <el-table :data="registryList" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>
        <!-- <el-table-column prop="avatar" label="社团头像" width="100" align="center">
        </el-table-column> -->
        <el-table-column prop="club_name" label="社团名称" width="150" align="center">
        </el-table-column>
        <el-table-column prop="club_type" label="社团类型" width="150" align="center">
        </el-table-column>
        <el-table-column prop="xuehao" label="学号" width="130" align="center">
        </el-table-column>
        <el-table-column prop="name" label="申请人" width="130" align="center">
        </el-table-column>
        <el-table-column prop="college" label="学院" width="130" align="center">
        </el-table-column>
        <el-table-column prop="major" label="专业" width="130" align="center">
        </el-table-column>
        <el-table-column prop="classname" label="班级" width="130" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="130" align="center">
        </el-table-column>
        <!-- <el-table-column prop="content" label="内容" width="110" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" plain @click="queryContentDetail(scope.row)">内容详情</el-button>
          </template>
        </el-table-column> -->
        <el-table-column prop="status" label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" plain v-if="scope.row.status === 1">通过</el-button>
            <el-button size="mini" type="primary" plain v-if="scope.row.status === 2">待审核</el-button>
            <el-button size="mini" type="danger" plain v-if="scope.row.status === 0">拒绝</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" plain @click="editBtnClick(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="danger" plain @click="deleteBtnClick(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { queryClubAccountRegistryList, deleteClubAccountRegistry, updateClubAccountRegistry } from '../../service/util.api'
export default {
  data() {
    return {
      registryList: [],
      club_name: '',
      club_type: '',
      xuehao: '',
      multipleSelection: [],
      queryStatus: '',
      updateStatus: '',
      visible: false,
      value: '',
      deleteVisible: false,
    }
  },
  mounted() {
    // this.queryGonggaoList();
    this.queryRegistryList();
  },
  computed: {
    queryStatusOptions() {
      return this.$store.state.statusOptions
    },
    auditStatusOptions() {
      const options = this.$store.state.statusOptions.filter(item => item.value !== 2);
      return options;
    },
    btnDisabled() {
      return this.multipleSelection.length > 0 ? false : true;
    }
  },
  methods: {
    async queryRegistryList() {
      const res = await queryClubAccountRegistryList(this.club_name, this.club_type, this.xuehao, this.queryStatus);
      console.log("注册列表：", res);
      this.registryList = res.data;
    },
    async updateRegistryApi(updateParams) {
      const res = await updateClubAccountRegistry(updateParams);
      console.log("更新结果：", res);
    },
    // 保存勾选的数据
    handleSelectionChange(selectedData) {
      this.multipleSelection = selectedData;
      // console.log(selectedData);
    },
    async passedAudit() {
      this.visible = false;
      for (const item of this.multipleSelection) {
        const { id,
          student_id,
          club_name,
          club_type,
        } = item;
        const updateParams = {
          id,
          student_id,
          club_name,
          club_type, status: Number(this.value)
        }
        // console.log("updateParmas:", updateParams);
        await this.updateRegistryApi(updateParams);
        // console.log("更新公告结果：", res);
      }
      this.queryRegistryList();
    },
    hideCallback() {
      console.log("弹框隐藏");
      this.value = ''
    },
    // 删除操作
    async deleteRegistryApi(id) {
      const res = await deleteClubAccountRegistry(id);
      console.log("删除结果：", res);
      // this.$message.success("删除成功");
      // this.queryGonggaoList();
    },
    deleteBtnClick(index, row) {
      const { id } = row;
      // console.log("点击删除按钮", row);
      // this.deleteRegistryApi(id);
    },
    async batchDeleteBtnClick() {
      this.deleteVisible = false
      console.log("确定批量删除所选内容");
      for (const item of this.multipleSelection) {
        const { id } = item;
        console.log("批量删除内容id:", id);
        this.deleteRegistryApi(id);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-input {
  width: 200px;
}

.btn {
  margin-top: 10px;
  text-align: right;
  //background-color: red;
}

.btn-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 50px;
  margin-top: 20px;

  .item {
    width: 25%;

    .label {
      font-size: 14px;
      padding-right: 5px;
    }

    .el-input {
      width: 150px;
    }
  }
}

.op-btn {
  margin-top: 10px;
  margin-left: 50px;
  //background-color: red;
}

.zhaoxin_list {
  //min-width: 1200px;
  //overflow-x: scroll;
  margin-top: 45px;
  padding: 0 15px;
}
</style>
