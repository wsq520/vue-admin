<template>
  <div class="wrapper">
    <h2 class="title">欢迎使用校园社团招新管理系统</h2>
    <SystemEchart></SystemEchart>
    <div class="charts-container">
      <div class="item">
        <PieEchart></PieEchart>
      </div>
    </div>
  </div>
</template>

<script>
import PieEchart from './cpns/PieEchart';
import SystemEchart from './cpns/SystemEchart';
export default {
  components: {
    PieEchart,
    SystemEchart
  },
  data() {
    return {
    }
  }
}
</script>

<style  scoped lang="scss">
.wrapper {
  padding: 0 20px;
  //background-color: yellow;

  .title {
    width: 100%;
    text-align: center;
    //color: red;
  }
}



.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 根据需要调整高度 */
}

.item {
  display: flex;
  justify-content: space-between; /* 或使用 center, flex-start, flex-end 等 */
  align-items: stretch; /* 或使用 center, flex-start, flex-end 等 */
  margin-bottom: 20px; /* 根据需要调整行间距 */
}

.item > * {
  flex: 0 1 auto;
  width: calc(50% - 10px);
  margin-right: 20px;
}

.item:last-child > * {
  margin-bottom: 0;
}
</style>
