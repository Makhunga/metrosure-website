'use client';

import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  paymentTrends,
  chartColours,
  formatCurrency,
} from '@/data/portalMockData';

const chartConfig = {
  amount: {
    label: 'Premium Paid',
    color: chartColours.primary,
  },
} satisfies ChartConfig;

interface PremiumTrendChartProps {
  className?: string;
}

export default function PremiumTrendChart({ className }: PremiumTrendChartProps) {
  // Get last 6 months of data for a cleaner display
  const data = paymentTrends.slice(-6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className={`p-5 rounded-2xl bg-card border border-border ${className}`}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Premium Payments</h3>
        <p className="text-sm text-muted-foreground">Monthly premium trend</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColours.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColours.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.split(' ')[0]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            width={45}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => formatCurrency(Number(value))}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={chartColours.primary}
            strokeWidth={2}
            fill="url(#premiumGradient)"
          />
        </AreaChart>
      </ChartContainer>
    </motion.div>
  );
}
