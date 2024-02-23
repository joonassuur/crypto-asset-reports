import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Link, Avatar, Box } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Coin } from '../../utils/types';
import { faker } from '@faker-js/faker';
import {
  roundToTwoDecimals,
  getTableValueColor,
  rootURL,
  getTableValueArrow,
} from '../../utils/helpers';

interface Props {
  coins: { [key: string]: Coin };
}
function TrendingCoinsList({ coins }: Props) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="coins table"
        summary="Trending Coins List"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">1h %</TableCell>
            <TableCell align="right">24h %</TableCell>
            <TableCell align="right">7d %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(coins).map(([key, value]) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Avatar
                    alt={key}
                    src={faker.image.avatar()}
                    sx={{ width: 24, height: 24, mr: '12px' }}
                  />
                  <Link
                    component={RouterLink}
                    to={`${rootURL}cryptocurrencies/${key}`}
                  >
                    {key}
                  </Link>
                </Box>
              </TableCell>
              <TableCell align="right">
                ${roundToTwoDecimals(value.quote.USD.price)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 'bold',
                  color: getTableValueColor(value.quote.USD.percent_change_1h),
                  '&::before': getTableValueArrow(
                    value.quote.USD.percent_change_1h
                  ),
                }}
              >
                {roundToTwoDecimals(value.quote.USD.percent_change_1h)}%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: getTableValueColor(value.quote.USD.percent_change_24h),
                  '&::before': getTableValueArrow(
                    value.quote.USD.percent_change_24h
                  ),
                }}
              >
                {roundToTwoDecimals(value.quote.USD.percent_change_24h)}%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: getTableValueColor(value.quote.USD.percent_change_7d),
                  '&::before': getTableValueArrow(
                    value.quote.USD.percent_change_7d
                  ),
                }}
              >
                {roundToTwoDecimals(value.quote.USD.percent_change_7d)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TrendingCoinsList;
