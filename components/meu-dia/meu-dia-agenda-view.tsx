"use client"

import { useState } from "react"
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Clock, Video, MapPin } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EventType = "focus" | "meeting" | "personal" | "health"

type AgendaEvent = {
  id: string
  title: string
  time: string
  endTime: string
  type: EventType
  location?: string
  isOnline?: boolean
}

const EVENT_STYLES: Record<EventType, { bg: string; border: string; dot: string; label: string }> = {
  focus:    { bg: "bg-teal-500/10",    border: "border-teal-500/30",    dot: "bg-teal-500",    label: "Foco" },
  meeting:  { bg: "bg-blue-500/10",    border: "border-blue-500/30",    dot: "bg-blue-500",    label: "Reunião" },
  personal: { bg: "bg-violet-500/10",  border: "border-violet-500/30",  dot: "bg-violet-500",  label: "Pessoal" },
  health:   { bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-500", label: "Saúde" },
}

const MOCK_EVENTS: AgendaEvent[] = [
  { id: "1", title: "Deep work — MVP auth", time: "08:00", endTime: "10:00", type: "focus" },
  { id: "2", title: "Alinhamento com time", time: "10:30", endTime: "11:00", type: "meeting", isOnline: true },
  { id: "3", title: "Almoço + pausa", time: "12:00", endTime: "13:00", type: "personal" },
  { id: "4", title: "Revisão do plano semanal", time: "14:00", endTime: "15:00", type: "focus" },
  { id: "5", title: "Treino — academia", time: "18:00", endTime: "19:00", type: "health", location: "Academia" },
  { id: "6", title: "Leitura + diário", time: "21:00", endTime: "21:30", type: "personal" },
]

function getMiniCalDays() {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    return d
  })
}

const WEEK_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

function WeekMiniCal({ selectedDate, onSelect }: { selectedDate: Date; onSelect: (d: Date) => void }) {
  const days = getMiniCalDays()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <SectionCard
      title="Esta semana"
      action={
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg"><ChevronLeft className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg"><ChevronRight className="h-3.5 w-3.5" /></Button>
        </div>
      }
    >
      <div className="grid grid-cols-7 gap-1">
        {WEEK_LABELS.map((l) => (
          <div key={l} className="text-center text-[10px] font-medium text-muted-foreground pb-1">{l}</div>
        ))}
        {days.map((day) => {
          const isToday = day.getTime() === today.getTime()
          const isSelected = day.toDateString() === selectedDate.toDateString()
          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelect(day)}
              className={cn(
                "flex h-9 w-full flex-col items-center justify-center rounded-xl text-sm font-medium transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : isToday ? "bg-primary/10 text-primary" : "hover:bg-accent text-foreground"
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}

function EventRow({ event }: { event: AgendaEvent }) {
  const style = EVENT_STYLES[event.type]
  return (
    <div className={cn("flex gap-3 rounded-xl border p-3 transition-colors hover:brightness-[0.98]", style.bg, style.border)}>
      <div className="flex flex-col items-end pt-0.5 text-xs tabular-nums text-muted-foreground min-w-[52px]">
        <span className="font-medium text-foreground">{event.time}</span>
        <span>{event.endTime}</span>
      </div>
      <div className={cn("w-0.5 rounded-full self-stretch", style.dot)} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{event.title}</p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {event.time}–{event.endTime}
          </span>
          {event.location ? <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span> : null}
          {event.isOnline ? <span className="flex items-center gap-1"><Video className="h-3 w-3" />Online</span> : null}
        </div>
      </div>
    </div>
  )
}

export function NexxaLifeAgendaView() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const formattedDate = selectedDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
  const isToday = selectedDate.toDateString() === new Date().toDateString()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Organização"
        title="Agenda"
        description={`${formattedDate}${isToday ? " · Hoje" : ""}`}
        actions={
          <Button size="sm" className="h-8 gap-1.5 rounded-xl px-3 text-xs">
            <Plus className="h-3.5 w-3.5" /> Novo evento
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        {/* Coluna esq — mini calendário */}
        <div className="space-y-4">
          <WeekMiniCal selectedDate={selectedDate} onSelect={setSelectedDate} />
          <SectionCard title="Tipos de evento">
            <ul className="space-y-2">
              {Object.entries(EVENT_STYLES).map(([key, s]) => (
                <li key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={cn("h-2.5 w-2.5 rounded-full", s.dot)} />
                  {s.label}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* Timeline do dia */}
        <SectionCard
          title={isToday ? "Hoje" : formattedDate}
          action={
            <Button variant="ghost" size="sm" className="h-7 rounded-lg px-2 text-xs" onClick={() => setSelectedDate(new Date())}>
              Ir para hoje
            </Button>
          }
          noPadding
        >
          {MOCK_EVENTS.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="Dia livre"
              description="Nenhum evento agendado para este dia."
              action={{ label: "Adicionar evento", href: "/agenda" }}
              className="m-4 border-dashed"
            />
          ) : (
            <div className="space-y-2 p-4">
              {MOCK_EVENTS.map((event) => <EventRow key={event.id} event={event} />)}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
