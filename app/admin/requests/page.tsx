"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, CheckCircle } from "lucide-react"
import type { Request } from "@/lib/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getRequests, updateRequestStatus } from "@/lib/api"
import Loader from "@/components/ui/loader"

export default function RequestsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null)

  const { data: requests, isLoading, error } = useQuery<Request[]>({
    queryKey: ['requests'],
    queryFn: getRequests
  })

  if (!isAuthenticated) {
    router.push("/admin")
    return null
  }

  if (isLoading) return <Loader />
  if (error) return <div>Error loading requests</div>
  if (!requests) return null

  const filteredRequests = requests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.date.includes(searchTerm),
  )

  const handleMarkAsHandled = async (requestId: number) => {
    try {
      await updateRequestStatus(requestId, 'handled')
      queryClient.invalidateQueries(['requests'])
      setIsViewDialogOpen(false)
    } catch (error) {
      console.error('Error updating request status:', error)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
          <p className="text-gray-500 mt-2">Manage negotiation requests from customers.</p>
        </div>

        <div className="flex items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by name, service, or date..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No requests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.date}</TableCell>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.serviceType}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentRequest(request)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Request Dialog */}
      {currentRequest && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>
                Submitted on {currentRequest.date} by {currentRequest.name}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{currentRequest.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{currentRequest.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Service Type</h3>
                  <p>{currentRequest.serviceType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                  <p>{currentRequest.paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Mobile Money"}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p>{currentRequest.location || "Not provided"}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p>{currentRequest.description}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge
                    variant="outline"
                    className={
                      currentRequest.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-green-100 text-green-800 hover:bg-green-100"
                    }
                  >
                    {currentRequest.status}
                  </Badge>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              {currentRequest.status === "pending" && (
                <Button
                  className="bg-amber-500 hover:bg-amber-600"
                  onClick={() => handleMarkAsHandled(currentRequest.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Handled
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  )
}
