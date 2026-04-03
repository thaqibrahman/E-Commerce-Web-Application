const API_BASE_URL = 'http://localhost:5000/api'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))

      if (response.status === 401) {
        // Explicit unauthorized flow for frontend when token is missing/expired
        localStorage.removeItem('token')
        const err = new Error(error.message || 'Not authorized, token missing')
        ;(err as any).status = 401
        throw err
      }

      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string }) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    return response
  }

  async login(data: { email: string; password: string }) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    return response
  }

  async getCurrentUser() {
    return this.request('/auth/me')
  }

  // Product endpoints
  async getProducts(params?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) {
    const query = params ? new URLSearchParams(params as any).toString() : ''
    return this.request(`/products${query ? `?${query}` : ''}`)
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`)
  }

  // Cart endpoints
  async getCart() {
    const token = localStorage.getItem('token')
    if (!token) {
      return { items: [] }
    }
    return this.request('/cart')
  }

  async addToCart(data: { productId: string; quantity: number }) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async removeFromCart(productId: string) {
    return this.request(`/cart/${productId}`, {
      method: 'DELETE',
    })
  }

  async clearCart() {
    return this.request('/cart', {
      method: 'DELETE',
    })
  }

  // Order endpoints
  async createOrder(data: { shippingAddress: string }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getOrders() {
    return this.request('/orders')
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
