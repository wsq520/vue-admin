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
        <el-button type="primary" plain @click="queryClubsList">查询</el-button>
      </div>
    </div>
    <div class="op-btn">
      <el-button type="primary" icon="el-icon-plus" size="medium" :disabled="true">新增</el-button>
    </div>
    <div class="club_list">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        :data="clubList" border style="width: 100%">
        <el-table-column label="序号" type="index" width="120" align="center">
        </el-table-column>
        <el-table-column prop="avatar" label="社团头像" width="200" align="center">
          <template slot-scope="scope">
            <img class="image" :src="scope.row.avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="club_name" label="社团名称" width="150" align="center">
        </el-table-column>
        <el-table-column prop="club_type" label="社团类型" width="120" align="center">
        </el-table-column>
        <!-- <el-table-column prop="introduction" label="简介" width="200" align="center">
        </el-table-column> -->
        <el-table-column prop="president_name" label="社长" width="150" align="center">
        </el-table-column>
        <el-table-column prop="count" label="人数" width="120" align="center">
        </el-table-column>
        <el-table-column label="成员名单" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="queryMemberList(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editBtnClick(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="rowDeleteBtnClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="成员名单" center :visible.sync="memberListDialog" width="80%">
      <StudentList :studentList="memberList"></StudentList>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="memberListDialog = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑社团信息" center :visible.sync="editDialogVisiable" width="40%" @close="handleClose" :destroy-on-close="true">
      <el-form label-width="80px">
        <el-form-item label="社团名字">
          <el-input v-model="editInfo.club_name"></el-input>
        </el-form-item>
        <el-form-item label="社团类型">
          <!-- <el-input v-model="editInfo.club_type"></el-input> -->
          <el-select v-model="editInfo.club_type" placeholder="请选择" filterable clearable>
            <el-option v-for="item in clubTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社团头像">
          <!-- <img :src="editInfo.desc" alt=""> -->
          <ImageUpload :originUrl="editInfo.avatar" @upload:success="getImageUrl"></ImageUpload>
        </el-form-item>
        <el-form-item label="社团简介">
          <el-input v-model="editInfo.introduction"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="editConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getClubsList } from '../../service/clubs';
import { queryClubAndClubMemberList } from '../../service/util.api';
import { updateClub, createClub, deleteClubById } from '../../service/clubs';
import StudentList from '../../components/StudentList/index';
import ImageUpload from '../../components/ImageUpload'

export default {
  components: {
    StudentList,
    ImageUpload,
  },
  computed: {
    clubTypeOptions() {
      // console.log(this.$store.state.club_typeOptions);
      return this.$store.state.club_typeOptions;
    }
  },
  data() {
    return {
      loading: false,
      club_name: '',
      club_type: '',
      clubList: [],
      memberList: [],
      memberListDialog: false,
      editInfo: {
        club_name: '',
        club_type: '',
        avatar: '',
        introduction: ''
      },
      editDialogVisiable: false,
      avatarUrl: ''
    }
  },
  mounted() {
    this.queryClubsList(this.club_name, this.club_type);
  },
  methods: {
    async queryClubsList() {
      this.loading = true;
      const res = await queryClubAndClubMemberList(this.club_name, this.club_type);
      console.log(res);
      this.clubList = res.data;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    async updateClubAPI(params) {
      const res = await updateClub(params);
      console.log("更新结果：", res);
    },
    async createClubAPI() { },
    getImageUrl(url) {
      this.avatarUrl = url;
    },
    editBtnClick(row) {
      this.editDialogVisiable = true;
      this.editInfo = { ...row };
    },
    async editConfirmBtnClick() {
      this.editDialogVisiable = false;
      const { club_id, club_name, club_type, student_id, introduction, views, avatar } = this.editInfo;
      console.log(this.editInfo);
      const param = { club_id, club_name, club_type, student_id, introduction, views, avatar: this.avatarUrl ? this.avatarUrl : avatar };
      console.log(param);
      const res = await this.updateClubAPI(param);
      this.queryClubsList();
    },
    rowDeleteBtnClick(row) {
      const { id } = row;
    },
    queryMemberList(index, row) {
      this.memberList = row.clubMemberList;
      this.memberListDialog = true;
    },
    handleClose() {
      this.avatarUrl = '';
    },
    creatBtnClick() {

    },
    createConfirmBtnClick() {

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
    display: flex;
    width: 25%;
    line-height: 50px;

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

.image {
  display: block;
  width: 100%;
  height: 180px;
}

.data_table {
  //min-width: 1200px;
  overflow-x: scroll;
  margin-top: 45px;
  padding: 0 15px;
}
</style>
