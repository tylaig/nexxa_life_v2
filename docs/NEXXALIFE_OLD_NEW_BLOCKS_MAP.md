# NexxaLife — Old/New Blocks Map

Data: 2026-04-29
Objetivo: mapear o que vem do legado como referência e o que precisa nascer como bloco novo na fundação NexxaLife.

---

## 1. Convenção oficial

### `old`
Significa:
- referência visual
- benchmark de fluxo
- fonte de copy/narrativa
- material de comparação
- wrapper temporário ou espelhamento de comportamento para análise

### `new`
Significa:
- componente final
- contrato final
- estado controlado novo
- UX adaptada à nova arquitetura
- pronto para persistência real futura

### Regra crítica

`old` nunca deve virar dependência estrutural permanente do runtime.

---

## 2. Mapa por área

| Área | Origem predominante | Destino recomendado | Observação |
|---|---|---|---|
| shell do produto | `chat.meusuper.app` | `new` | usar referência estrutural do app shell |
| narrativa de entrada | `meu-dia-flow` | `new` com inspiração `old` | onboarding, landing, contexto inicial |
| dashboard cards e hierarquia | `meu-dia-flow` + shell novo | `new` | portar intenção visual, não JSX literal |
| goals/metas | `meu-dia-flow` | `new` | blocos visuais adaptados, engine reescrita |
| checklist diário | `meu-dia-flow` | `new` | lista/execução nova com contrato novo |
| agenda | `meu-dia-flow` | `new` | estrutura visual útil, domínio novo |
| diário | `meu-dia-flow` | `new` | pode herdar copy e ordem de blocos |
| relatório | `meu-dia-flow` | `new` | depende de snapshots e cálculo novos |
| framework/admin | `meu-dia-flow` | `new` | alto valor conceitual; reescrever inteiro |
| autenticação | legado parcial | `new` | não reaproveitar lógica antiga |
| persistência | `storage.js` legado | `new` | não reaproveitar como solução final |

---

## 3. Estrutura de diretórios sugerida

```text
components/nexxalife/
├── old/
│   ├── README.md
│   ├── onboarding/
│   ├── dashboard/
│   ├── goals/
│   ├── checklist/
│   ├── agenda/
│   ├── diary/
│   ├── reports/
│   └── framework/
└── new/
    ├── README.md
    ├── shell/
    ├── onboarding/
    ├── dashboard/
    ├── goals/
    ├── checklist/
    ├── diagnostic/
    ├── agenda/
    ├── diary/
    ├── reports/
    └── framework/
```

---

## 4. Classificação de blocos herdáveis

### 4.1 Herdar como inspiração forte (`old -> new`)
- hero/introdução de landing
- estrutura de onboarding em etapas
- sequência narrativa dashboard -> metas -> checklist -> agenda
- cards de resumo e progresso
- seções de relatório e leitura pessoal
- estrutura mental do admin/framework

### 4.2 Herdar somente como benchmark visual
- sidebars do legado
- headers muito acoplados ao layout antigo
- modais e componentes locais sem contratos claros
- widgets ligados diretamente ao `localStorage`

### 4.3 Não herdar
- `src/services/storage.js`
- dependências de React Router
- qualquer acoplamento implícito entre páginas via estado local do navegador
- nomenclaturas inconsistentes do diagnóstico/score sem canonização prévia

---

## 5. Mapa por componente legado conhecido

| Componente legado | Papel | Tratamento recomendado |
|---|---|---|
| `Layout.jsx` | casca geral do app antigo | usar apenas como referência de hierarquia; reescrever no shell novo |
| `Sidebar.jsx` | navegação lateral antiga | não portar literalmente; adaptar conceitos ao shell estilo `chat.meusuper.app` |
| `KPICard.jsx` | resumo visual | forte candidato a bloco `new/dashboard` |
| `ProgressBar.jsx` | progresso | candidato a bloco `new/goals` ou `new/checklist` |
| `Modal.jsx` | diálogo genérico | substituir por primitives novas |
| `InstallPrompt.jsx` | comportamento PWA/promocional | reavaliar depois; não priorizar |

---

## 6. Mapa por blocos novos obrigatórios

Os seguintes blocos precisam nascer explicitamente como `new`:
- `NexxaLifeShell`
- `NexxaLifePageHeader`
- `NexxaLifeSummaryCard`
- `NexxaLifeGoalCard`
- `NexxaLifeChecklistList`
- `NexxaLifeDiagnosticProgress`
- `NexxaLifeReportSnapshotCard`
- `NexxaLifeAdminFrameworkTable`

Mesmo quando inspirados no legado, esses blocos devem ter:
- props explícitas
- contratos tipados
- separação entre apresentação e domínio

---

## 7. Uso esperado na Fase 1

### Entradas `old`
- nomenclatura das telas
- ordem das jornadas
- estrutura de conteúdo por tela
- copy aproveitável
- cards e agrupamentos úteis

### Saídas `new`
- scaffold de rotas
- contracts draft
- componentes prontos para páginas controladas
- mocks controlados para onboarding/dashboard/goals/checklist

---

## 8. Checklist de conformidade old/new

Antes de aceitar qualquer bloco novo:
- [ ] está claro se ele nasceu de inspiração `old` ou de criação `new`?
- [ ] ele depende de contrato novo, e não do storage legado?
- [ ] o comportamento foi reescrito ou apenas transplantado?
- [ ] a responsabilidade do bloco está limitada?
- [ ] o diretório escolhido reflete corretamente `old` ou `new`?
