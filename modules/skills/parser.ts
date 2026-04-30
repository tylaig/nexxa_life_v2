type JsonSchema = {
  type?: string
  required?: string[]
  properties?: Record<string, unknown>
}

const VARIABLE_REGEX = /\{\{\$([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g

export function extractSkillVariables(promptTemplate: string): string[] {
  const seen = new Set<string>()
  const variables: string[] = []

  for (const match of promptTemplate.matchAll(VARIABLE_REGEX)) {
    const variable = match[1]
    if (!seen.has(variable)) {
      seen.add(variable)
      variables.push(variable)
    }
  }

  return variables
}

export function renderSkillTemplate(promptTemplate: string, values: Record<string, string | number | null | undefined>) {
  return promptTemplate.replaceAll(VARIABLE_REGEX, (_, variable: string) => {
    const value = values[variable]
    return value == null ? `{{$${variable}}}` : String(value)
  })
}

export function validateSkillTemplate({
  promptTemplate,
  inputSchema,
}: {
  promptTemplate: string
  inputSchema?: JsonSchema
}) {
  const detectedVariables = extractSkillVariables(promptTemplate)
  const requiredVariables = inputSchema?.required ?? []
  const missingInTemplate = requiredVariables.filter((variable) => !detectedVariables.includes(variable))
  const extraInTemplate = detectedVariables.filter(
    (variable) => !inputSchema?.properties || !(variable in inputSchema.properties)
  )

  return {
    valid: missingInTemplate.length === 0,
    detectedVariables,
    missingInTemplate,
    extraInTemplate,
  }
}
