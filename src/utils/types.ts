interface Route {
  key: string;
  name: string;
}

interface Price {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  last_updated: string;
  timestamp: string;
}

interface Token {
  category: string;
  id: number;
  is_active: 0;
  is_listed: 0;
  name: string;
  rank: number;
  slug: string;
  symbol: string;
}

interface Quote {
  quote: {
    USD: Price;
  };
  timestamp: string;
}

interface ExchangeAsset {
  wallet_address: string;
  balance: number;
  platform: {
    crypto_id: number;
    symbol: string;
    name: string;
  };
  currency: {
    crypto_id: number;
    price_usd: number;
    symbol: string;
    name: string;
  };
}

interface ExchangeDetails {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  date_launched: string;
  notice: null;
  countries: never[];
  fiats: string[];
  tags: null;
  type: null;
  maker_fee: number;
  taker_fee: number;
  weekly_visits: number;
  spot_volume_usd: number;
  spot_volume_last_updated: string;
  urls: {
    website: string[];
    twitter: string[];
    blog: never[];
    chat: string[];
    fee: string[];
  };
}

interface Exchange {
  id: number;
  name: string;
  slug: string;
  num_market_pairs: number;
  fiats: string[];
  traffic_score: number;
  rank: number;
  exchange_score: number;
  liquidity_score: number;
  last_updated: string;
  quote: {
    USD: {
      volume_24h: number;
      volume_24h_adjusted: number;
      volume_7d: number;
      volume_30d: number;
      percent_change_volume_24h: number;
      percent_change_volume_7d: number;
      percent_change_volume_30d: number;
      effective_liquidity_24h: number;
      derivative_volume_usd: number;
      spot_volume_usd: number;
    };
  };
}

interface Symbol {
  [key: string]: {
    id: number;
    is_active: number;
    is_fiat: number | null;
    name: string;
    quotes: Quote[];
    symbol: string;
  };
}

interface ExchangeQuotes {
  [key: string]: {
    quotes: Quote[];
    id: number;
    name: string;
    slug: string;
  };
}

interface AutocompleteResult {
  suggestions: [
    never,
    {
      tokens: Token[];
    }
  ];
}

interface Coin {
  id: string;
  symbol: string;
  name: string;
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  is_active: number;
  is_fiat: number | null;
  last_updated: string;
  max_supply: number;
  num_market_pairs: number;
  platform: string | null;
  quote: { USD: Price };
  slug: string;
  total_supply: number;
}

export type {
  Route,
  Coin,
  Quote,
  Symbol,
  Exchange,
  ExchangeAsset,
  ExchangeDetails,
  Token,
  ExchangeQuotes,
  AutocompleteResult,
};
