"use client"

import React from "react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts"

type Scores = {
  mind: number
  health: number
  wealth: number
  relationships: number
  spirituality: number
  productivity: number
}

const LABELS: Record<keyof Scores, string> = {
  mind: "Mente",
  health: "Saúde Física",
  wealth: "Finanças",
  relationships: "Relacionamentos",
  spirituality: "Espiritualidade",
  productivity: "Produtividade",
}

export function AreaRadarChart({ scores, className }: { scores: Scores; className?: string }) {
  // Format data for Recharts
  const data = Object.entries(scores).map(([key, value]) => ({
    subject: LABELS[key as keyof Scores],
    A: value,
    fullMark: 10,
  }))

  return (
    <div className={`h-[300px] w-full ${className || ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="var(--border)" className="opacity-50" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "currentColor", fontSize: 11, fontWeight: 500 }}
            className="text-muted-foreground"
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 10]} 
            tick={{ fill: "currentColor", fontSize: 10 }}
            tickCount={6}
            className="text-muted-foreground opacity-50"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--background))", 
              borderColor: "hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              fontSize: "12px"
            }}
            itemStyle={{ color: "hsl(var(--primary))", fontWeight: "bold" }}
          />
          <Radar
            name="Score"
            dataKey="A"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
