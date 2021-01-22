// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

function getDataForYearAndType(rawData) {
  const dict = {}
  for (const x of rawData) {
    const year = x.year
    const amount = parseFloat(x.amount)
    const type = x.type
    if (!(year in dict)) {
      dict[year] = {}
    }
    if (!(type in dict[year])) {
      dict[year][type] = 0
    }
    dict[year][type] += amount
  }

  const data = []
  for (const year in dict) {
    for (const type in dict[year]) {
      data.push({
        year,
        type,
        amount: dict[year][type],
      })
    }
  }
  return data
}

export function renderChartForYearAndType(
  that,
  rawData,
  containerID = 'container',
  colors = [
    '#FF6B3B',
    '#5B8FF9',
    '#FFC100',
    '#61DDAA',
    '#76523B',
    '#0E8E89',
    '#E19348',
    '#F383A2',
    '#247FEA',
  ]
) {
  const { Chart } = that.$g2

  const data = getDataForYearAndType(rawData)

  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: containerID,
    autoFit: true,
    height: 500,
  })

  // Step 2: 载入数据源
  chart.data(data)

  // Step 3: 创建图形语法，绘制柱状图
  chart.scale('amount', {
    alias: '金额(元)',
  })
  chart.axis('year', {
    tickLine: null,
  })

  chart.axis('amount', {
    title: {
      offset: 80,
      style: {
        fill: '#aaaaaa',
      },
    },
  })
  chart.legend()

  chart.tooltip({
    shared: true,
    showMarkers: false,
  })
  chart.interaction('active-region')
  chart.interaction('element-highlight-by-color')

  chart
    .interval()
    .adjust('stack')
    .position('year*amount')
    .color('type', colors)
    .label('value', () => {
      return {
        position: 'middle',
        offset: 0,
        content: (originData) => {
          return originData.amount
        },
        style: {
          stroke: '#fff',
        },
      }
    })

  // Step 4: 渲染图表
  chart.render()
}

function getDataForBasicCategory(rawData) {
  const dict = {}
  let total = 0
  for (const x of rawData) {
    const category = x.category
    const amount = parseFloat(x.amount)
    if (!(category in dict)) {
      dict[category] = 0
    }
    if (amount > 0) {
      dict[category] += amount
      total += amount
    }
  }

  const data = []
  for (const category in dict) {
    const amount = dict[category]
    if (amount > 0) {
      data.push({
        category,
        amount,
        percent: amount / total,
      })
    }
  }
  return data
}

export function renderChartForBasicCategory(that, rawData) {
  const { Chart } = that.$g2

  const data = getDataForBasicCategory(rawData)

  const chart = new Chart({
    container: 'basic-category',
    autoFit: true,
    height: 500,
  })

  chart.coordinate('theta', {
    radius: 0.75,
  })

  chart.data(data)

  chart.scale('percent', {
    formatter: (val) => {
      val = val * 100 + '%'
      return val
    },
  })

  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  })

  chart
    .interval()
    .position('percent')
    .color('category')
    .label('percent', {
      content: (data) => {
        return `${data.category}: ${data.percent * 100}%`
      },
    })
    .adjust('stack')

  chart.interaction('element-active')

  chart.render()
}

function getDataForBasicAccumulated(rawData) {
  const dict = {}
  let minYear = 9999
  let maxYear = 0
  for (const x of rawData) {
    const year = parseInt(x.year)
    const amount = parseFloat(x.amount)
    if (year < minYear) {
      minYear = year
    }
    if (year > maxYear) {
      maxYear = year
    }
    if (!(year in dict)) {
      dict[year] = 0
    }
    dict[year] += amount
  }

  const data = []
  let sum = 0
  for (let i = minYear; i <= maxYear; i++) {
    if (i in dict) {
      sum += dict[i]
    }
    data.push({
      year: i,
      value: sum,
    })
  }
  return data
}

export function renderChartForBasicAccumulated(that, rawData) {
  const { Chart } = that.$g2

  const data = getDataForBasicAccumulated(rawData)
  const chart = new Chart({
    container: 'basic-accumulated',
    autoFit: true,
    height: 500,
  })

  chart.data(data)
  chart.scale({
    value: {
      min: 0,
      nice: true,
    },
    year: {
      range: [0, 1],
    },
  })
  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  })

  chart.axis('value', {
    label: {
      formatter: (val) => {
        return (parseFloat(val) / 10000).toFixed(2) + that.$t('income.10k')
      },
    },
  })

  chart.area().position('year*value')
  chart.line().position('year*value')

  chart.render()
}
