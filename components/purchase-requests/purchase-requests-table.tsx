'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreHorizontal, Eye, FileText, Receipt } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import type { PurchaseRequest } from '@/lib/types'

interface PurchaseRequestsTableProps {
  requests: PurchaseRequest[]
}

export function PurchaseRequestsTable({ requests }: PurchaseRequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDENTE':
        return (
          <Badge variant="outline" className="border-stock-warning text-stock-warning">
            Pendente
          </Badge>
        )
      case 'EM_COTACAO':
        return (
          <Badge variant="outline" className="border-chart-4 text-chart-4">
            Em Cotacao
          </Badge>
        )
      case 'APROVADA':
        return (
          <Badge variant="outline" className="border-stock-ok text-stock-ok">
            Aprovada
          </Badge>
        )
      case 'FINALIZADA':
        return (
          <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
            Finalizada
          </Badge>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENTE':
        return (
          <Badge className="bg-stock-critical text-foreground">
            Urgente
          </Badge>
        )
      case 'ALTA':
        return (
          <Badge className="bg-stock-warning text-background">
            Alta
          </Badge>
        )
      case 'MEDIA':
        return (
          <Badge variant="secondary">
            Media
          </Badge>
        )
      case 'BAIXA':
        return (
          <Badge variant="outline">
            Baixa
          </Badge>
        )
      default:
        return null
    }
  }

  const openDetails = (request: PurchaseRequest) => {
    setSelectedRequest(request)
    setDetailsOpen(true)
  }

  return (
    <>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Solicitacao</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-mono text-sm">
                  SC-{request.id.padStart(4, '0')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{request.items.length}</span>
                    <span className="text-muted-foreground">
                      {request.items.length === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(request.createdAt), 'dd/MM/yyyy', {
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
                      <DropdownMenuItem onClick={() => openDetails(request)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      {request.status === 'PENDENTE' && (
                        <DropdownMenuItem>
                          <Receipt className="mr-2 h-4 w-4" />
                          Iniciar Cotacao
                        </DropdownMenuItem>
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Solicitacao SC-{selectedRequest?.id.padStart(4, '0')}
            </DialogTitle>
            <DialogDescription>
              Detalhes da solicitacao de compra
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {getPriorityBadge(selectedRequest.priority)}
                {getStatusBadge(selectedRequest.status)}
                <span className="text-sm text-muted-foreground">
                  Criada em{' '}
                  {format(new Date(selectedRequest.createdAt), "dd/MM/yyyy 'as' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead>Unidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRequest.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">
                          {item.productCode}
                        </TableCell>
                        <TableCell>{item.productDescription}</TableCell>
                        <TableCell className="text-right font-medium">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.unit}
                        </TableCell>
                      </TableRow>
                    ))}
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
