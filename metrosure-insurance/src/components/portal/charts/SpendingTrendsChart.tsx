'use client';

import { motion } from 'framer-motion';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  getMonthlySpendingTrends,
  chartColours,
  formatCurrency,
} from '@/data/portalMockData';

const chartConfig = {
  premiums: {
    label: 'Premiums Paid',
    color: chartColours.primary,
  },
  claims: {
    label: 'Claims Received',
    color: chartColours.approved,
  },
} satisfies ChartConfig;

interface SpendingTrendsChartProps {
  className?: string;
}

export default function SpendingTrendsChart({ className }: SpendingTrendsChartProps) {
  const data = getMonthlySpendingTrends().slice(-6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
      className={`p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-light)] ${className}`}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-[var(--text-main)]">Spending Trends</h3>
        <p className="text-sm text-[var(--text-muted)]">Premiums vs Claims</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--border-light)"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.split(' ')[0]}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              if (value === 0) return 'R0';
              if (value >= 1000) return `R${(value / 1000).toFixed(0)}k`;
              return `R${value}`;
            }}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            width={45}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => {
                  const label = name === 'premiums' ? 'Premiums' : 'Claims';
                  return (
                    <span className="text-[var(--text-main)]">
                      {label}: {formatCurrency(Number(value))}
                    </span>
                  );
                }}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="premiums"
            stroke={chartColours.primary}
            strokeWidth={2}
            dot={{ fill: chartColours.primary, strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="claims"
            stroke={chartColours.approved}
            strokeWidth={2}
            dot={{ fill: chartColours.approved, strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </motion.div>
  );
}
