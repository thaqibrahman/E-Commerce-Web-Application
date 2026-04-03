"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Search, Menu, X, Package, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface NavbarProps {
  onSearch?: (query: string) => void
  searchQuery?: string
}

export function Navbar({ onSearch, searchQuery = "" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { isAuthenticated, isAdmin, user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(localSearchQuery)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-105">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Search products..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-muted/50 border-transparent focus:bg-background focus:border-primary transition-all duration-200"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative group">
                <ShoppingCart className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-200">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="group">
                  <User className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-in fade-in-0 zoom-in-95 duration-200">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link href="/admin" className="flex items-center">
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/login">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/register">Create Account</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative h-5 w-5">
                <Menu className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-200",
                  isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )} />
                <X className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-200",
                  isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )} />
              </div>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="border-t border-border py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50"
                />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    pathname === "/admin"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
