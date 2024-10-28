import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

// echarts的配置数据(柱状图)
const axisOption = {
  // 图例文字颜色
  textStyle: {
    color: '#333'
  },
  // 提示框
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#17b3a3'
      }
    },
    axisLabel: {
      interVal: 0,
      color: '#333'
    }
  },
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#17b3a3'
        }
      }
    }
  ],
  color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
  series: []
}

// echarts的配置数据(饼状图)
const normalOption = {
  tooltip: {
    trigger: 'item'
  },
  color: [
    '#of78f4',
    '#dd536b',
    '#9462e5',
    '#a6a6a6',
    '#e1bb22',
    '#39c362',
    '#3ed1cf'
  ],
  series: []
}

const Echarts = ({ style, chartData, isAxisChart = true }) => {
  // 获取dom实例
  const echartRef = useRef()
  let echartObj = useRef(null)

  useEffect(() => {
    // 初始化echarts
    echartObj.current = echarts.init(echartRef.current)

    // 设置option
    let options
    if (isAxisChart) {
      // 设置x轴数据
      axisOption.xAxis.data = chartData.xData
      axisOption.series = chartData.series
      options = axisOption
    } else {
      normalOption.series = chartData.series
      options = normalOption
    }
    echartObj.current.setOption(options)

    // 在组件卸载时销毁实例，避免内存泄漏
    return () => {
      if (echartObj.current) {
        echartObj.current.dispose()
      }
    }
  }, [chartData, isAxisChart])
  return (
    <div style={style} ref={echartRef}>Echarts</div>
  )
}

export default Echarts