import { StatsCards } from '@/components/dashboard/stats-cards'
import { StockAlertsTable } from '@/components/dashboard/stock-alerts-table'
import { RecentMovements } from '@/components/dashboard/recent-movements'
import {
  mockDashboardStats,
  mockProducts,
  mockMovements,
} from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visao geral do estoque e operacoes
        </p>
      </div>

      <StatsCards stats={mockDashboardStats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StockAlertsTable products={mockProducts} />
        <RecentMovements movements={mockMovements} />
      </div>
    </div>
  )
}
