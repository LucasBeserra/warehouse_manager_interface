'use client'

import { useState } from 'react'
import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react'
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
import { Progress } from '@/components/ui/progress'
import type { Product } from '@/lib/types'

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const getStockLevelBadge = (level: string) => {
    switch (level) {
      case 'CRITICO':
        return (
          <Badge variant="outline" className="border-stock-critical text-stock-critical">
            Critico
          </Badge>
        )
      case 'ALERTA':
        return (
          <Badge variant="outline" className="border-stock-warning text-stock-warning">
            Alerta
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-stock-ok text-stock-ok">
            OK
          </Badge>
        )
    }
  }

  const getStockPercentage = (product: Product) => {
    return Math.min((product.availableStock / product.maxStock) * 100, 100)
  }

  const getStockProgressColor = (level: string) => {
    switch (level) {
      case 'CRITICO':
        return 'bg-stock-critical'
      case 'ALERTA':
        return 'bg-stock-warning'
      default:
        return 'bg-stock-ok'
    }
  }

  const openDetails = (product: Product) => {
    setSelectedProduct(product)
    setDetailsOpen(true)
  }

  return (
    <>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Codigo</TableHead>
              <TableHead>Descricao</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead className="text-right">Fisico</TableHead>
              <TableHead className="text-right">Reservado</TableHead>
              <TableHead className="text-right">Disponivel</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono text-sm">{product.code}</TableCell>
                <TableCell className="font-medium">{product.description}</TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell className="text-muted-foreground">{product.unit}</TableCell>
                <TableCell className="text-right">{product.physicalStock}</TableCell>
                <TableCell className="text-right text-muted-foreground">{product.reservedStock}</TableCell>
                <TableCell className="text-right font-medium">{product.availableStock}</TableCell>
                <TableCell>{getStockLevelBadge(product.stockLevel)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDetails(product)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Inativar
                      </DropdownMenuItem>
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
            <DialogTitle>Detalhes do Produto</DialogTitle>
            <DialogDescription>
              Informacoes completas sobre o produto selecionado
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Codigo</p>
                  <p className="font-mono font-medium">{selectedProduct.code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categoria</p>
                  <p className="font-medium">{selectedProduct.category}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Descricao</p>
                <p className="font-medium">{selectedProduct.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Unidade</p>
                  <p className="font-medium">{selectedProduct.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Est. Minimo</p>
                  <p className="font-medium">{selectedProduct.minStock}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Est. Maximo</p>
                  <p className="font-medium">{selectedProduct.maxStock}</p>
                </div>
              </div>
              <div className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Nivel de Estoque</span>
                  {getStockLevelBadge(selectedProduct.stockLevel)}
                </div>
                <Progress
                  value={getStockPercentage(selectedProduct)}
                  className="h-2"
                  indicatorClassName={getStockProgressColor(selectedProduct.stockLevel)}
                />
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <p className="text-muted-foreground">Fisico</p>
                    <p className="font-semibold">{selectedProduct.physicalStock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reservado</p>
                    <p className="font-semibold">{selectedProduct.reservedStock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Disponivel</p>
                    <p className="font-semibold">{selectedProduct.availableStock}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
