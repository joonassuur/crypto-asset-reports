import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fetchExchanges, fetchExchangeQuotes } from '../requests/requests';
import { Exchange, ExchangeQuotes } from '../utils/types';
import { Typography, CircularProgress } from '@mui/material';
import { sevenDaysAgo } from '../utils/helpers';
import ExchangesList from '../components/exchanges/ExchangesList';

function Exchanges() {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [exchangeQuotes, setExchangeQuotes] = useState<ExchangeQuotes | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const exchangesResponse = await fetchExchanges();
        if (exchangesResponse) {
          const exchangeIds = exchangesResponse.map((exchange) => exchange.id);
          const joinedIds = exchangeIds.join(',');
          if (!joinedIds) return;
          const exchangeQuotesResponse = await fetchExchangeQuotes({
            id: joinedIds,
            start: format(sevenDaysAgo, 'yyyy-MM-dd'),
            end: format(new Date(), 'yyyy-MM-dd'),
            interval: '7d',
          });
          if (exchangeQuotesResponse) {
            setExchangeQuotes(exchangeQuotesResponse);
          }
        }
        if (exchangesResponse) {
          setExchanges(exchangesResponse);
        }
      } catch (error) {
        console.error('Error fetching exchanges', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <CircularProgress />;
  return !exchanges ? (
    <div>No exchanges found from server</div>
  ) : (
    <>
      <Typography variant="h6" mb="24px" fontWeight="bold">
        Exchanges
      </Typography>
      <ExchangesList exchanges={exchanges} exchangeQuotes={exchangeQuotes} />
    </>
  );
}

export default Exchanges;
