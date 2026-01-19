'use client';

import { motion } from 'framer-motion';
import { Bar, BarChart, XAxis, YAxis, Cell } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getClaimsBreakdown, formatCurrency } from '@/data/portalMockData';

interface ClaimsStatusChartProps {
  className?: string;
}

export default function ClaimsStatusChart({ className }: ClaimsStatusChartProps) {
  const data = getClaimsBreakdown();

  // Build chart config dynamically
  const chartConfig = data.reduce((config, item) => {
    config[item.status] = {
      label: item.status,
      color: item.fill,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
      className={`p-5 rounded-2xl bg-card border border-border ${className}`}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Claims Status</h3>
        <p className="text-sm text-muted-foreground">Breakdown by status</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis
            dataKey="status"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            width={85}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name, item) => {
                  const data = item.payload;
                  return (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-foreground">{data.status}</span>
                      <span className="text-muted-foreground">
                        {data.count} {data.count === 1 ? 'claim' : 'claims'}
                      </span>
                      <span className="font-medium text-foreground">{formatCurrency(data.amount)}</span>
                    </div>
                  );
                }}
              />
            }
          />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </motion.div>
  );
}
