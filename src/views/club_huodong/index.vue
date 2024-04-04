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
        <span class="label">标题:</span>
        <el-input placeholder="请输入社团类型" v-model="title" clearable>
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
        <el-button type="primary" @click="queryHuodongList">查询</el-button>
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
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        :data="huodongList" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column label="社团头像" width="200" align="center">
          <template slot-scope="scope">
            <img class="image" :src="scope.row.avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="club_name" label="社团名称" width="150" align="center">
        </el-table-column>
        <!-- <el-table-column prop="club_type" label="社团类型" width="150" align="center">
        </el-table-column> -->
        <el-table-column prop="president_name" label="社长" width="130" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="130" align="center">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="110" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" plain @click="queryContentDetail(scope.row)">内容详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" plain v-if="scope.row.status === 1">通过</el-button>
            <el-button size="mini" type="primary" plain v-if="scope.row.status === 2">待审核</el-button>
            <el-button size="mini" type="danger" plain v-if="scope.row.status === 0">拒绝</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="starttime" label="开始时间" width="100" align="center">
        </el-table-column>
        <el-table-column prop="starttime" label="结束时间" width="100" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="editBtnClick(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="deleteBtnClick(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="活动详情" center :visible.sync="detailDialogVisible" width="50%">
      <el-form label-width="80px">
        <el-form-item label="社团名字">
          <span>{{ this.contentDeatil.club_name }}</span>
        </el-form-item>
        <el-form-item label="社团类型">
          <span>{{ this.contentDeatil.club_type }}</span>
        </el-form-item>
        <el-form-item label="负责人">
          <span>{{ this.contentDeatil.president_name }}</span>
        </el-form-item>
        <el-form-item label="活动主题">
          <span>{{ this.contentDeatil.title }}</span>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="this.contentDeatil.content" type="textarea" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <img class="content_image" :src="this.contentDeatil.picture_url" alt="">
        </el-form-item>
        <el-form-item label="开始时间">
          <span>{{ this.contentDeatil.starttime }}</span>
        </el-form-item>
        <el-form-item label="结束时间">
          <span>{{ this.contentDeatil.endtime }}</span>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
    <EditHuodong :show="editDialogVisible" :huodongInfo="editInfo" @edit:cancel="editCancel" @edit:confirm="editConfirm"
      @update:visible="handleEditDialogClose" @dialog:close="handleEditDialogClose" @upload:url="getImageUrl">
    </EditHuodong>
  </div>
</template>

<script>
import EditHuodong from './edit.vue';
// import { getZhaoxinList, updateZhaoxin, deleteZhaoxin } from '../../service/zhaoxin_publish'
import { queryClubHuodongList, updateClubHuodong, deleteClubHuodong } from '../../service/club_huodong'
export default {
  components: {
    EditHuodong
  },
  data() {
    return {
      loading: false,
      huodongList: [],
      club_name: '',
      club_type: '',
      title: '',
      contentDeatil: {},
      detailDialogVisible: false,
      multipleSelection: [],
      queryStatus: '',
      updateStatus: '',
      visible: false,
      value: '',
      deleteVisible: false,
      editInfo: {},
      editDialogVisible: false,
      imageUrl: '',
    }
  },
  mounted() {
    this.queryHuodongList();
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
    async queryHuodongList() {
      this.loading = true;
      const res = await queryClubHuodongList(this.club_name, this.club_type, this.title, this.queryStatus);
      // console.log(this.club_name, this.club_type, this.title, this.queryStatus);
      console.log("huodonglist:", res);
      this.huodongList = res.data;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    async updateHuodongApi(updateParams) {
      const res = await updateClubHuodong(updateParams);
      console.log("更新结果：", res);
    },
    queryContentDetail(row) {
      this.detailDialogVisible = true;
      this.contentDetail = {};
      this.contentDeatil = { ...row };
    },
    // 获取上传图片的路径
    getImageUrl(url) {
      this.imageUrl = '';
      this.imageUrl = url;
    },
    handleEditDialogClose() {
      console.log("编辑弹窗关闭了~");
      this.editDialogVisible = false;
      this.editInfo = {};
      this.imageUrl = '';
    },
    editBtnClick(index, row) {
      console.log("点击了编辑按钮", row);
      this.editDialogVisible = true;
      this.editInfo = row;
    },
    editCancel() {
      this.editDialogVisible = false;
      this.editInfo = {};
      this.imageUrl = '';
    },
    async editConfirm(editParams) {
      console.log("父组件拿到最新的编辑数据", editParams);
      const obj = {
        huodong_id: editParams.huodong_id,
        club_id: editParams.club_id,
        club_name: editParams.club_name,
        club_type: editParams.club_type,
        title: editParams.title,
        content: editParams.content,
        picture_url: this.imageUrl ? this.imageUrl : editParams.picture_url,
        status: editParams.status,
        starttime: editParams.starttime,
        endtime: editParams.endtime
      }
      await this.updateHuodongApi(obj);
      this.editDialogVisible = false;
      this.queryHuodongList();
    },
    // 保存勾选的数据
    handleSelectionChange(selectedData) {
      this.multipleSelection = selectedData;
      // console.log(selectedData);
    },
    async passedAudit() {
      this.visible = false;
      console.log("确定通过审核", this.value);
      // for (const item of this.multipleSelection) {
      //   console.log(item);
      //   const { id, club_id, title, content, picture_url, starttime, endtime } = item;
      //   const updateParams = {
      //     id, club_id, title, content, picture_url, starttime, endtime, status: Number(this.value)
      //   }
      //   console.log("updateParmas:", updateParams);
      //   const res = await updateZhaoxin(updateParams);
      //   console.log(res);
      // }
      // this.queryHuodongList();
    },
    hideCallback() {
      console.log("弹框隐藏");
      this.value = ''
    },
    // 删除操作
    async deleteHuodongApi(id) {
      const res = await deleteClubHuodong(id);
      console.log("删除结果：", res);
      this.$message.success("删除成功");
      this.queryHuodongList();
    },
    deleteBtnClick(index, row) {
      const { id } = row;
      console.log("点击删除按钮", row);
      // this.deleteHuodongApi(id);
    },
    async batchDeleteBtnClick() {
      this.deleteVisible = false
      console.log("确定批量删除所选内容");
      for (const item of this.multipleSelection) {
        const { id } = item;
        console.log("批量删除内容id:", id);
        // this.deleteHuodongApi(id);
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

.image {
  display: block;
  width: 100%;
  height: 180px;
}

.content_image {
  width: 300px;
  height: 200px;
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
