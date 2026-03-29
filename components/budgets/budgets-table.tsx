'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreHorizontal, Eye, Check, X, ShoppingCart } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Budget } from '@/lib/types'

interface BudgetsTableProps {
  budgets: Budget[]
}

export function BudgetsTable({ budgets }: BudgetsTableProps) {
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'EM_COTACAO':
        return (
          <Badge variant="outline" className="border-chart-4 text-chart-4">
            Em Cotacao
          </Badge>
        )
      case 'AGUARDANDO_APROVACAO':
        return (
          <Badge variant="outline" className="border-stock-warning text-stock-warning">
            Aguardando Aprovacao
          </Badge>
        )
      case 'APROVADO':
        return (
          <Badge variant="outline" className="border-stock-ok text-stock-ok">
            Aprovado
          </Badge>
        )
      case 'REJEITADO':
        return (
          <Badge variant="outline" className="border-stock-critical text-stock-critical">
            Rejeitado
          </Badge>
        )
      default:
        return null
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const openDetails = (budget: Budget) => {
    setSelectedBudget(budget)
    setDetailsOpen(true)
  }

  return (
    <>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Orcamento</TableHead>
              <TableHead>Solicitacao</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell className="font-mono text-sm">
                  ORC-{budget.id.padStart(4, '0')}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  SC-{budget.purchaseRequestId.padStart(4, '0')}
                </TableCell>
                <TableCell className="font-medium">
                  {budget.supplierName}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(budget.totalValue)}
                </TableCell>
                <TableCell>{getStatusBadge(budget.status)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(budget.createdAt), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDetails(budget)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      {budget.status === 'AGUARDANDO_APROVACAO' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-stock-ok">
                            <Check className="mr-2 h-4 w-4" />
                            Aprovar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Rejeitar
                          </DropdownMenuItem>
                        </>
                      )}
                      {budget.status === 'APROVADO' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Gerar Pedido
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Orcamento ORC-{selectedBudget?.id.padStart(4, '0')}
            </DialogTitle>
            <DialogDescription>
              Detalhes do orcamento e itens cotados
            </DialogDescription>
          </DialogHeader>
          {selectedBudget && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fornecedor</p>
                  <p className="font-medium">{selectedBudget.supplierName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedBudget.status)}</div>
                </div>
              </div>
              {selectedBudget.observations && (
                <div>
                  <p className="text-sm text-muted-foreground">Observacoes</p>
                  <p className="text-sm">{selectedBudget.observations}</p>
                </div>
              )}
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">Valor Un.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBudget.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">
                          {item.productCode}
                        </TableCell>
                        <TableCell>{item.productDescription}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.unitPrice)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.totalPrice)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(selectedBudget.totalValue)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
