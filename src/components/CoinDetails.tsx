import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import {
  Box,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { roundToTwoDecimals } from '../utils/helpers';
import { fetchCoinDetails } from '../requests/requests';
import { faker } from '@faker-js/faker';
import { Coin } from '../utils/types';

function CoinDetailsListTitem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <Box display="flex" justifyContent="space-between">
            {label}
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {roundToTwoDecimals(value)}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
}

function CoinDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [coinDetails, setCoinDetails] = useState<{
    [key: string]: Coin;
  } | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const coinDetailsResponse = await fetchCoinDetails(id);
        setCoinDetails(coinDetailsResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <CircularProgress />;
  return !id || !coinDetails || !coinDetails[id] ? null : (
    <Box display="flex" alignItems="flex-end" mb="12px">
      <Card sx={{ ml: '12px', width: { xs: '100%', xl: '60%' } }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <List
            dense
            disablePadding
            sx={{
              width: '100%',
              maxWidth: 360,
              pr: '24px',
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" display="flex" alignItems="center">
                      <Avatar
                        alt={coinDetails[id]?.symbol}
                        src={faker.image.avatar()}
                        sx={{ marginRight: '12px' }}
                      />
                      {coinDetails[id]?.symbol}{' '}
                      {`$${roundToTwoDecimals(
                        coinDetails[id]?.quote?.USD.price
                      )}`}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <CoinDetailsListTitem
              label="Market cap"
              value={roundToTwoDecimals(coinDetails[id]?.quote?.USD.market_cap)}
            />
            <CoinDetailsListTitem
              label="Volume (24h)"
              value={roundToTwoDecimals(coinDetails[id]?.quote?.USD.volume_24h)}
            />
            <CoinDetailsListTitem
              label="Circulating supply"
              value={coinDetails[id]?.circulating_supply}
            />
          </List>
          <List
            dense
            disablePadding
            sx={{
              width: '100%',
              maxWidth: 360,
            }}
          >
            <CoinDetailsListTitem
              label="Total supply"
              value={coinDetails[id]?.total_supply}
            />
            <CoinDetailsListTitem
              label="Max. supply"
              value={coinDetails[id]?.max_supply}
            />
            <CoinDetailsListTitem
              label="Fully diluted market cap"
              value={roundToTwoDecimals(coinDetails[id]?.quote?.USD.volume_24h)}
            />
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CoinDetails;
