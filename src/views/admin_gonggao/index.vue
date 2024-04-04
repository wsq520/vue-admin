<template>
  <div>
    <div class="btn-container">
      <div class="item">
        <span class="label">公告标题:</span>
        <el-input placeholder="请输入标题" v-model="title" clearable>
        </el-input>
      </div>
      <div class="item">
        <el-button type="primary" plain @click="">查询</el-button>
      </div>
    </div>
    <div class="op-btn">
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="createBtnClick">新增</el-button>
    </div>
    <div class="club_list">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="list"
        border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" type="index" width="120" align="center">
        </el-table-column>
        <el-table-column label="标题" prop="title" width="120" align="center">
        </el-table-column>
        <el-table-column label="内容" prop="content" width="120" align="center">
        </el-table-column>
        <el-table-column label="图片" width="300" align="center">
          <template slot-scope="scope">
            <img class="image" :src="scope.row.picture_url" alt="">
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
    <el-dialog title="编辑公告" center :visible.sync="editDialogVisible" width="40%" :destroy-on-close="true">
      <el-form label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="editInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="editInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <ImageUpload :originUrl="editInfo.picture_url" @upload:success="getImageUrl"></ImageUpload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增公告" center :visible.sync="createDialogVisiable" width="40%" :destroy-on-close="true">
      <el-form label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="createInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="createInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <ImageUpload :originUrl="createInfo.picture_url" @upload:success="getImageUrl"></ImageUpload>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker type="date" foramt="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间"
            v-model="createInfo.publishtime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="createConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from '../../components/ImageUpload';
import { getAdminGonggaoList, createAdminGonggao, deleteAdminGonggaoById, updateAdminGonggao } from '../../service/admin'
export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      loading: false,
      list: [],
      title: '',
      createGonggaoForm: {
        title: '',
        content: '',
        picture_url: '',
        publishtime: ''
      },
      selectedList: [],
      editDialogVisible: false,
      editInfo: {
        title: '',
        content: '',
        picture_url: '',
        publishtime: '2024-02-01'
      },
      imageUrl: '',
      createDialogVisiable: false,
      createInfo: {
        title: '',
        content: '',
        picture_url: '',
        publishtime: '',
      }
    }
  },
  mounted() {
    this.queryAdminGonggaoList();
  },
  methods: {
    handleSelectionChange(selecetdData) {
      this.selectedList = selecetdData;
      console.log(this.selectedList);
    },
    async queryAdminGonggaoList() {
      this.loading = true;
      const res = await getAdminGonggaoList(this.title);
      this.list = res.data;
      console.log(res);
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    async updateAdminGonggaoAPI(updateParam) {
      // const { id, title, content, picture_url, publishtime } = updateParam;
      const res = await updateAdminGonggao(updateParam);
      console.log("更新结果：", res);
    },
    async deleteGonggaoAPI(id) {
      const res = await deleteAdminGonggaoById(id);
      console.log("删除结果：", res);
    },
    async batchDeleteGonggaoAPI() {
      for (const item of this.selectedList) {
        const { id } = item;
        await this.deleteGonggaoAPI(id);
      }
    },
    async createAdminGonggaoAPI(param) {
      const res = await createAdminGonggao(param);
      console.log("新增结果：", res);
    },
    createBtnClick() {
      this.createDialogVisiable = true;
    },
    async createConfirmBtnClick() {
      const param = { ...this.createInfo, picture_url: this.imageUrl ? this.imageUrl : '' };
      console.log(param);
      const res = await this.createAdminGonggaoAPI(param);
      this.createDialogVisiable = false;
      this.queryAdminGonggaoList();
    },
    editBtnClick(row) {
      this.editDialogVisible = true;
      this.editInfo = { ...row };
    },
    async editConfirmBtnClick() {
      this.editDialogVisible = false;
      const param = { ...this.editInfo, picture_url: this.imageUrl ? this.imageUrl : this.editInfo.picture_url };
      console.log(param);
      const res = await this.updateAdminGonggaoAPI(param);
      console.log("更新结果：", res);
      this.queryAdminGonggaoList();
    },
    getImageUrl(imageUrl) {
      this.imageUrl = imageUrl;
    },
    async deleteAdminGonggaoAPI(id) {
      const res = await deleteAdminGonggaoById(id);
      console.log("删除结果：", res);
      return res;
    },
    async rowDeleteBtnClick(row) {
      const { id } = row;
      const res = await this.deleteAdminGonggaoAPI(id);
      this.queryAdminGonggaoList();
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

.image {
  display: block;
  width: 100%;
  height: 180px;
}
</style>
