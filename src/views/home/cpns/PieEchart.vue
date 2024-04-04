<template>
  <div ref="chart" style="width: 40%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getEchartsClubType } from '../../../service/echarts';

export default {
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.drawChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    // 在组件销毁前，需要手动销毁图表实例。
    this.chart.dispose();
  },
  methods: {
    async getEchartsData() {
      const res = await getEchartsClubType();
      console.log(res);
      const list = res.data;
      const data = [];
      for (const item of list) {
        data.push({
          value: item.data.length,
          name: item.club_type
        })
      }
      console.log(data);
      return data;
    },

    async drawChart() {
      const data = await this.getEchartsData();
      const option = {
        title: {
          text: '社团类型及个数统计',
          // subtext: '每个类型下的社团个数',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            // data: [
            //   { value: 1048, name: '搜索引擎' },
            //   { value: 735, name: '直接访问' },
            //   { value: 580, name: '邮件营销' },
            //   { value: 484, name: '联盟广告' },
            //   { value: 300, name: '视频广告' }
            // ],
            // label: {
            //   show: true,
            //   position: 'center',
            //   formatter: '{d}%' // 这里显示百分比
            // },
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
}
</script>

<style  scoped></style>
