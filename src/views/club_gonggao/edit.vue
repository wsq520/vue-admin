<template>
  <div>
    <el-dialog center title="编辑公告信息" :visible="show" width="40%" @close="diaglogClose" :destroy-on-close="true">
      <el-form label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="gonggaoInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="gonggaoInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- <el-input v-model="gonggaoInfo.picture_url"></el-input> -->
          <ImageUpload :originUrl="gonggaoInfo.picture_url" @upload:success="getImageUrl"></ImageUpload>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker type="date" foramt="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间"
            v-model="gonggaoInfo.publishtime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClik">取 消</el-button>
        <el-button type="primary" @click="confirmClick" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from '../../components/ImageUpload';
export default {
  components: {
    ImageUpload
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    gonggaoInfo: {
      type: Object,
      default: () => ({
        title: '',
        picture_url: '',
        content: '',
        publishtime: '',
      })
    }
  },
  computed: {
    // visiable() {
    //   return this.show;
    // }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    cancelClik() {
      this.$emit('edit:cancel');
    },
    confirmClick() {
      this.$emit('edit:confirm', this.gonggaoInfo);
    },
    diaglogClose() {
      this.$emit('dialog:close');
      this.imageUrl = ''
    },
    getImageUrl(url) {
      this.imageUrl = url;
      this.$emit('upload:url', this.imageUrl);
    },
  }
}
</script>

<style  scoped></style>
