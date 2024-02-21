import React, { useState, useEffect } from 'react';
import { fetchTrending } from '../requests/requests';
import { Coin } from '../utils/types';
import { Typography, CircularProgress } from '@mui/material';
import TrendingCoinsList from '../components/TrendingCoinsList';

function Home() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<{ [key: string]: Coin } | null>(null);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await fetchTrending();
        if (result) {
          setCoins(result);
        }
      } catch (error) {
        console.error('Error fetching trending coins', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <CircularProgress />;
  return !coins ? (
    <div>No cryptocurrencies found from server</div>
  ) : (
    <div>
      <Typography variant="h6" mb="24px" fontWeight="bold">
        Cryptocurrencies
      </Typography>
      {<TrendingCoinsList coins={coins} />}
    </div>
  );
}

export default Home;
