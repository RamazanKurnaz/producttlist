import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/product';
import { Box, Typography, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const ClicksCount: FC = () => {
  const { clickCounts } = useSelector((state: RootState) => state.clickTracking);
  const { items } = useSelector((state: RootState) => state.products);

  // Prepare data for the pie chart
  const chartData = {
    labels: items.map(product => product.title.slice(0, 20) + '...'), // Truncate long titles
    datasets: [
      {
        label: 'Click Count',
        data: items.map(product => clickCounts[product.id] || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Product Click Distribution',
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography sx={{padding:5 }} variant="h4" gutterBottom>
        Product Click Analytics
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center' }}>
          <Pie data={chartData} options={options} />
        </Box>
        <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
         Hangi ürüne ne kadar tıklandı bu verileri 123. nott: On mouse eventi ile kaç sanıye görüntülendi ürünler vs ekle .
        </Typography>
      </Paper>
    </Box>
  );
};

export default ClicksCount;
