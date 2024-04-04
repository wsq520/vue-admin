<template>
  <el-dialog title="填写学生信息" align="center" :visible.sync="show" width="40%" :show-close="false">
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="年级">
        <el-select v-model="createStudentForm.grade" placeholder="请选择年级" filterable>
          <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="createStudentForm.college" placeholder="请选择学院" filterable>
          <el-option v-for="item in collegeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="createStudentForm.major" placeholder="请选择专业" filterable>
          <el-option v-for="item in majorOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="createStudentForm.xuehao"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="createStudentForm.password"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="createStudentForm.classname"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="createStudentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="createStudentForm.gender" placeholder="请选择性别">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="createStudentForm.phone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      createStudentForm: {
        college: '',
        grade: '',
        major: '',
        classname: '',
        gender: '',
        phone: '',
        name: '',
        xuehao: '',
        password: ''
      },
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
    cancel() {
      this.$emit('create:cancel');
      this.clearcreateStudentForm();
    },
    confirm() {
      let isFinshedFrom = true;
      const createParams = { ...this.createStudentForm };
      Object.keys(createParams).map(key => {
        if (!createParams[key]) {
          isFinshedFrom = false;
          return;
        }
      })
      if (!isFinshedFrom) {
        this.$message('请认真填写信息！');
        return;
      }
      this.$emit('create:student', this.createStudentForm);
      this.clearcreateStudentForm();
    },
    clearcreateStudentForm() {
      Object.keys(this.createStudentForm).map(key => this.createStudentForm[key] = '');
    },
  }
}
</script>

<style scoped lang="scss">
.el-input {
  width: 200px;
}
</style>
