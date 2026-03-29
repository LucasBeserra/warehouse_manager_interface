import { OrdersTable } from '@/components/orders/orders-table'
import { OrdersFilters } from '@/components/orders/orders-filters'
import { mockPurchaseOrders } from '@/lib/mock-data'

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Pedidos de Compra</h1>
        <p className="text-muted-foreground">
          Acompanhe os pedidos de compra e entregas
        </p>
      </div>

      <OrdersFilters />

      <OrdersTable orders={mockPurchaseOrders} />
    </div>
  )
}
