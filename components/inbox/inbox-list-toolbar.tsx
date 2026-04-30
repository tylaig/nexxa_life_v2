"use client"

import { ArrowUpDown, Check, LayoutGrid, SlidersHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { InboxAdvancedFilters, InboxSort } from "./inbox-view-model"

export function InboxListToolbar({
  onOpenCommand,
  sortBy,
  onSortChange,
  filters,
  onFiltersChange,
}: {
  onOpenCommand: () => void
  sortBy: InboxSort
  onSortChange: (value: InboxSort) => void
  filters: InboxAdvancedFilters
  onFiltersChange: (value: InboxAdvancedFilters) => void
}) {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-7" aria-label="Ordenar">
            <ArrowUpDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {[
            { id: "recent", label: "Mais recentes" },
            { id: "sla", label: "Risco de SLA" },
            { id: "priority", label: "Maior prioridade" },
          ].map((item) => (
            <DropdownMenuItem key={item.id} onClick={() => onSortChange(item.id as InboxSort)}>
              <span className="flex flex-1 items-center justify-between gap-3">
                <span>{item.label}</span>
                {sortBy === item.id ? <Check className="size-3.5" /> : null}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-7" aria-label="Filtros avançados">
            <SlidersHorizontal className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuCheckboxItem
            checked={filters.unreadOnly}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, unreadOnly: !!checked })}
          >
            Somente não lidas
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.vipOnly}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, vipOnly: !!checked })}
          >
            Somente VIP
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.withOrderOnly}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, withOrderOnly: !!checked })}
          >
            Com pedido vinculado
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.unassignedOnly}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, unassignedOnly: !!checked })}
          >
            Somente sem dono
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onOpenCommand}>Busca operacional avançada</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon" className="size-7" aria-label="Visualizações salvas" onClick={() => toast.info("Views salvas ainda não estão disponíveis nesta etapa") }>
        <LayoutGrid className="size-3.5" />
      </Button>
    </div>
  )
}
