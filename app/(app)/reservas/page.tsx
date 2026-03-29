import { ReservationsTable } from '@/components/reservations/reservations-table'
import { ReservationsFilters } from '@/components/reservations/reservations-filters'
import { ReservationFormDialog } from '@/components/reservations/reservation-form-dialog'
import { mockReservations } from '@/lib/mock-data'

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie as reservas de produtos do estoque
          </p>
        </div>
        <ReservationFormDialog />
      </div>

      <ReservationsFilters />

      <ReservationsTable reservations={mockReservations} />
    </div>
  )
}
