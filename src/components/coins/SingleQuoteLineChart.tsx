import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchQuote } from '../../requests/requests';
import { Symbol, Quote } from '../../utils/types';
import { Line } from 'react-chartjs-2';

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
  },
};

const getLabels = (quote: Symbol | null, id: string, range: string) => {
  if (!id) return [];
  const dateLabels = quote?.[id]?.quotes?.map(
    ({ timestamp }: { timestamp: string }) =>
      format(timestamp, range === '1D' ? 'HH:mm' : 'dd.MM.yyyy')
  );
  return dateLabels || [];
};

const getChartData = (
  quote: Symbol | null,
  id: string,
  selectedChartType: string
) => {
  if (!id) return [];
  const data = quote?.[id]?.quotes?.map(({ quote }: Quote) => {
    if (selectedChartType === 'Price') return quote.USD.price;
    if (selectedChartType === 'Market cap') return quote.USD.market_cap;
    return 0;
  });
  return data || [];
};

function SingleQuoteLineChart({
  id,
  range,
  selectedChartType,
  start,
  end,
}: {
  id: string;
  range: string;
  start: string;
  end: string;
  selectedChartType: string;
}) {
  const [quote, setQuote] = useState<Symbol | null>(null);
  const labels = getLabels(quote, id, range);
  const chartData = getChartData(quote, id, selectedChartType);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const quoteResponse = await fetchQuote({
          symbol: id,
          start,
          end,
        });
        setQuote(quoteResponse);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, start, end]);

  const data = {
    labels,
    datasets: [
      {
        label: id,
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  if (!quote) return <div>Loading...</div>;
  return <Line height={110} options={chartOptions} data={data} />;
}

export default SingleQuoteLineChart;
