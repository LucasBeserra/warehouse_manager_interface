import { PurchaseRequestsTable } from '@/components/purchase-requests/purchase-requests-table'
import { PurchaseRequestsFilters } from '@/components/purchase-requests/purchase-requests-filters'
import { PurchaseRequestFormDialog } from '@/components/purchase-requests/purchase-request-form-dialog'
import { mockPurchaseRequests } from '@/lib/mock-data'

export default function PurchaseRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Solicitacoes de Compra</h1>
          <p className="text-muted-foreground">
            Gerencie as solicitacoes de reposicao de estoque
          </p>
        </div>
        <PurchaseRequestFormDialog />
      </div>

      <PurchaseRequestsFilters />

      <PurchaseRequestsTable requests={mockPurchaseRequests} />
    </div>
  )
}
