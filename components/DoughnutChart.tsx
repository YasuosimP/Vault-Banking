"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance)

  const data = {
    datasets: [
      {
        label: 'Banque',
        data: balances,
        backgroundColor: ['#FF0015', '#EE2737', '#FD4E5C'] 
      }
    ],
    labels: accountNames
  }

  return <Doughnut 
    data={data} 
    options={{
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        }
      }
    }}
  />
}

export default DoughnutChart