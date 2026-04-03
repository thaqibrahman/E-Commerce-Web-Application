"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { products as initialProducts, categories, type Product } from "@/lib/data"
import { formatPrice } from "@/lib/utils"

export default function AdminPage() {
  const { isAuthenticated, isAdmin, user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
    inStock: true,
  })

  // Redirect if not admin
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md mx-4 shadow-lg animate-in fade-in zoom-in-95 duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/login">Sign In as Admin</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, searchQuery])

  const stats = useMemo(() => {
    const totalProducts = products.length
    const totalValue = products.reduce((sum, p) => sum + p.price, 0)
    const inStock = products.filter((p) => p.inStock).length
    const outOfStock = totalProducts - inStock

    return { totalProducts, totalValue, inStock, outOfStock }
  }, [products])

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      image: "",
      inStock: true,
    })
  }

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: String(Date.now()),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: formData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.0,
      reviewCount: 0,
      inStock: formData.inStock,
    }
    setProducts([...products, newProduct])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditProduct = () => {
    if (!selectedProduct) return
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              name: formData.name,
              description: formData.description,
              price: parseFloat(formData.price),
              originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
              category: formData.category,
              image: formData.image,
              inStock: formData.inStock,
            }
          : p
      )
    )
    setIsEditDialogOpen(false)
    setSelectedProduct(null)
    resetForm()
  }

  const handleDeleteProduct = () => {
    if (!selectedProduct) return
    setProducts(products.filter((p) => p.id !== selectedProduct.id))
    setIsDeleteDialogOpen(false)
    setSelectedProduct(null)
  }

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : "",
      category: product.category,
      image: product.image,
      inStock: product.inStock,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-105">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">ShopHub</span>
            </Link>
            <Badge variant="secondary" className="font-semibold">Admin</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, {user?.name}
            </span>
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Store
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your products and view store analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: "0ms" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: "50ms" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Value
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <IndianRupee className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatPrice(stats.totalValue)}
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: "100ms" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Stock
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{stats.inStock}</div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: "150ms" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Out of Stock
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {stats.outOfStock}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your product inventory
                </CardDescription>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)} className="group">
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90 duration-200" />
                Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                          <p className="text-muted-foreground">No products found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product, index) => (
                      <TableRow 
                        key={product.id}
                        className="transition-colors hover:bg-muted/50 animate-in fade-in slide-in-from-left-4"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{product.name}</p>
                              <p className="text-sm text-muted-foreground md:hidden">
                                {product.category}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{formatPrice(product.price)}</p>
                            {product.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            variant={product.inStock ? "default" : "destructive"}
                            className={product.inStock ? "bg-success/10 text-success hover:bg-success/20 border-success/20" : ""}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditDialog(product)} className="cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(product)}
                                className="text-destructive focus:text-destructive cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your store.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">Product Name</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-description">Description</Label>
              <Textarea
                id="add-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-price">Price (₹)</Label>
                <Input
                  id="add-price"
                  type="number"
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-originalPrice">Original Price (₹)</Label>
                <Input
                  id="add-originalPrice"
                  type="number"
                  step="1"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="add-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c !== "All").map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-image">Image URL</Label>
              <Input
                id="add-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct} disabled={!formData.name || !formData.price || !formData.category}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-originalPrice">Original Price (₹)</Label>
                <Input
                  id="edit-originalPrice"
                  type="number"
                  step="1"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c !== "All").map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">Delete Product</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete &quot;{selectedProduct?.name}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
