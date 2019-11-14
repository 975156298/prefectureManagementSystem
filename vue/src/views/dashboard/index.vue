<template>
  <div class="dashboard-container">
    <header>
      <div class="item" v-for="(item, index) in list" :key="index" :style="{ background: '#' + item.color }">
        <div>{{ item.name }}</div>
        <div class="count">{{ item.count }}</div>
      </div>
    </header>
    <section>
      <div class="content">
        <el-card header="常用功能导航" class="left-card">
          <div class="item" v-for="item in functionNav" :key="item.name" @click="jumpPage(item.src)">
            <div class="circle">
              <svg-icon :icon-class="item.icon"/>
            </div>
            <div>{{ item.name }}</div>
          </div>
        </el-card>
        <el-card class="right-card">
          <div slot="header" class="clearfix">
            <span>今日待办</span>
            <i class="el-icon-more" style="float: right" @click="openNeed"></i>
          </div>
          <div>我是待办</div>
        </el-card>
      </div>
      <div class="chart">
        <el-card class="left-card">
          <div slot="header" class="clearfix">
            <span>地府出入境人数</span>
            <i class="el-icon-more" style="float: right"></i>
          </div>
          <div id="line"></div>
        </el-card>
        <el-card class="right-card">
          <div slot="header" class="clearfix">
            <span>各层地府人数</span>
            <i class="el-icon-more" style="float: right"></i>
          </div>
          <div id="pie"></div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'Dashboard',
    data() {
      return {
        list: [
          {name: '地府鬼数', count: 1000000, color: '409EFF'},
          {name: '今日入境', count: 100, color: 'E6A23C'},
          {name: '今日出境', count: 50, color: '67C23A'},
          {name: '管理员', count: 1000000, color: 'F56C6C'}
        ],
        functionNav: [
          {name: '生死簿', icon: 'obituary', src: ''},
          {name: '查询寿命', icon: 'search', src: ''}
        ],
        pieChart: '',
        lineChart: ''
      }
    },
    beforeDestroy() {
      if (this.pieChart) {
        this.pieChart.dispose()
      }
      if (this.lineChart) {
        this.lineChart.dispose()
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      openNeed() {
        console.log('今日待办')
      },
      jumpPage(src) {
        console.log(src)
      },
      getData() {
        const pieData = []
        for (let i = 1; i < 19; i++) {
          const count = parseInt(Math.random() * 100)
          pieData.push({name: i, value: count})
        }
        const lineData = [[10, 20, 100, 80, 90], [100, 10, 50, 40, 90]]
        this.drawPie(pieData)
        this.drawLine(lineData)
      },
      drawPie(data) {
        let optionData = []
        for (let i = 1; i < 19; i++) {
          optionData.push({name: i, icon: 'circle'})
        }
        let option = {
          backgroundColor: '#fff',
          legend: {
            show: true,
            itemWidth: 20,
            itemGap: 10,
            bottom: 10,
            selectedMode: true,
            data: optionData
          },
          tooltip: {
            trigger: 'item',
            formatter: '第{b}层 : 共{c}人 ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: [54, '65%'],
              center: ['50%', '50%'],
              data: data,
              roseType: 'radius',
              label: { //标签的位置
                normal: {
                  show: true,
                  position: 'outside', //标签的位置
                  formatter: "第{b}层: {d}%"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontWeight: 'bold'
                  }
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut'
            }
          ]
        }
        this.pieChart = echarts.init(document.getElementById('pie'))
        this.pieChart.setOption(option)
      },
      drawLine(data) {
        let option = {
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: 80,
            right: 60
          },
          xAxis: [{
            type: 'category',
            data: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            splitNumber: 4,
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DDD'
              }
            },
            axisLine: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          series: [
            {
              name: '入境',
              type: 'line',
              data: data[0],
              itemStyle: {
                color: '#E6A23C'
              },
              lineStyle: {
                color: '#E6A23C'
              },
              smooth: false,
              showSymbol: true
            },
            {
              name: '出境',
              type: 'line',
              data: data[1],
              itemStyle: {
                color: '#67C23A'
              },
              lineStyle: {
                color: '#67C23A'
              },
              smooth: false,
              showSymbol: true
            }
          ]
        }
        this.lineChart = echarts.init(document.getElementById('line'))
        this.lineChart.setOption(option)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      padding: 20px;
      width: 100%;
      height: 100%;

      header {
        display: flex;
        /*justify-content: center;*/

        .item {
          height: 100px;
          width: 240px;
          margin: 0 20px 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 5px;

          div {
            color: #fff;
          }

          .count {
            font-size: 24px;
            margin-top: 10px;
          }
        }
      }

      section {

        .content {
          display: flex;

          .left-card {
            width: calc(100% - 480px);
            margin-right: 10px;

            .item {
              width: 100px;
              height: 100px;
              display: inline-flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;

              .circle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 1px solid #2d8cf0;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }

          .right-card {
            width: 480px;

          }
        }

        .chart {
          display: flex;
          margin-top: 10px;

          .left-card {
            width: calc(100% - 480px);
            margin-right: 10px;
          }

          .right-card {
            width: 480px;
          }

          #line, #pie {
            width: 100%;
            height: 440px;
          }
        }
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
