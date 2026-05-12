"use client"

import { useState } from "react"
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Clock, Video, MapPin, AlignLeft } from "lucide-react"
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
  focus:    { bg: "bg-teal-500/10 hover:bg-teal-500/20",    border: "border-teal-500/30",    dot: "bg-teal-500",    label: "Foco" },
  meeting:  { bg: "bg-blue-500/10 hover:bg-blue-500/20",    border: "border-blue-500/30",    dot: "bg-blue-500",    label: "Reunião" },
  personal: { bg: "bg-violet-500/10 hover:bg-violet-500/20",  border: "border-violet-500/30",  dot: "bg-violet-500",  label: "Pessoal" },
  health:   { bg: "bg-emerald-500/10 hover:bg-emerald-500/20", border: "border-emerald-500/30", dot: "bg-emerald-500", label: "Saúde" },
}

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
                isSelected ? "bg-primary text-primary-foreground shadow-sm" : isToday ? "bg-primary/10 text-primary" : "hover:bg-accent text-foreground"
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

function parseTimeToMinutes(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number)
  return (h * 60) + (m || 0)
}

function TimelineView({ events }: { events: AgendaEvent[] }) {
  // Constant for row height
  const HOUR_HEIGHT = 64 // pixels
  const START_HOUR = 6
  const END_HOUR = 23
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)

  return (
    <div className="relative mt-4 flex">
      {/* Time axis */}
      <div className="w-16 flex-none border-r border-border/50 bg-background/50 z-10 sticky left-0">
        {hours.map((hour) => (
          <div key={hour} className="relative pr-3 text-right text-xs text-muted-foreground" style={{ height: HOUR_HEIGHT }}>
            <span className="absolute -top-2 right-3 font-medium">
              {hour.toString().padStart(2, "0")}:00
            </span>
          </div>
        ))}
      </div>

      {/* Grid & Events area */}
      <div className="relative flex-1 bg-muted/5">
        {/* Horizontal lines */}
        {hours.map((hour) => (
          <div key={hour} className="border-b border-border/30 border-dashed" style={{ height: HOUR_HEIGHT }} />
        ))}

        {/* Current Time Indicator (if today) */}
        {/* We would need to pass isToday and current time, simplified for now */}

        {/* Events */}
        {events.map((event) => {
          const startMins = parseTimeToMinutes(event.time)
          const endMins = parseTimeToMinutes(event.endTime)
          
          // Only show events within the visible timeframe
          if (endMins <= START_HOUR * 60 || startMins >= (END_HOUR + 1) * 60) return null

          const top = ((startMins - (START_HOUR * 60)) / 60) * HOUR_HEIGHT
          const height = ((endMins - startMins) / 60) * HOUR_HEIGHT
          const style = EVENT_STYLES[event.type]

          return (
            <div
              key={event.id}
              className={cn(
                "absolute inset-x-2 rounded-xl border p-3 shadow-sm transition-all overflow-hidden flex flex-col cursor-pointer",
                style.bg,
                style.border
              )}
              style={{
                top: `${top}px`,
                height: `${height}px`,
                minHeight: "40px" // ensure tiny events are visible
              }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={cn("h-2 w-2 rounded-full flex-none", style.dot)} />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-foreground/70">
                  {style.label}
                </span>
                <span className="text-[10px] text-muted-foreground ml-auto tabular-nums font-medium">
                  {event.time} - {event.endTime}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-foreground truncate">{event.title}</h4>
              
              {height >= 80 && ( // Only show extra details if block is tall enough
                <div className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
                  {event.location && <span className="flex items-center gap-1.5 truncate"><MapPin className="h-3.5 w-3.5 flex-none" />{event.location}</span>}
                  {event.isOnline && <span className="flex items-center gap-1.5 truncate"><Video className="h-3.5 w-3.5 flex-none" />Reunião Online</span>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function NexxaLifeAgendaView({ events: rawEvents }: { events: any[] }) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Map DB data to UI shape
  const allEvents: AgendaEvent[] = rawEvents.map((e: any) => ({
    id: e.id,
    title: e.title,
    time: e.start_time?.slice(0, 5) || "00:00",
    endTime: e.end_time?.slice(0, 5) || "01:00", // Fallback to 1hr if missing
    type: (e.type || "personal") as EventType,
    location: e.location || undefined,
    isOnline: e.is_online ?? false,
  }))

  const formattedDate = selectedDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
  const isToday = selectedDate.toDateString() === new Date().toDateString()

  // For testing UI locally when empty, let's inject a fake event if the list is completely empty AND we are in dev mode
  // But since we are connected to DB, we'll let it be empty and let AI populate it.

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Organização Pessoal"
        title="Sua Agenda"
        description={`${formattedDate}${isToday ? " · Hoje" : ""}`}
        actions={
          <Button size="sm" className="h-9 gap-2 rounded-xl px-4 shadow-sm hover:shadow-md transition-shadow">
            <Plus className="h-4 w-4" /> Novo evento
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <WeekMiniCal selectedDate={selectedDate} onSelect={setSelectedDate} />
          
          {/* Calendário Mensal Estático (Mock visual para a refatoração) */}
          <SectionCard title="Navegação Mensal" action={<ChevronRight className="h-4 w-4 text-muted-foreground"/>}>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mt-2">
              {WEEK_LABELS.map(l => <div key={l} className="text-muted-foreground font-medium pb-2">{l[0]}</div>)}
              {Array.from({length: 31}, (_, i) => (
                <div key={i} className={cn("p-1.5 rounded-md", i===14 ? "bg-primary text-primary-foreground font-bold shadow-sm" : "hover:bg-muted cursor-pointer")}>{i+1}</div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Categorias">
            <ul className="space-y-3 mt-1">
              {Object.entries(EVENT_STYLES).map(([key, s]) => (
                <li key={key} className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground transition-colors">
                  <span className={cn("h-3 w-3 rounded-md", s.dot)} />
                  {s.label}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <SectionCard
          title={isToday ? "Sua Timeline (Hoje)" : `Timeline (${formattedDate})`}
          action={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-xs flex items-center gap-1.5">
                <AlignLeft className="h-3.5 w-3.5" /> Ver em Lista
              </Button>
              <Button variant="secondary" size="sm" className="h-8 rounded-lg px-3 text-xs" onClick={() => setSelectedDate(new Date())}>
                Ir para hoje
              </Button>
            </div>
          }
          noPadding
          className="overflow-hidden flex flex-col shadow-sm"
        >
          {allEvents.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="Sua agenda está vazia"
              description="Você não possui nenhum evento planejado para este dia. Peça para a IA organizar sua rotina!"
              action={{ label: "Adicionar primeiro evento", href: "#" }}
              className="m-8 border-dashed py-12"
            />
          ) : (
            <div className="flex-1 overflow-y-auto max-h-[800px] custom-scrollbar">
               <TimelineView events={allEvents} />
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
