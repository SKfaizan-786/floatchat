"use client"

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface OceanChartProps {
  data: {
    chartType: string
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      tension?: number
    }>
  }
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
}

export function OceanChart({ data, title, xAxisLabel, yAxisLabel }: OceanChartProps) {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e1e7ef'
        }
      },
      title: {
        display: !!title,
        text: title,
        color: '#e1e7ef'
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
          color: '#e1e7ef'
        },
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)'
        }
      },
      y: {
        display: true,
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          color: '#e1e7ef'
        },
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)'
        }
      },
    },
  }

  const chartData = {
    labels: data.labels,
    datasets: data.datasets,
  }

  return (
    <div className="w-full h-full">
      <Line options={options} data={chartData} />
    </div>
  )
}
