'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreHorizontal, ArrowUpRight, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Reservation } from '@/lib/types'

interface ReservationsTableProps {
  reservations: Reservation[]
}

export function ReservationsTable({ reservations }: ReservationsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ATIVA':
        return (
          <Badge variant="outline" className="border-chart-4 text-chart-4">
            Ativa
          </Badge>
        )
      case 'CONSUMIDA':
        return (
          <Badge variant="outline" className="border-stock-ok text-stock-ok">
            Consumida
          </Badge>
        )
      case 'CANCELADA':
        return (
          <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
            Cancelada
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vinculo</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead>Solicitante</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-mono text-sm">
                {reservation.linkCode}
              </TableCell>
              <TableCell className="font-mono text-sm">
                {reservation.productCode}
              </TableCell>
              <TableCell className="font-medium">
                {reservation.productDescription}
              </TableCell>
              <TableCell className="text-right font-medium">
                {reservation.quantity}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {reservation.requesterName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(reservation.createdAt), 'dd/MM/yyyy', {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell>{getStatusBadge(reservation.status)}</TableCell>
              <TableCell>
                {reservation.status === 'ATIVA' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Converter em Saida
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <X className="mr-2 h-4 w-4" />
                        Cancelar Reserva
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
