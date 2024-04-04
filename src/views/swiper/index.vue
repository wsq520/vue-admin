<template>
  <div>
    <!-- <el-loading v-if="loading" :lock="true" text="loading..."></el-loading> -->
    <div class="btn-container">
      <div class="item">
        <span class="label">图片描述:</span>
        <el-input placeholder="请输入描述" v-model="desc" clearable>
        </el-input>
      </div>
      <div class="item">
        <span class="label">状态:</span>
        <el-select v-model="isShow" placeholder="请选择" clearable>
          <el-option v-for="item in showOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-button type="primary" @click="getSwiperListAPI">查询</el-button>
      </div>
    </div>
    <div class="op-btn">
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
      <el-button type="primary" size="mini" @click="createBtnClick">新增</el-button>
    </div>
    <div class="swiper-list">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        :data="swiperList" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" type="index" width="120" align="center">
        </el-table-column>
        <el-table-column prop="desc" label="图片描述" width="200" align="center">
        </el-table-column>
        <el-table-column label="图片" width="300" align="center">
          <template slot-scope="scope">
            <img class="image" :src="scope.row.url" alt="scope.row.desc">
          </template>
        </el-table-column>
        <el-table-column label="展示状态" width="105" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.isShow === 1" type="success">正在展示</el-button>
            <el-button size="mini" v-if="scope.row.isShow === 0" type="info">暂未展示</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="是否展示" width="110" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.isShow === 1" type="danger" plain
              @click="closeBtnClick(scope.row)">否</el-button>
            <el-button size="mini" v-if="scope.row.isShow === 0" type="success" plain
              @click="openBtnClick(scope.row)">是</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editBtnClick(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="rowDeleteBtnClick(scope.row)">删除</el-button>
            <!-- <el-popover placement="right" margin-left="50px" width="200" height="200px" v-model="rowDeleteVisible">
              <span>确定删除吗？</span>
              <div class="btn">
                <el-button size="mini" type="text" @click="rowDeleteVisible = false">取消</el-button>
                <el-button type="primary" size="mini" plain @click="rowDeleteVisible = false">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini" plain>删除</el-button>
            </el-popover> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑轮播图" center :visible.sync="dialogVisible" width="40%" :destroy-on-close="true">
      <el-form label-width="80px">
        <el-form-item label="描述">
          <el-input v-model="editInfo.desc"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- <img :src="editInfo.desc" alt=""> -->
          <ImageUpload :originUrl="editInfo.url" @upload:success="getImageUrl"></ImageUpload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增轮播图" center :visible.sync="createDialogVisible" width="40%">
      <el-form label-width="80px">
        <el-form-item label="描述">
          <el-input v-model="createInfo.desc"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- <img :src="editInfo.desc" alt=""> -->
          <ImageUpload :originUrl="createInfo.url" @upload:success="getImageUrl"></ImageUpload>
        </el-form-item>
        <el-form-item label="是否展示">
          <el-switch v-model="showValue"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="creatDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCreateBtnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from '../../components/ImageUpload';
import { getSwiperList, getSwiperInfo, createSwiper, deleteSwiper, updateSwiper } from '../../service/swiper';
export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      loading: true,
      swiperList: [],
      isShow: '',
      desc: '',
      showOptions: [
        { value: 1, label: "已开启" },
        { value: 0, label: "已关闭" },
      ],
      imageUrl: '',
      editInfo: {},
      deleteVisible: false,
      dialogVisible: false,
      multipleSelection: [],
      rowDeleteVisible: false,
      createDialogVisible: false,
      createInfo: {
        desc: '',
        url: '',
      },
      showValue: true,
    }
  },
  mounted() {
    this.getSwiperListAPI();
  },
  computed: {
    btnDisabled() {
      return this.multipleSelection.length > 0 ? false : true;
    }
  },
  methods: {
    async getSwiperListAPI() {
      this.loading = true;
      const res = await getSwiperList(this.desc, this.isShow);
      console.log(res);
      this.swiperList = res.data;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    async updateSwiperAPI(parmas) {
      const res = await updateSwiper(parmas);
      // return res;
      console.log("更新结果：", res);
    },
    async deleteSwiperAPI(id) {
      const res = await deleteSwiper(id);
      console.log("删除结果：", res);
    },
    async updateSwipershowStatus(row, isShow) {
      const { id, url, desc } = row;
      const param = {
        id, url, desc, isShow
      }
      const res = await this.updateSwiperAPI(param);
    },
    async closeBtnClick(row) {
      await this.updateSwipershowStatus(row, 0);
      await this.getSwiperListAPI();
      this.$message.success(`已关闭~`);
    },
    async openBtnClick(row) {
      await this.updateSwipershowStatus(row, 1);
      await this.getSwiperListAPI();
      this.$message.success(`已开启~`);
    },
    handleSelectionChange(selectedData) {
      this.multipleSelection = selectedData;
    },
    async batchDeleteBtnClick() {
      for (const item of this.multipleSelection) {
        const { id } = item;
        await this.deleteSwiperAPI(id);
      }
      this.deleteVisible = false;
      this.getSwiperListAPI();
    },
    getImageUrl(url) {
      this.imageUrl = url;
    },
    editBtnClick(row) {
      this.dialogVisible = true;
      this.editInfo = { ...row };
    },
    async editConfirmBtnClick() {
      const { id, desc, isShow, url } = this.editInfo;
      const res = await updateSwiper({
        id,
        url: this.imageUrl ? this.imageUrl : url,
        desc,
        isShow
      })
      console.log("更新图片结果：", res);
      this.dialogVisible = false;
      await this.getSwiperListAPI();
      this.$message.success("更新成功~");
    },
    async rowDeleteBtnClick(row) {
      // console.log("删除按钮呗点击", row.id);
      const { id } = row;
      const res = await deleteSwiper(id);
      console.log("删除结果:", res);
      this.$message.success("删除成功~");
      this.rowDeleteVisible = true;
      this.getSwiperListAPI();
    },
    createBtnClick() {
      this.createDialogVisible = true;
    },
    async editCreateBtnClick() {
      this.createDialogVisible = false;
      console.log(this.createInfo, this.imageUrl);
      const param = {
        desc: this.createInfo.desc,
        url: this.imageUrl,
        isShow: this.showValue ? 1 : 0,
      }
      console.log(param, this.showValue, param);
      const res = await createSwiper(param);
      console.log("新增图片结果:", res);

      this.createInfo = {
        desc: '',
        url: '',
      }
      this.showValue = true;
      this.getSwiperListAPI();
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

.op-btn {
  margin-top: 10px;
  margin-left: 50px;
}

.image {
  display: block;
  width: 100%;
  height: 180px;
}

.swiper-list {
  margin-top: 20px;
  padding: 0 15px;
}
</style>
