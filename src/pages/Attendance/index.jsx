import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
// 饼图的数据
const data1 = [
  {
    name: '垃圾未倒',
    value: 70,
  },
  {
    name: '地面不干净',
    value: 68,
  },
  {
    name: '马桶不干净',
    value: 48,
  },
  {
    name: '洗漱台镜面未擦',
    value: 40,
  },
  {
    name: '内务不合格',
    value: 32,
  },
  {
    name: '桌面不整洁',
    value: 27,
  },
]
const data2 = [
  {
    name: '一楼',
    value: 70,
  },
  {
    name: '二楼',
    value: 68,
  },
  {
    name: '三楼',
    value: 48,
  },
  {
    name: '四楼',
    value: 4,
  },
  {
    name: '五楼',
    value: 32,
  },
  {
    name: '六楼',
    value: 27,
  },
]
const data3 = [
  {
    name: '上午卫生',
    value: 70,
  },
  {
    name: '下午卫生',
    value: 68,
  },
]
const data4 = [
  {
    name: '一天内卫生不合格',
    value: 70,
  },
  {
    name: '两天内卫生不合格',
    value: 68,
  },
  {
    name: '三天内卫生不合格',
    value: 48,
  },
  {
    name: '四天内卫生不合格',
    value: 4,
  },

  {
    name: '七天内卫生不合格',
    value: 27,
  },
]
const Attendance = () => {
  const lineChart = useRef(null)
  const pieChart = useRef(null)

  useEffect(() => {
    // 折线图
    // 确保DOM元素已经渲染
    if (lineChart.current) {
      let myChart = echarts.init(lineChart.current)
      myChart.setOption({
        title: {
          text: '宿舍值日不合格数量',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 16,
          },
        },
        tooltip: {},
        xAxis: {
          data: Array.from({ length: 30 }, (_, i) => `第${i + 1}天`),
          axisLine: {
            lineStyle: {
              color: '#333',
            },
          },
          axisLabel: {
            color: '#333',
          },
        },
        yAxis: {
          name: '不合格宿舍数量',
          nameTextStyle: {
            color: '#333',
          },
          axisLine: {
            lineStyle: {
              color: '#333',
            },
          },
          axisLabel: {
            color: '#333',
          },
        },
        series: [
          {
            name: '不合格宿舍数量',
            type: 'line',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)), // 示例数据
          },
        ],
      })
    }
    // 饼图
    if (pieChart.current) {
      let myChart = echarts.init(pieChart.current)
      myChart.setOption({
        title: [
          {
            text: '饼图',
            left: 'center',
            top: '5%',
          },
          {
            subtext: '不合格原因占比',
            left: '12.5%',
            top: '75%',
            textAlign: 'center',
          },
          {
            subtext: '六个楼层宿舍卫生不合格占比',
            left: '37.5%',
            top: '75%',
            textAlign: 'center',
          },
          {
            subtext: '时间段卫生不合格占比',
            left: '62.5%',
            top: '75%',
            textAlign: 'center',
          },
          {
            subtext: '连续不合格宿舍占比',
            left: '87.5%',
            top: '75%',
            textAlign: 'center',
          },
        ],
        series: [
          {
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            data: data1,
            label: {
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5,
            },
            left: 0,
            right: '75%',
            top: 0,
            bottom: 0,
          },
          {
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            data: data2,
            label: {
              position: 'outer',
              alignTo: 'labelLine',
              bleedMargin: 5,
            },
            left: '25%',
            right: '50%',
            top: 0,
            bottom: 0,
          },
          {
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            data: data3,
            label: {
              position: 'outer',
              alignTo: 'edge',
              margin: 20,
            },
            left: '50%',
            right: '25%',
            top: 0,
            bottom: 0,
          },
          {
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            data: data4,
            label: {
              position: 'outer',
              alignTo: 'edge',
              margin: 20,
            },
            left: '75%',
            right: 0,
            top: 0,
            bottom: 0,
          },
        ],
      })
    }
  }, [])

  return (
    <div style={{ margin: 0, padding: 0, height: '100%' }}>
      <div ref={lineChart} style={{ height: '50%', width: '100%' }}></div>
      <div ref={pieChart} style={{ height: '50%', width: '100%' }}></div>
    </div>
  )
}

export default Attendance
