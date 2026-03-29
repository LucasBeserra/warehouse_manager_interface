// Enums
export type UserRole = 'ALMOXARIFE' | 'COMPRADOR' | 'GESTOR' | 'ADMIN'

export type MovementType = 'ENTRADA' | 'SAIDA'

export type ReservationStatus = 'ATIVA' | 'CANCELADA' | 'CONSUMIDA'

export type PurchaseRequestStatus = 'PENDENTE' | 'EM_COTACAO' | 'APROVADA' | 'FINALIZADA'

export type PurchaseRequestPriority = 'URGENTE' | 'ALTA' | 'MEDIA' | 'BAIXA'

export type BudgetStatus = 'EM_COTACAO' | 'AGUARDANDO_APROVACAO' | 'APROVADO' | 'REJEITADO'

export type StockLevel = 'CRITICO' | 'ALERTA' | 'OK'

// Domain types
export interface Product {
  id: string
  code: string
  description: string
  unit: string
  category: string
  minStock: number
  maxStock: number
  physicalStock: number
  reservedStock: number
  availableStock: number
  stockLevel: StockLevel
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductSupplier {
  id: string
  productId: string
  supplierId: string
  supplierName: string
  rank: number
  active: boolean
}

export interface Supplier {
  id: string
  name: string
  cnpj: string
  email: string
  phone: string
  active: boolean
}

export interface Movement {
  id: string
  type: MovementType
  productId: string
  productCode: string
  productDescription: string
  quantity: number
  requesterId?: string
  requesterName?: string
  purchaseOrderId?: string
  createdAt: string
}

export interface Reservation {
  id: string
  linkCode: string
  productId: string
  productCode: string
  productDescription: string
  quantity: number
  requesterId: string
  requesterName: string
  status: ReservationStatus
  createdAt: string
  updatedAt: string
}

export interface PurchaseRequestItem {
  id: string
  productId: string
  productCode: string
  productDescription: string
  quantity: number
  unit: string
}

export interface PurchaseRequest {
  id: string
  items: PurchaseRequestItem[]
  status: PurchaseRequestStatus
  priority: PurchaseRequestPriority
  createdAt: string
  updatedAt: string
}

export interface BudgetItem {
  id: string
  productId: string
  productCode: string
  productDescription: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Budget {
  id: string
  purchaseRequestId: string
  supplierId: string
  supplierName: string
  items: BudgetItem[]
  totalValue: number
  status: BudgetStatus
  observations?: string
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrder {
  id: string
  budgetId: string
  supplierId: string
  supplierName: string
  items: BudgetItem[]
  totalValue: number
  delivered: boolean
  deliveredAt?: string
  createdAt: string
}

// Dashboard stats
export interface DashboardStats {
  totalProducts: number
  criticalStock: number
  warningStock: number
  okStock: number
  pendingRequests: number
  pendingBudgets: number
  monthlyMovements: number
  activeReservations: number
}

// User from JWT
export interface User {
  id: string
  name: string
  email: string
  roles: UserRole[]
}
