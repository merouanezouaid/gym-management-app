import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];

export default function AppConversionRates({data}) {

  const chartData = typeof data !== "undefined"
      ? [{data: data.map((item) => item.members)}]
      : [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }] ;

  const chartOptions = merge(BaseOptionChart(), {
      tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#Total`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: typeof data !== "undefined"
      ? data.map((item) => item.sport.name) : ["sports"],
    }
  });

  return (
    <Card>
      <CardHeader title="Total Members" subheader="by Sport" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
