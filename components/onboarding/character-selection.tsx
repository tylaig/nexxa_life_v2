"use client"

import * as React from "react"
import { Sparkles, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateAvatarUrl, updateOnboardingStep } from "@/lib/db/actions"

const CHARACTERS = [
  { id: "mago", name: "O Mago", icon: "🧙", desc: "Foca em conhecimento, estratégia e saúde mental." },
  { id: "ninja", name: "O Ninja", icon: "🥷", desc: "Ágil, disciplinado e focado em execução diária." },
  { id: "estrategista", name: "O Estrategista", icon: "🕵️", desc: "Analítico, focado em riqueza e produtividade." },
  { id: "monge", name: "O Monge", icon: "🧘", desc: "Equilibrado, espiritual e focado em relacionamentos." },
]

export function CharacterSelection({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)

  const handleConfirm = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const character = CHARACTERS.find(c => c.id === selected)
      if (character) {
        await updateAvatarUrl(character.icon)
        await updateOnboardingStep("diagnostic")
      }
      onComplete()
    } catch (error) {
      console.error(error)
      setSaving(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Escolha seu Avatar</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Como em todo bom RPG, sua jornada de evolução começa com a escolha de uma classe. 
            Qual delas representa melhor seu foco atual?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelected(char.id)}
              className={`flex items-start gap-4 p-4 text-left rounded-2xl border-2 transition-all ${
                selected === char.id
                  ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                  : "border-border/40 bg-muted/20 hover:border-border hover:bg-muted/40"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background border text-2xl shadow-sm">
                {char.icon}
              </div>
              <div>
                <h3 className={`font-semibold ${selected === char.id ? "text-primary" : "text-foreground"}`}>
                  {char.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {char.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="w-full sm:w-auto px-8 rounded-xl h-12 text-base shadow-lg hover:scale-105 transition-transform"
            disabled={!selected || saving}
            onClick={handleConfirm}
          >
            {saving ? "Salvando..." : "Confirmar Avatar"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
