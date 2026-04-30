'use client'

import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { reportsChartConfig, reportsWeeklySeries } from '@/components/meu-dia/reports-content'
import { meuDiaWeeklySystemSummary } from '@/components/meu-dia/system-connections'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs'
import { dashboardAnalyticsTabs } from '@/components/meu-dia/dashboard-content'

const executionSeries = reportsWeeklySeries.map((item) => ({
  day: item.day,
  productivity: item.productivity,
  wellBeing: item.wellBeing,
}))

const wellBeingSeries = reportsWeeklySeries.map((item) => ({
  day: item.day,
  wellBeing: item.wellBeing,
  mood: item.mood,
}))

const evolutionSeries = reportsWeeklySeries.map((item, index) => ({
  day: item.day,
  productivity: item.productivity,
  mood: item.mood,
  cadence: 58 + index * 4,
}))

export function DashboardAnalyticsPanel() {
  return (
    <Tabs defaultValue={dashboardAnalyticsTabs[0]} className="w-full gap-4">
      <NavTabsList>
        {dashboardAnalyticsTabs.map((tab) => (
          <NavTabsTrigger key={tab} value={tab}>
            {tab}
          </NavTabsTrigger>
        ))}
      </NavTabsList>

      <TabsContent value="Execução" className="mt-0 space-y-4">
        <ChartContainer config={reportsChartConfig} className="h-[300px] w-full aspect-auto">
          <AreaChart data={executionSeries} margin={{ top: 8, right: 8, left: -8, bottom: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} dy={8} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} dx={-8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="productivity"
              name="productivity"
              stroke="var(--color-productivity)"
              fill="var(--color-productivity)"
              fillOpacity={0.16}
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="wellBeing"
              name="wellBeing"
              stroke="var(--color-wellBeing)"
              fill="var(--color-wellBeing)"
              fillOpacity={0.1}
              strokeWidth={2.2}
            />
          </AreaChart>
        </ChartContainer>
        <p className="text-sm text-muted-foreground">
          Execução atual: {meuDiaWeeklySystemSummary.completedTasks} tarefas concluídas, {meuDiaWeeklySystemSummary.pendingTasks} pendentes e foco principal em {meuDiaWeeklySystemSummary.focusGoal}.
        </p>
      </TabsContent>

      <TabsContent value="Bem-estar" className="mt-0 space-y-4">
        <ChartContainer config={reportsChartConfig} className="h-[300px] w-full aspect-auto">
          <LineChart data={wellBeingSeries} margin={{ top: 8, right: 8, left: -8, bottom: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} dy={8} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} dx={-8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="wellBeing"
              name="wellBeing"
              stroke="var(--color-wellBeing)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: 'var(--color-wellBeing)' }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="mood"
              stroke="var(--color-mood)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: 'var(--color-mood)' }}
            />
          </LineChart>
        </ChartContainer>
        <p className="text-sm text-muted-foreground">
          Reflexão atual: emoção predominante em {meuDiaWeeklySystemSummary.journalSignal} e leitura agregada de relatórios em {meuDiaWeeklySystemSummary.reportsSignal}.
        </p>
      </TabsContent>

      <TabsContent value="Evolução" className="mt-0 space-y-4">
        <ChartContainer config={reportsChartConfig} className="h-[300px] w-full aspect-auto">
          <LineChart data={evolutionSeries} margin={{ top: 8, right: 8, left: -8, bottom: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} dy={8} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} dx={-8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="productivity"
              name="productivity"
              stroke="var(--color-productivity)"
              strokeWidth={2.5}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="mood"
              stroke="var(--color-mood)"
              strokeWidth={2.5}
            />
          </LineChart>
        </ChartContainer>
        <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
          Evolução inicial pronta para conectar histórico real assim que a persistência do domínio substituir os datasets mockados desta fase.
        </div>
      </TabsContent>
    </Tabs>
  )
}
