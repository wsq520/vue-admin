<template>
  <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleImageSuccess"
    :on-error="handleImageError" :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl || originUrl" :src="imageUrl ? imageUrl : originUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  props: {
    originUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      action: "http://localhost:8000/file/upload",
      imageUrl: '',
    };
  },
  methods: {
    handleImageSuccess(res, file) {
      console.log("上传成功", res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('upload:success', res.url);
    },
    handleImageError(err, file) {
      this.$message.error(`上传文件${file.name}失败`);
      console.log("上传文件失败", err, file);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
}
</script>

<style  scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.avatar {
  width: 320px;
  height: 200px;
  display: block;
}

</style>
