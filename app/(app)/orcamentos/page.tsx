import { BudgetsTable } from '@/components/budgets/budgets-table'
import { BudgetsFilters } from '@/components/budgets/budgets-filters'
import { mockBudgets } from '@/lib/mock-data'

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Orcamentos</h1>
        <p className="text-muted-foreground">
          Gerencie os orcamentos de compra
        </p>
      </div>

      <BudgetsFilters />

      <BudgetsTable budgets={mockBudgets} />
    </div>
  )
}
