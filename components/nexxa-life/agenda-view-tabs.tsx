'use client'

import { agendaViewTabs } from '@/components/nexxa-life/agenda-content'
import { NavTabsList, NavTabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs'

export function AgendaViewTabs({
  primaryContent,
  secondaryContent,
}: {
  primaryContent: React.ReactNode
  secondaryContent?: React.ReactNode
}) {
  return (
    <Tabs defaultValue={agendaViewTabs[0]} className="w-full gap-4">
      <div className="flex flex-col gap-3 border-b border-border/70 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Escala temporal</div>
          <p className="text-sm text-muted-foreground">
            A visão diária já está funcional. Semana, mês e ano seguem publicados como estados guiados para a próxima onda.
          </p>
        </div>
        <NavTabsList>
          {agendaViewTabs.map((tab) => (
            <NavTabsTrigger key={tab} value={tab}>
              {tab}
            </NavTabsTrigger>
          ))}
        </NavTabsList>
      </div>

      <TabsContent value="Dia" className="mt-0 space-y-4">
        {primaryContent}
      </TabsContent>

      {agendaViewTabs.slice(1).map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-0">
          {secondaryContent}
        </TabsContent>
      ))}
    </Tabs>
  )
}
