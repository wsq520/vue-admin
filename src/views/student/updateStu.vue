<template>
  <el-dialog title="提示" :visible.sync="show" width="30%" :show-close="false">
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="年级">
        <el-select v-model="studentInfo.grade" placeholder="请选择年级" filterable>
          <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="studentInfo.college" placeholder="请选择学院" filterable>
          <el-option v-for="item in collegeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="studentInfo.major" placeholder="请选择专业" filterable>
          <el-option v-for="item in majorOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="studentInfo.xuehao"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="studentInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="studentInfo.classname"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="studentInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="studentInfo.gender" placeholder="请选择性别">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="studentInfo.phone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updateCanel">取 消</el-button>
      <el-button type="primary" @click="updateStudent">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    studentInfo: {
      type: Object,
      default: () => ({
        college: '',
        grade: '',
        major: '',
        classname: '',
        gender: '',
        xuehao: '',
        password: '',
        name: '',
        phone: ''
      })
    },
    show: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      // updateStuDialog: false
    }
  },
  computed: {
    genderOptions() {
      return this.$store.state.genderOptions;
    },
    gradeOptions() {
      return this.$store.state.gradeOptions;
    },
    collegeOptions() {
      return this.$store.state.collegeOptions;
    },
    majorOptions() {
      return this.$store.state.majorOptions;
    }
  },
  methods: {
    updateStudent() {
      this.$emit('update:student', this.studentInfo);
    },
    updateCanel() {
      this.$emit('update:cancel');
    },
  }
}
</script>

<style scoped lang="scss">
.el-input {
  width: 200px;
}

.el-form-item__content {
  margin-left: 10px;
}
</style>
