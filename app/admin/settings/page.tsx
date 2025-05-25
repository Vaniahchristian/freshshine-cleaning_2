"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import { User, Lock } from "lucide-react"
import { updateProfile, changePassword } from "@/lib/api"
import Loader from "@/components/ui/loader"

export default function SettingsPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  const handleSaveProfile = async (data: any) => {
    setIsSaving(true)
    setError('')
    try {
      await updateProfile({ email: data.email })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      setError('Failed to update email')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (data: any) => {
    setIsSaving(true)
    setError('')
    try {
      await changePassword({
        newPassword: data.newPassword
      })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      setError('Failed to change password')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6">
            <ProfileForm
              onSave={handleSaveProfile}
              isSaving={isSaving}
              saveSuccess={saveSuccess}
              username={user?.username}
            />
          </TabsContent>
          <TabsContent value="password" className="mt-6">
            <PasswordForm onSave={handleChangePassword} isSaving={isSaving} saveSuccess={saveSuccess} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

interface ProfileFormProps {
  onSave: (data: { email: string }) => void;
  isSaving: boolean;
  saveSuccess: boolean;
  email?: string;
}

function ProfileForm({ onSave, isSaving, saveSuccess, email }: ProfileFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: email || "admin@freshshine.com",
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>Update your account email.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSave)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{saveSuccess && <p className="text-green-600">Email updated successfully!</p>}</div>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <User className="h-4 w-4 mr-2" /> Update Email
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

interface PasswordFormProps {
  onSave: (data: { newPassword: string; confirmPassword: string }) => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

function PasswordForm({ onSave, isSaving, saveSuccess }: PasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const newPassword = watch("newPassword")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password to keep your account secure.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSave)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message as string}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{saveSuccess && <p className="text-green-600">Password changed successfully!</p>}</div>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" /> Change Password
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
