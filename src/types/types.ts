import { z } from "zod"

export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})

export type Post = z.infer<typeof postSchema>

export const commentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
})

export type Comment = z.infer<typeof commentSchema>

export const geoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
})

export type Geo = z.infer<typeof geoSchema>

export const addressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: geoSchema,
})

export type Address = z.infer<typeof addressSchema>

export const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
})

export type Company = z.infer<typeof companySchema>

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: addressSchema,
  phone: z.string(),
  website: z.string(),
  company: companySchema,
})

export type User = z.infer<typeof userSchema>