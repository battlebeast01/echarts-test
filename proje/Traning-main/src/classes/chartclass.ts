export default class MotherChart {
        xAxis: object
        yAxis: {
            type: string
        }[]

        series: object
        title: {
            text: string
        }

        categoryData: []
        numericData: []

        constructor (categoryData, numericData) {
          this.categoryData = categoryData
          this.numericData = numericData
          this.xAxis = this.setXaxis()
          this.yAxis = this.setYaxis()
          this.series = this.setSeries()
          this.title = this.setTitle()
        }

        setSeries () {
          const x =
          [
            {
              name: 'Category',
              type: 'bar',
              data: this.numericData
            }
          ]

          return x
        }

        setXaxis () {
          return [
            {
              type: 'category',
              data: this.categoryData
            }
          ]
        }

        setYaxis () {
          const x = [
            {
              type: 'value'
            }
          ]
          return x
        }

        setTitle () {
          const x = {
            text: 'Sertac-Chart'
          }
          return x
        }
}
