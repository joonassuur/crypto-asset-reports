import React from 'react';
import { faker } from '@faker-js/faker';
import { getTableValueColor, getTableValueArrow } from '../../utils/helpers';
import { Divider, Box, Typography } from '@mui/material';

const cryptoValuation = faker.finance.amount();
const exchangeValuation = faker.finance.amount({ min: 500, max: 900 });
const mCap = faker.finance.amount({ min: 1, max: 5 });
const volume = faker.finance.amount();
const change = faker.finance.amount({ min: -10, max: 10 });
const BTCdominance = faker.finance.amount({ min: 40, max: 80 });
const ETHdominance = faker.finance.amount({ min: 10, max: 20 });
const gwei = faker.finance.amount({ min: 30, max: 60 });
const fearGreed = faker.finance.amount({ min: 0, max: 100 });

function InfoBar() {
  return (
    <Box mb="24px">
      <Divider sx={{ mb: '8px' }} />
      <Box
        display="flex"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          '& span': {
            fontWeight: 700,
          },
          '& > *': {
            fontSize: '12px !important',
            marginRight: '8px !important',
          },
        }}
      >
        <Typography variant="subtitle2">
          <span>Cryptos: </span>
          {cryptoValuation}M+
        </Typography>
        <Typography variant="subtitle2">
          <span>Exchanges: </span>
          {Math.round(Number(exchangeValuation))}
        </Typography>
        <Typography variant="subtitle2">
          <span>Market Cap: </span>${mCap}T
        </Typography>
        <Typography variant="subtitle2">
          <span>24h Vol: </span>${volume}B{' '}
          <Box
            component="span"
            sx={{
              color: getTableValueColor(Number(change)),
              '&::before': {
                ...getTableValueArrow(Number(change)),
                marginRight: '4px',
                marginLeft: '4px',
              },
            }}
          >
            {Math.abs(Number(change))}%
          </Box>
        </Typography>
        <Typography variant="subtitle2">
          <span>Dominance: </span>
          BTC: {BTCdominance}% ETH: {ETHdominance}%
        </Typography>
        <Typography variant="subtitle2">
          <span>ETH Gas: </span>
          {Math.round(Number(gwei))} Gwei
        </Typography>
        <Typography variant="subtitle2">
          <span>Fear & Greed: </span>
          {Math.round(Number(fearGreed))}/100
        </Typography>
      </Box>
      <Divider sx={{ mt: '8px' }} />
    </Box>
  );
}

export default InfoBar;
