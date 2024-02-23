import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs, Typography, Link, CircularProgress } from '@mui/material';
import { rootURL } from '../utils/helpers';
import ExchangeDetails from '../components/exchanges/ExchangeDetails';
import {
  ExchangeAsset,
  ExchangeDetails as ExchangeDetailsType,
} from '../utils/types';
import {
  fetchExchangeDetails,
  fetchExchangeAssets,
} from '../requests/requests';

function ExchangeDetailView() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [exchangeDetails, setExchangeDetails] = useState<{
    [key: string]: ExchangeDetailsType;
  } | null>(null);
  const [exchangeAssets, setExchangeAssetsResponse] = useState<{
    [key: string]: ExchangeAsset[];
  } | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const exchangeDetailsResponse = await fetchExchangeDetails(id);
        const exchangeAssetsResponse = await fetchExchangeAssets(id);
        setExchangeDetails(exchangeDetailsResponse);
        setExchangeAssetsResponse(exchangeAssetsResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <CircularProgress />;
  return !id || !exchangeDetails || !exchangeAssets ? null : (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '24px' }}>
        <Link component={RouterLink} to={`${rootURL}exchanges`}>
          Exchanges
        </Link>
        <Typography color="text.primary">
          {exchangeDetails?.[id]?.name}
        </Typography>
      </Breadcrumbs>
      <ExchangeDetails
        exchangeAssets={exchangeAssets?.[id]}
        exchangeDetails={exchangeDetails?.[id]}
      />
    </>
  );
}

export default ExchangeDetailView;
