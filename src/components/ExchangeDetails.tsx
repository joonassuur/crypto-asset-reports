import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

import { roundToTwoDecimals } from '../utils/helpers';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';

interface Props {
  exchangeDetails: any;
  exchangeAssets: any;
}

function calculateTotalAssets(exchangeAssets: any) {
  let totalAssets = 0;
  for (let i = 0; i < exchangeAssets.length; i++) {
    totalAssets +=
      exchangeAssets[i].balance * exchangeAssets[i].currency.price_usd;
  }
  return totalAssets;
}

function ExchangeDetails({ exchangeDetails, exchangeAssets }: Props) {
  const { id } = useParams();
  return !id ? null : (
    <Grid container spacing={2}>
      <Grid item container xs={12} sm={6}>
        <Card sx={{ width: '100%' }}>
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Spot Trading Volume(24h)
              </Typography>
              <Typography variant="h5">
                ${roundToTwoDecimals(exchangeDetails.spot_volume_usd)} T
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total assets
              </Typography>
              <Typography variant="h5">
                ${roundToTwoDecimals(calculateTotalAssets(exchangeAssets))}
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">About {exchangeDetails.name}</Typography>
        <Typography variant="body1">{faker.lorem.paragraphs(5)}</Typography>
        <Typography variant="h6" mt="12px">
          Who are {exchangeDetails.name} founders?
        </Typography>
        <Typography variant="body1">{faker.lorem.paragraphs(3)}</Typography>
      </Grid>
    </Grid>
  );
}

export default ExchangeDetails;
