"use client"

import * as React from "react"
import { Archive, Download, ExternalLink, Image as ImageIcon, Link as LinkIcon, Package, Search, ShoppingBag, ShoppingCart, Tag } from "lucide-react"

import { PageContainer, PageHeader, StatCard } from "@/components/app-shell/page-container"
import { Tabs, TabsContent, NavTabsList, NavTabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mockProducts = [
  { id: "p1", name: "Consultoria Premium - 1h", type: "digital", price: 500, status: "active", sales: 142, source: "shopify", image: null },
  { id: "p2", name: "E-book: Vendas B2B", type: "digital", price: 49.90, status: "active", sales: 890, source: "native", image: null },
  { id: "p3", name: "Acesso Comunidade VIP", type: "subscription", price: 97.00, status: "active", sales: 345, source: "native", image: null },
  { id: "p4", name: "Ingresso Workshop Presencial", type: "event", price: 250, status: "draft", sales: 0, source: "native", image: null },
]

type ProductType = "all" | "digital" | "subscription" | "event"

export function ProductsView() {
  const [typeFilter, setTypeFilter] = React.useState<ProductType>("all")
  const [query, setQuery] = React.useState("")

  const filtered = mockProducts.filter((p) => {
    if (typeFilter !== "all" && p.type !== typeFilter) return false
    if (query.trim()) {
      const hay = [p.name, p.type, p.source].join(" ").toLowerCase()
      if (!hay.includes(query.trim().toLowerCase())) return false
    }
    return true
  })
  return (
    <PageContainer>
      <PageHeader
        title="Catálogo de Produtos"
        description="Gerencie seus bens digitais, produtos sincronizados e assinaturas."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-3.5 w-3.5" />
              Sincronizar Shopify
            </Button>
            <Button size="sm" className="gap-2">
              <Package className="h-3.5 w-3.5" />
              Novo Produto
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total" value="1.2k" hint="produtos no catálogo" icon={Archive} />
        <StatCard label="Digitais" value="450" hint="e-books, cursos" icon={Download} />
        <StatCard label="Integração" value="Ativa" hint="Shopify" icon={ShoppingCart} />
        <StatCard label="Vendas 30d" value="R$ 45.2k" hint="+12% que mês anterior" icon={ShoppingBag} />
      </div>

      <div className="mt-6">
        <Tabs value={typeFilter} onValueChange={(v) => setTypeFilter(v as ProductType)}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-4">
            <NavTabsList className="border-0">
              <NavTabsTrigger value="all">Todos ({mockProducts.length})</NavTabsTrigger>
              <NavTabsTrigger value="digital">Digitais</NavTabsTrigger>
              <NavTabsTrigger value="subscription">Assinaturas</NavTabsTrigger>
              <NavTabsTrigger value="event">Eventos</NavTabsTrigger>
            </NavTabsList>
            <div className="flex items-center gap-2 lg:ml-auto">
              <div className="relative lg:w-64">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produto..." className="h-9 pl-8" />
              </div>
            </div>
          </div>

          <TabsContent value={typeFilter} className="m-0 border-0 p-0 outline-none">
            <div className="rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                {filtered.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-between hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">{p.name}</span>
                          {p.status === "active" ? (
                            <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">Ativo</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px]">Rascunho</Badge>
                          )}
                          {p.source === "shopify" && <Badge variant="outline" className="text-[10px] bg-[#95BF47]/10 text-[#5E8E3E] border-[#95BF47]/30">Shopify</Badge>}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {p.type}</span>
                          <span>·</span>
                          <span>{p.sales} vendas</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">R$ {p.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-12 text-center text-sm text-muted-foreground">Nenhum produto encontrado.</div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}
