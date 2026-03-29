import { MovementsTable } from '@/components/movements/movements-table'
import { MovementsFilters } from '@/components/movements/movements-filters'
import { EntryFormDialog } from '@/components/movements/entry-form-dialog'
import { ExitFormDialog } from '@/components/movements/exit-form-dialog'
import { mockMovements } from '@/lib/mock-data'

export default function MovementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Movimentacoes</h1>
          <p className="text-muted-foreground">
            Historico de entradas e saidas do estoque
          </p>
        </div>
        <div className="flex gap-2">
          <EntryFormDialog />
          <ExitFormDialog />
        </div>
      </div>

      <MovementsFilters />

      <MovementsTable movements={mockMovements} />
    </div>
  )
}
