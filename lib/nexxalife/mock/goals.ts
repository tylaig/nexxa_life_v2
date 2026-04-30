import type { Goal } from "../contracts"

export const mockGoals: Goal[] = [
  {
    id: "goal_routine",
    title: "Reorganizar rotina-base",
    description: "Estabelecer uma estrutura simples de manhã, foco profundo e fechamento do dia.",
    status: "active",
    progressPercent: 38,
    pillar: "Rotina",
    targetDate: "2026-05-20",
  },
  {
    id: "goal_strategy",
    title: "Retomar meta estratégica principal",
    description: "Recuperar clareza de prioridade e voltar a avançar em uma frente de maior impacto.",
    status: "active",
    progressPercent: 22,
    pillar: "Execução",
    targetDate: "2026-06-05",
  },
  {
    id: "goal_review",
    title: "Consolidar revisão semanal",
    description: "Criar uma cadência leve para revisar objetivos, tarefas e sinais de dispersão.",
    status: "paused",
    progressPercent: 54,
    pillar: "Clareza",
    targetDate: "2026-05-30",
  },
  {
    id: "goal_closeout",
    title: "Fechar pendências operacionais rápidas",
    description: "Encerrar pequenos atritos que continuam consumindo energia no dia a dia.",
    status: "completed",
    progressPercent: 100,
    pillar: "Execução",
    targetDate: "2026-04-25",
  },
]
