"use client"

import { useState } from 'react'
import { createRequest } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { services } from "@/lib/data"

interface NegotiationFormProps {
  isOpen: boolean
  onClose: () => void
  selectedService: string
}

type FormData = {
  name: string
  phone: string
  serviceType: string
  description: string
  location: string
  paymentMethod: string
}

export default function NegotiationForm({ isOpen, onClose, selectedService }: NegotiationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      serviceType: selectedService,
    },
  })

  const mutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      onClose()
      reset()
      setIsSuccess(true)
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    mutation.mutate(data)
  }

  // Set the selected service when it changes
  useState(() => {
    if (selectedService) {
      setValue("serviceType", selectedService)
    }
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md relative"
          >
            <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Negotiate Service</h2>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-medium mb-2">Request Submitted!</h3>
                  <p className="text-gray-600">We'll contact you shortly to discuss your service needs.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" {...register("name", { required: "Name is required" })} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Your phone number"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+\-\s()]*$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Type of Cleaning</Label>
                    <Select defaultValue={selectedService} onValueChange={(value) => setValue("serviceType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description of Request</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you need..."
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows={3}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input id="location" placeholder="Your address" {...register("location")} />
                  </div>

                  {/* <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="mtn" onValueChange={(value) => setValue("paymentMethod", value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mtn" id="mtn" />
                        <Label htmlFor="mtn">MTN Mobile Money</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="airtel" id="airtel" />
                        <Label htmlFor="airtel">Airtel Mobile Money</Label>
                      </div>
                    </RadioGroup>
                  </div> */}

                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
