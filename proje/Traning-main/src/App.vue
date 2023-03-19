<template>
  <v-app>
    <template>
      <v-container class="bg-surface-variant">
        <v-row class="black">
          <v-col cols="2">
            <v-select
            v-model="selectedItems"
            :items="filterItems"
            label="Select Category"
            multiple
            class="purple"
            style="padding-top: 10px; padding-right: 10px; padding-bottom: 5px; padding-left: 10px;"
            ></v-select>
          </v-col>
          <v-col cols="2">
              <v-btn
              dark
              height="70"
              block
              color="purple yellow--text"
              rounded
              @click="filterFunction"
              style="padding-top: 15px; padding-right: 10px; padding-bottom: 15px; padding-left: 10px;"
              >Filter according to category</v-btn>
          </v-col>
          <v-col cols="2">
            <v-range-slider
            v-if="urlItem"
            text="red"
            v-model="selectedRange"
            @change="filterFunction"
            :min="0"
            :max="22314"
            :step="500"
            thumb-label="always"
            style="padding-top: 35px; padding-right: 10px; padding-bottom: 5px; padding-left: 10px;"
            >
            </v-range-slider>
            <!-- <v-sheet v-else-if="showError">sertac</v-sheet> -->
          </v-col>
          <v-col cols="6" :style="{ width: containerWidth + 'px', height: containerHeight + 'px' }" ref="chartRef">
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from '@vue/composition-api'
import * as echarts from 'echarts'
import filters from './filters.json'
import data from './data.json'
import Chart from './classes/chartclass'
// import router from './router'
// import Chart from './components/Chart.vue'
import { get, set } from 'lodash'
export default defineComponent({
  name: 'App',
  components: {
    // Chart
  },
  setup (_, { root }) {
    let chart
    // set(filters, '[1].info.values', ['aaa', 'bbbb', 'cccc'])
    const containerWidth = ref(1000)
    const containerHeight = ref(800)
    const chartRef = ref()
    // const filterItems = ref(filters[1].info.values)
    const selectedItems = ref<any[]>([])
    const filterItems = ref(get(filters, '[1].info.values', 'default'))
    const selectedRange = ref([0, 219382])
    const chartData = ref(get(data, 'rows.m0'))
    const chartCatData = ref(get(data, 'rows.category'))
    const url = new URL(window.location.href)
    const urlItem = ref(false)
    // const route = root.$route
    // const router = root.$router
    // console.log(root)
    // console.log(url.search, 'url.search')
    console.log(set(filters, '[1].info.values', ['aaa', 'bbbb', 'cccc']))

    const filterFunction = () => {
      const newData = chartData.value.filter((num) => { return num >= selectedRange.value[0] && num <= selectedRange.value[1] })
      // const chart = echarts.init(chartRef.value)
      chart.setOption(
        new Chart(selectedItems.value, newData)
      )
      url.searchParams.set('category', `${selectedItems.value.join('-')}`)
      window.history.pushState({}, '', url)
      console.log(url.search.split('=')[1].split('-'))
      url.search = ''
      urlItem.value = true

      // router.push({
      //   path: '/',
      //   query: { searchTerm: searchTerm.value }
      // })
    }

    onMounted(() => {
      if (url.search) {
        chart = echarts.init(chartRef.value)
        chart.setOption(
          new Chart(url.search.split('=')[1].split('-').map(str => { return str.replace(/\+/g, ' ') }), chartData.value)
        )
        selectedItems.value = url.search.split('=')[1].split('-').map(str => { return str.replace(/\+/g, ' ') })
      } else {
        chart = echarts.init(chartRef.value)
        chart.setOption(
          new Chart(chartCatData.value, chartData.value))
      }
    })

    onUnmounted(() => {
      const chart = echarts.getInstanceByDom(chartRef.value) as any
      chart.dispose()
    })

    return {
      chartRef,
      containerWidth,
      containerHeight,
      filterItems,
      selectedRange,
      selectedItems,
      filterFunction,
      urlItem
    }
  }
})
</script>
<style lang="sass">
.v-subheader
  font-weight: 700!important
</style>
