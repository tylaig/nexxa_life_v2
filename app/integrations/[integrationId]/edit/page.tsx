import { redirect } from "next/navigation"

export default async function IntegrationEditAliasPage({
  params,
}: {
  params: Promise<{ integrationId: string }>
}) {
  const { integrationId } = await params
  redirect(`/apps/${integrationId}/edit`)
}
