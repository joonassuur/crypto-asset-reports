import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import {
  Box,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  CardActions,
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { roundToTwoDecimals } from '../../utils/helpers';
import { fetchCoinDetails } from '../../requests/requests';
import { faker } from '@faker-js/faker';
import { Language, InsertDriveFileOutlined, GitHub } from '@mui/icons-material';
import { Coin } from '../../utils/types';

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

const imageAvatar = faker.image.avatar();
function CoinDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        navigate('/cryptocurrencies', { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  if (loading) return <CircularProgress />;
  if (!id || !coinDetails || !coinDetails[id]) return null;
  const coinDetailsKey = coinDetails[id.toUpperCase()];
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      mb="12px"
      aria-label={`${coinDetails[id]} details`}
    >
      <Card sx={{ ml: '12px', width: { xs: '100%', xl: '60%' } }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            pb: 0,
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
                        alt={coinDetailsKey?.symbol}
                        src={imageAvatar}
                        sx={{ marginRight: '12px' }}
                      />
                      {coinDetailsKey?.symbol}{' '}
                      {`$${roundToTwoDecimals(
                        coinDetailsKey?.quote?.USD.price
                      )}`}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <CoinDetailsListTitem
              label="Market cap"
              value={roundToTwoDecimals(coinDetailsKey?.quote?.USD.market_cap)}
            />
            <CoinDetailsListTitem
              label="Volume (24h)"
              value={roundToTwoDecimals(coinDetailsKey?.quote?.USD.volume_24h)}
            />
            <CoinDetailsListTitem
              label="Circulating supply"
              value={coinDetailsKey?.circulating_supply}
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
              value={coinDetailsKey?.total_supply}
            />
            <CoinDetailsListTitem
              label="Max. supply"
              value={coinDetailsKey?.max_supply}
            />
            <CoinDetailsListTitem
              label="Fully diluted market cap"
              value={roundToTwoDecimals(coinDetailsKey?.quote?.USD.volume_24h)}
            />
          </List>
        </CardContent>
        <CardActions sx={{ pb: '16px', pl: '32px' }}>
          <Chip
            size="small"
            icon={<Language />}
            label="Website"
            onClick={() => {}}
            clickable
          />
          <Chip
            size="small"
            icon={<InsertDriveFileOutlined />}
            label="Whitepaper"
            onClick={() => {}}
            clickable
          />
          <Chip
            size="small"
            icon={<GitHub />}
            label="GitHub"
            onClick={() => {}}
            clickable
          />
        </CardActions>
      </Card>
    </Box>
  );
}

export default CoinDetails;
