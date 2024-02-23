import React, { useState } from 'react';
import { format } from 'date-fns';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import CustomTabs from '../components/shared/CustomTabs';
import SingleQuoteLineChart from '../components/coins/SingleQuoteLineChart';
import CoinDetails from '../components/coins/CoinDetails';
import NewsMenu from '../components/coins/NewsMenu';
import {
  sevenDaysAgo,
  yesterday,
  yearAgo,
  monthAgo,
  rootURL,
} from '../utils/helpers';

const dateRanges = ['1D', '7D', '1M'];
const chartType = ['Price', 'Market cap'];
const today = new Date();
function CoinDetailView() {
  const { id } = useParams();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>(
    dateRanges[0]
  );
  const [selectedChartType, setSelectedChartType] = useState<string>(
    chartType[0]
  );
  const [start, setStart] = useState<string>(format(yesterday, 'yyyy-MM-dd'));
  const [end, setEnd] = useState<string>(format(today, 'yyyy-MM-dd'));

  const handleTimeframeChange = (range: string) => {
    if (!id) return;
    switch (range) {
      case '1D':
        setSelectedTimeFrame('1D');
        setStart(format(yesterday, 'yyyy-MM-dd'));
        setEnd(format(today, 'yyyy-MM-dd'));
        break;
      case '7D':
        setSelectedTimeFrame('7D');
        setStart(format(sevenDaysAgo, 'yyyy-MM-dd'));
        setEnd(format(today, 'yyyy-MM-dd'));
        break;
      case '1M':
        setSelectedTimeFrame('1M');
        setStart(format(monthAgo, 'yyyy-MM-dd'));
        setEnd(format(today, 'yyyy-MM-dd'));
        break;
      case '1Y':
        setSelectedTimeFrame('1Y');
        setStart(format(yearAgo, 'yyyy-MM-dd'));
        setEnd(format(today, 'yyyy-MM-dd'));
        break;
      default:
        break;
    }
  };

  const handleChartTypeChange = (type: string) => {
    setSelectedChartType(type);
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '24px' }}>
        <Link component={RouterLink} to={`${rootURL}cryptocurrencies`}>
          Cryptocurrencies
        </Link>
        <Typography color="text.primary">{id}</Typography>
      </Breadcrumbs>
      <Box
        display="flex"
        flexDirection="column"
        width={{ xs: '100%', lg: 'calc(100% - 372px)' }}
        justifyContent="space-between"
      >
        <Box ml="-16px">
          <CoinDetails />
        </Box>
        <Box>
          <Typography variant="h6">{id || ''}/USD</Typography>
          <Box width="100%">
            <Box display="flex" justifyContent="space-between" m="12px 0">
              <CustomTabs
                tabs={chartType}
                value={selectedChartType}
                handleChange={handleChartTypeChange}
              />
              <CustomTabs
                tabs={dateRanges}
                value={selectedTimeFrame}
                handleChange={handleTimeframeChange}
              />
            </Box>
            <SingleQuoteLineChart
              selectedChartType={selectedChartType}
              range={selectedTimeFrame}
              start={start}
              end={end}
              id={id || ''}
            />
          </Box>
        </Box>
        <NewsMenu id={id || ''} />
      </Box>
    </>
  );
}

export default CoinDetailView;
