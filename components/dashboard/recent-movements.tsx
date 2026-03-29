'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Movement } from '@/lib/types'

interface RecentMovementsProps {
  movements: Movement[]
}

export function RecentMovements({ movements }: RecentMovementsProps) {
  const recentMovements = movements.slice(0, 5)

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Movimentacoes Recentes</CardTitle>
          <CardDescription>Ultimas entradas e saidas de estoque</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/movimentacoes">Ver todas</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentMovements.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nenhuma movimentacao registrada.
          </p>
        ) : (
          <div className="space-y-4">
            {recentMovements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-md p-2 ${
                      movement.type === 'ENTRADA'
                        ? 'bg-stock-ok/10 text-stock-ok'
                        : 'bg-stock-critical/10 text-stock-critical'
                    }`}
                  >
                    {movement.type === 'ENTRADA' ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{movement.productDescription}</p>
                    <p className="text-sm text-muted-foreground">
                      {movement.productCode} -{' '}
                      {movement.type === 'ENTRADA'
                        ? 'Entrada'
                        : `Saida para ${movement.requesterName}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      movement.type === 'ENTRADA'
                        ? 'border-stock-ok text-stock-ok'
                        : 'border-stock-critical text-stock-critical'
                    }
                  >
                    {movement.type === 'ENTRADA' ? '+' : '-'}
                    {movement.quantity}
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(movement.createdAt), "dd/MM/yyyy 'as' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
