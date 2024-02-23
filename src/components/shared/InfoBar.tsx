import React from 'react';
import { faker } from '@faker-js/faker';
import { Divider, Box, Typography } from '@mui/material';

function InfoBar() {
  const cryptoValuation = faker.finance.amount();
  const exchangeValuation = faker.finance.amount({ min: 500, max: 900 });
  const mCap = faker.finance.amount({ min: 1, max: 5 });
  return (
    <Box mb="24px">
      <Divider sx={{ mb: '8px' }} />
      <Box
        display="flex"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Typography variant="subtitle2" mr="8px">
          <span style={{ fontWeight: 700 }}>Cryptos: </span>
          {cryptoValuation}M+
        </Typography>
        <Typography variant="subtitle2" mr="8px">
          Exchanges: {Math.round(Number(exchangeValuation))}
        </Typography>
        <Typography variant="subtitle2" mr="8px">
          Market Cap: ${mCap}T
        </Typography>
        <Typography variant="subtitle2" mr="8px">
          24h Vol:
        </Typography>
        <Typography variant="subtitle2" mr="8px">
          Dominance:
        </Typography>
        <Typography variant="subtitle2" mr="8px">
          ETH Gas:
        </Typography>
        <Typography variant="subtitle2">Fear & Greed::</Typography>
      </Box>
      <Divider sx={{ mt: '8px' }} />
    </Box>
  );
}

export default InfoBar;
