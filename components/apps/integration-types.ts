export type IntegrationFieldType = "string" | "number" | "boolean" | "select" | "textarea" | "password" | "json"

export type IntegrationSchemaField = {
  key: string
  label: string
  type: IntegrationFieldType
  required?: boolean
  placeholder?: string
  helpText?: string
  options?: Array<{ label: string; value: string }>
}

export type IntegrationToolAction = {
  key: string
  label: string
  description: string
  inputSchema: IntegrationSchemaField[]
  outputSchema: IntegrationSchemaField[]
  supportsJsonParser?: boolean
}

export type IntegrationProviderCatalogItem = {
  provider: string
  displayName: string
  authMode: string
  baseUrl: string
  capabilities: string[]
  category: "native" | "custom"
  limitPerWorkspace: number
  usageCount: number
  schema: IntegrationSchemaField[]
  credentials: { mode: string; storage: string }
  tools: IntegrationToolAction[]
}

export type IntegrationItem = {
  id: string
  provider: string
  displayName: string
  status: string
  baseUrl: string
  authMode: string
  configPublic: Record<string, unknown>
  healthStatus?: string
  checkedAt?: string | null
  createdAt?: string
  updatedAt?: string
}
