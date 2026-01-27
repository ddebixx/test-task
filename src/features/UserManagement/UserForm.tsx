import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema, type CreateUser } from "@/types/types"
import { Input } from "@/components/ui/Input/Input"
import { Button } from "@/components/ui/Button/Button"
import { Card, CardContent } from "@/components/ui/Card/Card"
import type { User } from "@/types/types"

interface UserFormProps {
  user?: User
  onSubmit: (data: CreateUser) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export const UserForm = ({ user, onSubmit, onCancel, isLoading }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          address: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: {
              lat: user.address.geo.lat,
              lng: user.address.geo.lng,
            },
          },
          company: {
            name: user.company.name,
            catchPhrase: user.company.catchPhrase,
            bs: user.company.bs,
          },
        }
      : undefined,
  })

  async function handleFormSubmit(data: CreateUser) {
    await onSubmit(data)
  }

  return (
    <Card className="border-none p-0 shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 min-w-0">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2 min-w-0">
              <label htmlFor="username" className="text-sm font-medium leading-none">
                Username
              </label>
              <Input
                id="username"
                placeholder="johndoe"
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2 min-w-0">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2 min-w-0">
              <label htmlFor="phone" className="text-sm font-medium leading-none">
                Phone
              </label>
              <Input
                id="phone"
                placeholder="+1 234 567 8900"
                aria-invalid={errors.phone ? "true" : "false"}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2 min-w-0">
              <label htmlFor="website" className="text-sm font-medium leading-none">
                Website
              </label>
              <Input
                id="website"
                placeholder="https://example.com"
                aria-invalid={errors.website ? "true" : "false"}
                {...register("website")}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 min-w-0">
                <label htmlFor="address.street" className="text-sm font-medium leading-none">
                  Street
                </label>
                <Input
                  id="address.street"
                  placeholder="123 Main St"
                  aria-invalid={errors.address?.street ? "true" : "false"}
                  {...register("address.street")}
                />
                {errors.address?.street && (
                  <p className="text-sm text-destructive">{errors.address.street.message}</p>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="address.suite" className="text-sm font-medium leading-none">
                  Suite
                </label>
                <Input
                  id="address.suite"
                  placeholder="Apt 4B"
                  aria-invalid={errors.address?.suite ? "true" : "false"}
                  {...register("address.suite")}
                />
                {errors.address?.suite && (
                  <p className="text-sm text-destructive">{errors.address.suite.message}</p>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="address.city" className="text-sm font-medium leading-none">
                  City
                </label>
                <Input
                  id="address.city"
                  placeholder="New York"
                  aria-invalid={errors.address?.city ? "true" : "false"}
                  {...register("address.city")}
                />
                {errors.address?.city && (
                  <p className="text-sm text-destructive">{errors.address.city.message}</p>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="address.zipcode" className="text-sm font-medium leading-none">
                  Zipcode
                </label>
                <Input
                  id="address.zipcode"
                  placeholder="10001"
                  aria-invalid={errors.address?.zipcode ? "true" : "false"}
                  {...register("address.zipcode")}
                />
                {errors.address?.zipcode && (
                  <p className="text-sm text-destructive">{errors.address.zipcode.message}</p>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="address.geo.lat" className="text-sm font-medium leading-none">
                  Latitude
                </label>
                <Input
                  id="address.geo.lat"
                  placeholder="40.7128"
                  aria-invalid={errors.address?.geo?.lat ? "true" : "false"}
                  {...register("address.geo.lat")}
                />
                {errors.address?.geo?.lat && (
                  <p className="text-sm text-destructive">{errors.address.geo.lat.message}</p>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="address.geo.lng" className="text-sm font-medium leading-none">
                  Longitude
                </label>
                <Input
                  id="address.geo.lng"
                  placeholder="-74.0060"
                  aria-invalid={errors.address?.geo?.lng ? "true" : "false"}
                  {...register("address.geo.lng")}
                />
                {errors.address?.geo?.lng && (
                  <p className="text-sm text-destructive">{errors.address.geo.lng.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 min-w-0">
                <label htmlFor="company.name" className="text-sm font-medium leading-none">
                  Company Name
                </label>
                <Input
                  id="company.name"
                  placeholder="Acme Inc"
                  aria-invalid={errors.company?.name ? "true" : "false"}
                  {...register("company.name")}
                />
                {errors.company?.name && (
                  <p className="text-sm text-destructive">{errors.company.name.message}</p>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="company.catchPhrase" className="text-sm font-medium leading-none">
                  Catch Phrase
                </label>
                <Input
                  id="company.catchPhrase"
                  placeholder="Making the world better"
                  aria-invalid={errors.company?.catchPhrase ? "true" : "false"}
                  {...register("company.catchPhrase")}
                />
                {errors.company?.catchPhrase && (
                  <p className="text-sm text-destructive">{errors.company.catchPhrase.message}</p>
                )}
              </div>
              <div className="space-y-2 min-w-0">
                <label htmlFor="company.bs" className="text-sm font-medium leading-none">
                  Business
                </label>
                <Input
                  id="company.bs"
                  placeholder="synergize scalable supply-chains"
                  aria-invalid={errors.company?.bs ? "true" : "false"}
                  {...register("company.bs")}
                />
                {errors.company?.bs && (
                  <p className="text-sm text-destructive">{errors.company.bs.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : user ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
