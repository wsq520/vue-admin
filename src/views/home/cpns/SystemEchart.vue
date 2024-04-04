<template>
  <div class="total-box">
    <div class="item">
      <div class="icon">
        <i class="el-icon-s-data"></i>
      </div>
      <div class="content">
        <span>社团总数：{{ this.totalList.clubsTotal }}</span>
      </div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="el-icon-s-data"></i>
      </div>
      <div class="content">
        <span>社团类型:{{ this.totalList.clubTypeTotal }}</span>
      </div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="el-icon-message-solid"></i>
      </div>
      <div class="content">
        <span>社团公告：{{ this.totalList.clubGonggaoTotal }}</span>
      </div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="el-icon-message-solid"></i>
      </div>
      <div class="content">
        <span>管理员公告：{{ this.totalList.adminGonggaoTotal }}</span>
      </div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="el-icon-user"></i>
      </div>
      <div class="content">
        <span>系统用户：{{ this.totalList.studentTotal }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getSystemTotal } from '../../../service/echarts';

export default {
  data() {
    return {
      chart: null,
      totalList: []
    }
  },
  mounted() {
    this.getTotalList();
  },
  methods: {
    async getTotalList() {
      const res = await getSystemTotal();
      console.log(res);
      this.totalList = res.data;
    }
  }
}
</script>

<style scoped lang="scss">
.total-box {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 20px;
  //background-color: red;

  .item {
    //background-color: green;
    display: flex;
    width: 25%;
    height: 50px;

    .icon {
      width: 50px;
      line-height: 50px;
      font-size: 32px;
      text-align: center;
    }

    .content {
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
