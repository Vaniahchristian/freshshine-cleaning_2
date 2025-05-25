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
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import type { Product } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api"
import Loader from "@/components/ui/loader"

export default function ProductsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts
  })

  if (!isAuthenticated) {
    router.push("/admin")
    return null
  }

  if (isLoading) return <Loader />
  if (error) return <div>Error loading products</div>
  if (!products) return null

  const handleAddProduct = async (data: Omit<Product, "id">) => {
    try {
      await createProduct({
        ...data,
        price: Number.parseFloat(data.price.toString()),
      })
      queryClient.invalidateQueries(['products'])
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleEditProduct = async (data: Omit<Product, "id">) => {
    if (!currentProduct) return

    try {
      await updateProduct(currentProduct.id, {
        ...data,
        price: Number.parseFloat(data.price.toString())
      })
      queryClient.invalidateQueries(['products'])
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteProduct = async () => {
    if (!currentProduct) return

    try {
      await deleteProduct(currentProduct.id)
      queryClient.invalidateQueries(['products'])
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-gray-500 mt-2">Manage your cleaning products.</p>
          </div>
          <AddProductDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} onSubmit={handleAddProduct} />
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>UGX{product.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">{product.description}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentProduct(product)
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
                          setCurrentProduct(product)
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

      {/* Edit Product Dialog */}
      {currentProduct && (
        <EditProductDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          product={currentProduct}
          onSubmit={handleEditProduct}
        />
      )}

      {/* Delete Product Dialog */}
      {currentProduct && (
        <DeleteProductDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          product={currentProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </AdminLayout>
  )
}

type ProductFormData = {
  name: string
  description: string
  price: number | string
  image: string
  category: string
}

function AddProductDialog({
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSubmit: (data: ProductFormData) => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop&crop=center",
      category: "Household",
    },
  })

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data)
    reset()
  }

  const categories = ["Household", "Automotive", "Accessories"]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Create a new cleaning product to sell to your customers.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Product name is required" })}
                placeholder="e.g., Multi-Surface Cleaner"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="Household" onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (UGX)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0.01, message: "Price must be greater than 0" },
                })}
                placeholder="9.99"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the product..."
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                {...register("image")}
                placeholder="URL to product image"
                defaultValue="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop&crop=center"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditProductDialog({
  isOpen,
  setIsOpen,
  product,
  onSubmit,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  product: Product
  onSubmit: (data: ProductFormData) => void
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    },
  })

  const categories = ["Household", "Automotive", "Accessories"]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the details of this product.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                {...register("name", { required: "Product name is required" })}
                placeholder="e.g., Multi-Surface Cleaner"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select defaultValue={product.category} onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price (UGX)</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0.01, message: "Price must be greater than 0" },
                })}
                placeholder="9.99"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the product..."
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" {...register("image")} placeholder="URL to product image" />
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

function DeleteProductDialog({
  isOpen,
  setIsOpen,
  product,
  onDelete,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  product: Product
  onDelete: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>Are you sure you want to delete this product?</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            You are about to delete <strong>{product.name}</strong>. This action cannot be undone.
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
