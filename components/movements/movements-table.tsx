'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Movement } from '@/lib/types'

interface MovementsTableProps {
  movements: Movement[]
}

export function MovementsTable({ movements }: MovementsTableProps) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tipo</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead>Solicitante / Pedido</TableHead>
            <TableHead>Data/Hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-md p-1.5 ${
                      movement.type === 'ENTRADA'
                        ? 'bg-stock-ok/10 text-stock-ok'
                        : 'bg-stock-critical/10 text-stock-critical'
                    }`}
                  >
                    {movement.type === 'ENTRADA' ? (
                      <ArrowDownLeft className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <span className="text-sm">
                    {movement.type === 'ENTRADA' ? 'Entrada' : 'Saida'}
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {movement.productCode}
              </TableCell>
              <TableCell className="font-medium">
                {movement.productDescription}
              </TableCell>
              <TableCell className="text-right">
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
              </TableCell>
              <TableCell className="text-muted-foreground">
                {movement.type === 'ENTRADA'
                  ? movement.purchaseOrderId || '-'
                  : movement.requesterName || '-'}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(movement.createdAt), "dd/MM/yyyy 'as' HH:mm", {
                  locale: ptBR,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
