'use client';

import { motion } from 'framer-motion';
import { Pie, PieChart, Cell, Label } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  getPolicyDistribution,
  getPolicyTypeLabel,
  formatCurrency,
  chartColours,
} from '@/data/portalMockData';

interface PolicyDistributionChartProps {
  className?: string;
}

export default function PolicyDistributionChart({ className }: PolicyDistributionChartProps) {
  const data = getPolicyDistribution();

  // Calculate total premium
  const totalPremium = data.reduce((sum, item) => sum + item.premium, 0);
  const totalPolicies = data.reduce((sum, item) => sum + item.count, 0);

  // Build chart config dynamically
  const chartConfig = data.reduce((config, item) => {
    config[item.type] = {
      label: getPolicyTypeLabel(item.type as 'motor' | 'home' | 'life' | 'business' | 'travel'),
      color: item.fill,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
      className={`p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-light)] ${className}`}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-[var(--text-main)]">Policy Distribution</h3>
        <p className="text-sm text-[var(--text-muted)]">Coverage by type</p>
      </div>

      <ChartContainer config={chartConfig} className="mx-auto h-[200px] w-full">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name, item) => {
                  const data = item.payload;
                  return (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-[var(--text-main)]">{getPolicyTypeLabel(data.type)}</span>
                      <span className="text-[var(--text-muted)]">
                        {data.count} {data.count === 1 ? 'policy' : 'policies'}
                      </span>
                      <span className="font-medium text-[var(--text-main)]">{formatCurrency(data.premium)}/mo</span>
                    </div>
                  );
                }}
              />
            }
          />
          <Pie
            data={data}
            dataKey="premium"
            nameKey="type"
            innerRadius={55}
            outerRadius={80}
            strokeWidth={2}
            stroke="var(--surface-card)"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-[var(--text-main)] text-xl font-bold"
                      >
                        {totalPolicies}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 18}
                        className="fill-[var(--text-muted)] text-xs"
                      >
                        Policies
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="type" />}
            className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </motion.div>
  );
}
