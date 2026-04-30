"use client"

import * as React from "react"
import { useModalStore } from "@/lib/store/use-modal-store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ModalProvider() {
  const { isOpen, type, close } = useModalStore()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "addKnowledgeSource" && "Adicionar Fonte"}
            {type === "createAiAgent" && "Novo Agente IA"}
            {type === "exportData" && "Exportar Relatório"}
            {type === "newContact" && "Criar Contato"}
            {type === "newSegment" && "Novo Segmento"}
            {type === "newOrder" && "Criar Pedido Manual"}
          </DialogTitle>
          <DialogDescription>
            {type === "addKnowledgeSource" && "Faça upload de PDF/DOCX ou conecte seu Notion."}
            {type === "createAiAgent" && "Defina a base do seu novo copiolo autônomo."}
            {type === "exportData" && "Selecione o formato de exportação (.csv ou .xlsx)"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          {type === "addKnowledgeSource" && (
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start">Upload de Arquivo Único</Button>
              <Button variant="outline" className="justify-start">Sincronizar Notion Workspace</Button>
              <Button variant="outline" className="justify-start">Rastrear URL</Button>
            </div>
          )}
          {type === "createAiAgent" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nome do Agente</label>
                <input className="flex h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm" placeholder="Ex: Assistente de Vendas" />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={close}>Cancelar</Button>
          <Button>Continuar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
