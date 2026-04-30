'use client'

import { agendaViewTabs } from '@/components/meu-dia/agenda-content'
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
      <NavTabsList>
        {agendaViewTabs.map((tab) => (
          <NavTabsTrigger key={tab} value={tab}>
            {tab}
          </NavTabsTrigger>
        ))}
      </NavTabsList>

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
