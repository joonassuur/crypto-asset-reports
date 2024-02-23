import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import ExchangeContacts from './ExchangeContacts';
import { roundToTwoDecimals } from '../../utils/helpers';
import { faker } from '@faker-js/faker';
import {
  ExchangeAsset,
  ExchangeDetails as ExchangeDetailsType,
} from '../../utils/types';
import { useParams } from 'react-router-dom';

interface Props {
  exchangeDetails: ExchangeDetailsType;
  exchangeAssets: ExchangeAsset[];
}

function calculateTotalAssets(exchangeAssets: any) {
  let totalAssets = 0;
  for (let i = 0; i < exchangeAssets.length; i++) {
    totalAssets +=
      exchangeAssets[i].balance * exchangeAssets[i].currency.price_usd;
  }
  return totalAssets;
}
const fakerParagraph1 = faker.lorem.paragraphs(5);
const fakerParagraph2 = faker.lorem.paragraphs(3);
function ExchangeDetails({ exchangeDetails, exchangeAssets }: Props) {
  const { id } = useParams();
  return !id ? null : (
    <Grid container spacing={2} justifyContent="flex-start">
      <Grid item container xs flexGrow="0!important" alignItems="flex-start">
        <ExchangeContacts exchangeDetails={exchangeDetails} />
      </Grid>
      <Grid item container xs={12} lg={7} xl={6}>
        <Grid item container xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Spot Trading Volume(24h)</Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${roundToTwoDecimals(exchangeDetails.spot_volume_usd)} T
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Total assets</Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${roundToTwoDecimals(calculateTotalAssets(exchangeAssets))}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">About {exchangeDetails.name}</Typography>
          <Typography variant="body1">{fakerParagraph1}</Typography>
          <Typography variant="h6" mt="12px">
            Who are {exchangeDetails.name} founders?
          </Typography>
          <Typography variant="body1">{fakerParagraph2}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ExchangeDetails;
