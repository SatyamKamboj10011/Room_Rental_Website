import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function RevenueChart({ bookings }) {
  // Process bookings data to create monthly revenue data
  const monthlyRevenue = {};
  
  bookings.forEach(booking => {
    const month = new Date(booking.checkInDate).toLocaleString('default', { month: 'short' });
    monthlyRevenue[month] =
      (monthlyRevenue[month] || 0) +
      (parseFloat(booking.totalPrice ?? booking.price) || 0);
  });

  const data = {
    labels: Object.keys(monthlyRevenue),
    datasets: [
      {
        label: 'Revenue ($)',
        data: Object.values(monthlyRevenue),
        borderColor: '#3D61DD',
        backgroundColor: 'rgba(61, 97, 221, 0.08)',
        pointBackgroundColor: '#3D61DD',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#3D61DD',
        pointHoverBorderColor: '#fff',
        pointHitRadius: 10,
        pointBorderWidth: 2,
        fill: true
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default RevenueChart;