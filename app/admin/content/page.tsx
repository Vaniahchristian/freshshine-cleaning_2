"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Save } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getSiteContent, updateSiteContent } from "@/lib/api"
import type { SiteContent } from "@/lib/types"
import Loader from "@/components/ui/loader"

export default function ContentPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("hero")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const { data: siteContent, isLoading, error } = useQuery<SiteContent>({
    queryKey: ['site-content'],
    queryFn: () => getSiteContent('all'),
    retry: false
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  if (isLoading) return <Loader />
  if (error) return <div>Error loading site content</div>
  if (!siteContent) return null

  const handleSaveContent = async (section: keyof SiteContent, data: any) => {
    setIsSaving(true)
    try {
      await updateSiteContent(section, data)
      queryClient.invalidateQueries(['site-content'])
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error(`Error saving ${section} content:`, error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Content</h1>
          <p className="text-gray-500 mt-2">Edit the content displayed on your website.</p>
        </div>

        <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <HeroContentForm
              content={siteContent.hero}
              onSave={(data) => handleSaveContent("hero", data)}
              isSaving={isSaving}
              saveSuccess={saveSuccess}
            />
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <AboutContentForm
              content={siteContent.about}
              onSave={(data) => handleSaveContent("about", data)}
              isSaving={isSaving}
              saveSuccess={saveSuccess}
            />
          </TabsContent>

          <TabsContent value="how-it-works" className="mt-6">
            <HowItWorksContentForm
              content={siteContent.howItWorks}
              onSave={(data) => handleSaveContent("howItWorks", data)}
              isSaving={isSaving}
              saveSuccess={saveSuccess}
            />
          </TabsContent>

          <TabsContent value="footer" className="mt-6">
            <FooterContentForm
              content={siteContent.footer}
              onSave={(data) => handleSaveContent("footer", data)}
              isSaving={isSaving}
              saveSuccess={saveSuccess}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

interface HeroContentFormProps {
  content: SiteContent['hero'];
  onSave: (data: any) => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

function HeroContentForm({ content, onSave, isSaving, saveSuccess }: HeroContentFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: content.title,
      subtitle: content.subtitle,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Edit the main headline and subheadline on your homepage.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSave)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Headline</Label>
            <Input id="hero-title" {...register("title")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-subtitle">Subheadline</Label>
            <Textarea id="hero-subtitle" {...register("subtitle")} rows={3} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{saveSuccess && <p className="text-green-600">Content saved successfully!</p>}</div>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

interface AboutContentFormProps {
  content: SiteContent['about'];
  onSave: (data: any) => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

function AboutContentForm({ content, onSave, isSaving, saveSuccess }: AboutContentFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: content.title,
      content: content.content,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>Edit the about section content.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSave)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about-title">Title</Label>
            <Input id="about-title" {...register("title")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about-content">Content</Label>
            <Textarea id="about-content" {...register("content")} rows={8} />
            <p className="text-sm text-gray-500">Use line breaks to separate paragraphs.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{saveSuccess && <p className="text-green-600">Content saved successfully!</p>}</div>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

interface ContentFormProps {
  content: SiteContent['howItWorks'];
  onSave: (data: any) => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

function HowItWorksContentForm({ content, onSave, isSaving, saveSuccess }: ContentFormProps) {
  const defaultSteps = content?.steps || [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }];
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: content?.title || '',
      subtitle: content?.subtitle || '',
      "steps[0].title": defaultSteps[0]?.title || '',
      "steps[0].description": defaultSteps[0]?.description || '',
      "steps[1].title": defaultSteps[1]?.title || '',
      "steps[1].description": defaultSteps[1]?.description || '',
      "steps[2].title": defaultSteps[2]?.title || '',
      "steps[2].description": defaultSteps[2]?.description || '',
    },
  })

  const onSubmit = (data: any) => {
    // Restructure the data to match the expected format
    const formattedData = {
      title: data.title,
      subtitle: data.subtitle,
      steps: [
        {
          title: data["steps[0].title"],
          description: data["steps[0].description"],
        },
        {
          title: data["steps[1].title"],
          description: data["steps[1].description"],
        },
        {
          title: data["steps[2].title"],
          description: data["steps[2].description"],
        },
      ],
    }
    onSave(formattedData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>How It Works Section</CardTitle>
        <CardDescription>Edit the process steps shown to customers.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hiw-title">Section Title</Label>
              <Input id="hiw-title" {...register("title")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hiw-subtitle">Section Subtitle</Label>
              <Input id="hiw-subtitle" {...register("subtitle")} />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Process Steps</h3>

            <div className="space-y-6">
              {[0, 1, 2].map((index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Step {index + 1}</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`step-${index}-title`}>Title</Label>
                      <Input id={`step-${index}-title`} {...register(`steps[${index}].title`)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`step-${index}-desc`}>Description</Label>
                      <Textarea id={`step-${index}-desc`} {...register(`steps[${index}].description`)} rows={2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{saveSuccess && <p className="text-green-600">Content saved successfully!</p>}</div>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

interface FooterContentFormProps {
  content: SiteContent['footer'];
  onSave: (data: any) => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

function FooterContentForm({ content, onSave, isSaving, saveSuccess }: FooterContentFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      "businessHours.weekdays": content.businessHours.weekdays,
      "businessHours.saturday": content.businessHours.saturday,
      "businessHours.sunday": content.businessHours.sunday,
      "contact.address": content.contact.address,
      "contact.phone": content.contact.phone,
      "contact.email": content.contact.email,
    },
  })

  const onSubmit = (data: any) => {
    // Restructure the data to match the expected format
    const formattedData = {
      businessHours: {
        weekdays: data["businessHours.weekdays"],
        saturday: data["businessHours.saturday"],
        sunday: data["businessHours.sunday"],
      },
      contact: {
        address: data["contact.address"],
        phone: data["contact.phone"],
        email: data["contact.email"],
      },
    }
    onSave(formattedData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer Information</CardTitle>
        <CardDescription>Edit your business hours and contact information.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Business Hours</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weekdays">Weekdays</Label>
                <Input id="weekdays" {...register("businessHours.weekdays")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saturday">Saturday</Label>
                <Input id="saturday" {...register("businessHours.saturday")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sunday">Sunday</Label>
                <Input id="sunday" {...register("businessHours.sunday")} />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("contact.address")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("contact.phone")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("contact.email")} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{saveSuccess && <p className="text-green-600">Content saved successfully!</p>}</div>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
