import { redirect } from "next/navigation"

export default async function IntegrationMappingAliasPage({
  params,
}: {
  params: Promise<{ integrationId: string }>
}) {
  const { integrationId } = await params
  redirect(`/apps/${integrationId}/mapping`)
}
