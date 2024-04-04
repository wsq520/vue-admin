<template>
  <div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="pageSizeOptions" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSizeOptions: {
      type: Object,
      default: () => ([5, 10, 50, 100])
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log("size-change");
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页数: ${val}`);
    }
  }
}
</script>

<style  scoped></style>
