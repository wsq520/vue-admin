<template>
  <div>
    <el-dialog center title="编辑活动信息" :visible="show" width="40%" @close="diaglogClose" :destroy-on-close="true">
      <el-form label-width="80px">
        <el-form-item label="活动标题">
          <el-input v-model="huodongInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="huodongInfo.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="活动图片">
          <ImageUpload :originUrl="huodongInfo.picture_url" @upload:success="getImageUrl"></ImageUpload>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker type="date" foramt="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间"
            v-model="huodongInfo.starttime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker type="date" foramt="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间"
            v-model="huodongInfo.endtime" style="width: 100%;"></el-date-picker>
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
      default: () => false
    },
    huodongInfo: {
      type: Object,
      default: () => ({
        title: '',
        picture_url: '',
        content: '',
        starttime: '',
        endtime: ''
      })
    }
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
      this.$emit('edit:confirm', this.huodongInfo);
    },
    diaglogClose() {
      this.imageUrl = '';
      this.$emit('dialog:close');
    },
    getImageUrl(url) {
      this.imageUrl = url;
      this.$emit('upload:url', this.imageUrl);
    },
  }
}
</script>

<style  scoped></style>
