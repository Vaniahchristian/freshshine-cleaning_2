"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { services as initialServices } from "@/lib/data"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import type { Service } from "@/lib/data"

export default function ServicesPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [services, setServices] = useState(initialServices)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)

  if (!isAuthenticated) {
    router.push("/admin")
    return null
  }

  const handleAddService = (data: Omit<Service, "id">) => {
    const newService = {
      id: services.length + 1,
      ...data,
    }
    setServices([...services, newService])
    setIsAddDialogOpen(false)
  }

  const handleEditService = (data: Omit<Service, "id">) => {
    if (!currentService) return

    const updatedServices = services.map((service) =>
      service.id === currentService.id ? { ...service, ...data } : service,
    )
    setServices(updatedServices)
    setIsEditDialogOpen(false)
  }

  const handleDeleteService = () => {
    if (!currentService) return

    const updatedServices = services.filter((service) => service.id !== currentService.id)
    setServices(updatedServices)
    setIsDeleteDialogOpen(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Services</h1>
            <p className="text-gray-500 mt-2">Manage your cleaning services.</p>
          </div>
          <AddServiceDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} onSubmit={handleAddService} />
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">{service.description}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentService(service)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setCurrentService(service)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Service Dialog */}
      {currentService && (
        <EditServiceDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          service={currentService}
          onSubmit={handleEditService}
        />
      )}

      {/* Delete Service Dialog */}
      {currentService && (
        <DeleteServiceDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          service={currentService}
          onDelete={handleDeleteService}
        />
      )}
    </AdminLayout>
  )
}

type ServiceFormData = {
  name: string
  description: string
  image: string
}

function AddServiceDialog({
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSubmit: (data: ServiceFormData) => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: "",
      description: "",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&crop=center",
    },
  })

  const handleFormSubmit = (data: ServiceFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>Create a new cleaning service to offer to your customers.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Service name is required" })}
                placeholder="e.g., Pool Cleaning"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the service..."
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                {...register("image")}
                placeholder="URL to service image"
                defaultValue="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&crop=center"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
              Add Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditServiceDialog({
  isOpen,
  setIsOpen,
  service,
  onSubmit,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  service: Service
  onSubmit: (data: ServiceFormData) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: service.name,
      description: service.description,
      image: service.image,
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>Update the details of this service.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Service Name</Label>
              <Input
                id="edit-name"
                {...register("name", { required: "Service name is required" })}
                placeholder="e.g., Pool Cleaning"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the service..."
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" {...register("image")} placeholder="URL to service image" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteServiceDialog({
  isOpen,
  setIsOpen,
  service,
  onDelete,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  service: Service
  onDelete: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Service</DialogTitle>
          <DialogDescription>Are you sure you want to delete this service?</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            You are about to delete <strong>{service.name}</strong>. This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
