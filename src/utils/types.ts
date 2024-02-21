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

interface Quote {
  quote: {
    USD: Price;
  };
  timestamp: string;
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

export type { Route, Coin, Quote, Symbol, Exchange };
