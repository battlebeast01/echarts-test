<template>
    <div :style="{ width: containerWidth + 'px', height: containerHeight + 'px' }" ref="chartRef"></div>
</template>
  
  <script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  import * as echarts from 'echarts'
  import { ref } from '@vue/composition-api';
  import { onMounted } from '@vue/composition-api';
  import { onUnmounted } from '@vue/composition-api';
  import Chart from '../classes/chartclass'
  
  export default defineComponent({
    name: 'App',
    components: {
  
    },
    setup() {
        const containerWidth = ref(1500)
        const containerHeight = ref(500)
        const chartRef = ref<HTMLDivElement | any>(null)
        const barChart = ref(new Chart())

        console.log(barChart.value)

        onMounted(() => {
        const chart = echarts.init(chartRef.value)
        chart.setOption(barChart.value)
    })

        onUnmounted(() => {
        const chart = echarts.getInstanceByDom(chartRef.value) as any
        chart.dispose()
    })  
  
      return{
        chartRef,
        containerWidth,
        containerHeight  
      }
  
    },
  });
  </script>
  
  <style>
  
  </style>
  