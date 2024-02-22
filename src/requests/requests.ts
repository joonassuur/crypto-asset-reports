import baseRequest from './base-request';
import {
  Coin,
  Exchange,
  ExchangeAsset,
  ExchangeDetails,
  Symbol,
  AutocompleteResult,
  ExchangeQuotes,
} from '../utils/types';

const fetchExchanges = async (): Promise<Exchange[] | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'GET',
      path: `/exchanges`,
    });
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return [];
};

const fetchTrending = async (): Promise<{ [key: string]: Coin } | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'GET',
      path: `/trending-coins`,
    });
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

const fetchQuote = async ({
  symbol,
  start,
  end,
}: {
  symbol: string;
  start: string;
  end: string;
}): Promise<Symbol | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'GET',
      path: `/quotes?symbol=${symbol}&start=${start}&end=${end}`,
    });
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

const fetchExchangeQuotes = async ({
  id,
  start,
  end,
  interval,
}: {
  id: string;
  start: string;
  end: string;
  interval: string;
}): Promise<ExchangeQuotes | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'GET',
      path: `/exchange-quotes-historical?id=${id}&start=${start}&end=${end}&interval=${interval}`,
    });
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

const fetchExchangeAssets = async (
  id: string
): Promise<{ [key: string]: ExchangeAsset[] } | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'GET',
      path: `/exchange-assets?id=${id}`,
    });
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

const fetchExchangeDetails = async (
  id: string
): Promise<{ [key: string]: ExchangeDetails } | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'GET',
      path: `/exchange-details?id=${id}`,
    });
    if (status === 200) {
      console.log(data);
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

const fetchCoinDetails = async (
  symbol: string
): Promise<{ [key: string]: Coin } | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'GET',
      path: `/coin-details?symbol=${symbol}`,
    });
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

const fetchAutocomplete = async (
  keyword: string
): Promise<AutocompleteResult | null> => {
  try {
    const { status, data } = await baseRequest({
      method: 'POST',
      path: `/search`,
      data: {
        keyword,
        scene: 'community',
        limit: 5,
      },
    });
    if (status === 200) {
      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

export {
  fetchQuote,
  fetchAutocomplete,
  fetchTrending,
  fetchCoinDetails,
  fetchExchanges,
  fetchExchangeDetails,
  fetchExchangeAssets,
  fetchExchangeQuotes,
};
