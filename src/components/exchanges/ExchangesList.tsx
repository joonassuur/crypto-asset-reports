import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip, Box, Avatar, Link } from '@mui/material';
import { Exchange } from '../../utils/types';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {
  roundToTwoDecimals,
  convertRangeAndRound,
  rootURL,
} from '../../utils/helpers';

const fiats = ['EUR', 'USD'];
const getChipColor = (value: number) => {
  if (value > 5.9) {
    return 'success';
  }
  if (value > 4) {
    return 'warning';
  }
  return 'error';
};

export const chartOptions = {
  responsive: true,
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      display: false,
      position: 'top' as const,
    },
    tooltip: {
      enabled: false, // disables tooltips
    },
  },
  scales: {
    x: {
      display: false, // Hide x-axis
    },
    y: {
      display: false, // Hide y-axis
    },
  },
};

const getVolumeGraph = (id: number, exchangeQuotes: any) => {
  const data = {
    labels: exchangeQuotes?.[id].quotes.map(({ timestamp }: any) => timestamp),
    datasets: [
      {
        data: exchangeQuotes?.[id].quotes.map(
          ({ quote }: any) => quote.USD.volume_24h
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={chartOptions} data={data} />;
};

interface Props {
  exchanges: Exchange[];
  exchangeQuotes: any;
}

function ExchangesList({ exchanges, exchangeQuotes }: Props) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="exchanges table"
        summary="Exchanges List"
      >
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Exchange</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right" width="200px">
              Trading volume (24h)
            </TableCell>
            <TableCell align="right">Avg. Liquidity</TableCell>
            <TableCell align="right">Fiat Supported</TableCell>
            <TableCell align="right">Volume Graph (7d)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchanges.map((exchange) => (
            <TableRow
              key={exchange.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row">{exchange.rank}</TableCell>
              <TableCell
                scope="row"
                align="right"
                sx={{ verticalAlign: 'middle' }}
              >
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Avatar
                    alt={exchange.name}
                    src={faker.image.avatar()}
                    sx={{ width: 24, height: 24, mr: '12px' }}
                  />
                  <Link
                    component={RouterLink}
                    to={`${rootURL}exchanges/${exchange.id}`}
                  >
                    {exchange.name}
                  </Link>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Chip
                  color={getChipColor(
                    convertRangeAndRound(exchange.exchange_score)
                  )}
                  label={convertRangeAndRound(exchange.exchange_score)}
                />
              </TableCell>
              <TableCell align="right">
                ${roundToTwoDecimals(exchange.quote.USD.volume_24h)}
              </TableCell>
              <TableCell align="right">
                {roundToTwoDecimals(exchange.quote.USD.effective_liquidity_24h)}
              </TableCell>
              <TableCell align="right">
                {fiats.map((fiat) => fiat).join(', ')}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  // @ts-ignore
                  textAlign: '-webkit-right',
                }}
                sx={{
                  textAlign: '-moz-right',
                }}
              >
                <Box
                  sx={{
                    height: '60px',
                    flex: 1,
                  }}
                >
                  {getVolumeGraph(exchange.id, exchangeQuotes)}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExchangesList;
