'use client'

import {
  Package,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  FileText,
  Receipt,
  ArrowLeftRight,
  BookmarkCheck,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { DashboardStats } from '@/lib/types'

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      className: 'text-foreground',
    },
    {
      title: 'Estoque Critico',
      value: stats.criticalStock,
      icon: AlertCircle,
      className: 'text-stock-critical',
    },
    {
      title: 'Estoque em Alerta',
      value: stats.warningStock,
      icon: AlertTriangle,
      className: 'text-stock-warning',
    },
    {
      title: 'Estoque OK',
      value: stats.okStock,
      icon: CheckCircle,
      className: 'text-stock-ok',
    },
  ]

  const secondaryCards = [
    {
      title: 'Solicitacoes Pendentes',
      value: stats.pendingRequests,
      icon: FileText,
    },
    {
      title: 'Orcamentos Pendentes',
      value: stats.pendingBudgets,
      icon: Receipt,
    },
    {
      title: 'Movimentacoes do Mes',
      value: stats.monthlyMovements,
      icon: ArrowLeftRight,
    },
    {
      title: 'Reservas Ativas',
      value: stats.activeReservations,
      icon: BookmarkCheck,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`rounded-md bg-muted p-2.5 ${card.className}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-semibold">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {secondaryCards.map((card) => (
          <Card key={card.title} className="bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-md bg-muted p-2.5 text-muted-foreground">
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-semibold">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
