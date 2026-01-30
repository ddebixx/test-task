import { z } from "zod"

const userSlugParamsSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
})

export const parseUserSlugParams = (params: unknown): string | undefined => {
  const result = userSlugParamsSchema.safeParse(params)
  return result.success ? result.data.slug : undefined
}
