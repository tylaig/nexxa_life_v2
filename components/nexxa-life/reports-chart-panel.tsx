'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

import {
  reportsChartConfig,
  reportsChartTabs,
  reportsComparisonSeries,
  reportsWeeklySeries,
} from '@/components/nexxa-life/reports-content'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs'

export function ReportsChartPanel() {
  return (
    <Tabs defaultValue={reportsChartTabs[0]} className="w-full gap-4">
      <div className="flex flex-col gap-3 border-b border-border/70 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Leitura gráfica</div>
          <p className="text-sm text-muted-foreground">
            Alterne entre tendência semanal e comparativo percentual para ler evolução e base anterior sem misturar contextos.
          </p>
        </div>
        <NavTabsList>
          {reportsChartTabs.map((tab) => (
            <NavTabsTrigger key={tab} value={tab}>
              {tab}
            </NavTabsTrigger>
          ))}
        </NavTabsList>
      </div>

      <TabsContent value="Evolução 7 Dias" className="mt-0 space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background/60 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Melhor dia</div>
            <div className="mt-1 text-sm font-semibold text-foreground">Sex · bem-estar 81%</div>
          </div>
          <div className="rounded-2xl border border-border bg-background/60 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Maior oscilação</div>
            <div className="mt-1 text-sm font-semibold text-foreground">Produtividade no fim de semana</div>
          </div>
          <div className="rounded-2xl border border-border bg-background/60 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Leitura</div>
            <div className="mt-1 text-sm font-semibold text-foreground">Humor acima da execução</div>
          </div>
        </div>

        <ChartContainer config={reportsChartConfig} className="h-[280px] w-full aspect-auto md:h-[320px]">
          <LineChart data={[...reportsWeeklySeries]} margin={{ top: 8, right: 8, left: -8, bottom: 8 }}>
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
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="productivity"
              name="productivity"
              stroke="var(--color-productivity)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: 'var(--color-productivity)' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="mood"
              stroke="var(--color-mood)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: 'var(--color-mood)' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>

        <p className="text-sm leading-6 text-muted-foreground">
          A semana mostra sustentação positiva em bem-estar e humor, com produtividade mais irregular nos blocos de menor estrutura.
        </p>
      </TabsContent>

      <TabsContent value="Comparativo %" className="mt-0 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/60 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Melhor delta</div>
            <div className="mt-1 text-sm font-semibold text-foreground">Bem-estar +7 p.p.</div>
          </div>
          <div className="rounded-2xl border border-border bg-background/60 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Gap restante</div>
            <div className="mt-1 text-sm font-semibold text-foreground">Produtividade ainda pede estabilização</div>
          </div>
        </div>

        <ChartContainer config={reportsChartConfig} className="h-[280px] w-full aspect-auto md:h-[320px]">
          <BarChart data={[...reportsComparisonSeries]} margin={{ top: 8, right: 8, left: -8, bottom: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="metric" axisLine={false} tickLine={false} dy={8} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} dx={-8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="current" name="current" fill="var(--color-current)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="baseline" name="baseline" fill="var(--color-baseline)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>

        <p className="text-sm leading-6 text-muted-foreground">
          O comparativo mostra avanço nas três dimensões principais, com ganho mais evidente em bem-estar e espaço para consolidar produtividade.
        </p>
      </TabsContent>
    </Tabs>
  )
}
