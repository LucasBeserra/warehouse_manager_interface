import { ProductsTable } from '@/components/products/products-table'
import { ProductsFilters } from '@/components/products/products-filters'
import { ProductFormDialog } from '@/components/products/product-form-dialog'
import { mockProducts } from '@/lib/mock-data'

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos do estoque
          </p>
        </div>
        <ProductFormDialog />
      </div>

      <ProductsFilters />

      <ProductsTable products={mockProducts} />
    </div>
  )
}
