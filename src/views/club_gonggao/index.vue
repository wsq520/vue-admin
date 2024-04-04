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
        <el-button type="primary" @click="queryGonggaoList">查询</el-button>
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
        :data="gonggaoList" border style="width: 100%" @selection-change="handleSelectionChange">
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
        <el-table-column prop="club_type" label="社团类型" width="150" align="center">
        </el-table-column>
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
        <el-table-column prop="publishtime" label="发布时间" width="100" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="editBtnClick(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="deleteBtnClick(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="公告详情" center :visible.sync="dialogVisible" width="50%" @close="handleDetailDialogClose">
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
        <el-form-item label="招新内容">
          <span>{{ this.contentDeatil.content }}</span>
        </el-form-item>
        <el-form-item label="图片">
          <img class="content_image" :src="this.contentDeatil.picture_url" alt="">
        </el-form-item>
        <el-form-item label="发布时间">
          <span>{{ this.contentDeatil.publishtime }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <EditGonggao :show="editDialogVisible" :gonggaoInfo="editInfo" @edit:cancel="editCancel" @edit:confirm="editConfirm"
      @update:visible="handleEditDialogClose" @dialog:close="handleEditDialogClose" @upload:url="getImageUrl">
    </EditGonggao>
    <h1>问题：未经过审核的公告该不该直接删除</h1>
  </div>
</template>

<script>
import EditGonggao from './edit.vue';
// import { getGonggaoList, updateGonggao, deleteGonggao } from '../../service/zhaoxin_publish'
import { queryClubGonggaoList, updateClubGonggao, deleteClubGonggao } from '../../service/club_gonggao'
export default {
  components: {
    EditGonggao
  },
  data() {
    return {
      loading: false,
      gonggaoList: [],
      club_name: '',
      club_type: '',
      title: '',
      contentDeatil: {},
      dialogVisible: false,
      multipleSelection: [],
      queryStatus: '',
      updateStatus: '',
      visible: false,
      value: '',
      deleteVisible: false,
      editInfo: {},
      editDialogVisible: false,
      imageUrl: ''
    }
  },
  mounted() {
    this.queryGonggaoList();
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
    async queryGonggaoList() {
      this.loading = true;
      const res = await queryClubGonggaoList(this.club_name, this.club_type, this.title, this.queryStatus);
      console.log("zhaolist:", res);
      this.gonggaoList = res.data;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    queryContentDetail(row) {
      this.dialogVisible = true;
      this.contentDeatil = { ...row };
    },
    async updateGonggaoApi(updateParams) {
      const res = await updateClubGonggao(updateParams);
      console.log("更新结果：", res);
    },
    handleEditDialogClose() {
      this.editDialogVisible = false;
      this.imageUrl = '';
    },
    handleDetailDialogClose() {
      this.imageUrl = '';
    },
    getImageUrl(url) {
      this.imageUrl = url
    },
    editBtnClick(index, row) {
      console.log("点击了编辑按钮", row);
      this.editDialogVisible = true;
      this.editInfo = row;
    },
    editCancel() {
      this.editDialogVisible = false;
    },
    async editConfirm(editParams) {
      const obj = {
        id: editParams.id,
        club_id: editParams.club_id,
        title: editParams.title,
        content: editParams.content,
        picture_url: this.imageUrl ? this.imageUrl : editParams.picture_url,
        publishtime: editParams.publishtime,
        status: editParams.status,
      }
      await this.updateGonggaoApi(obj);
      this.editDialogVisible = false;
      this.queryGonggaoList();
    },
    // 保存勾选的数据
    handleSelectionChange(selectedData) {
      this.multipleSelection = selectedData;
      // console.log(selectedData);
    },
    async passedAudit() {
      this.visible = false;
      console.log("确定通过审核", this.value);
      for (const item of this.multipleSelection) {
        // console.log(item);
        const { id, club_id, title, content, picture_url, publishtime } = item;
        const updateParams = {
          id, club_id, title, content, picture_url, publishtime, status: Number(this.value)
        }
        // console.log("updateParmas:", updateParams);
        this.updateGonggaoApi(updateParams);
        // console.log("更新公告结果：", res);
      }
      this.queryGonggaoList();
    },
    hideCallback() {
      console.log("弹框隐藏");
      this.value = ''
    },
    // 删除操作
    async deleteGonggaoApi(id) {
      const res = await deleteClubGonggao(id);
      console.log("删除结果：", res);
    },
    async deleteBtnClick(index, row) {
      const { id } = row;
      // console.log("点击删除按钮", row);
      await this.deleteGonggaoApi(id);
      this.$message.success("删除成功");
      this.queryGonggaoList();
    },
    async batchDeleteBtnClick() {
      this.deleteVisible = false;
      console.log("确定批量删除所选内容");
      for (const item of this.multipleSelection) {
        const { id } = item;
        console.log("批量删除内容id:", id);
        await this.deleteGonggaoApi(id);
      }
      this.queryGonggaoList();
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

.image {
  display: block;
  width: 100%;
  height: 180px;
}

.content_image {
  width: 300px;
  height: 200px;
}


.zhaoxin_list {
  //min-width: 1200px;
  //overflow-x: scroll;
  margin-top: 45px;
  padding: 0 15px;
}
</style>
