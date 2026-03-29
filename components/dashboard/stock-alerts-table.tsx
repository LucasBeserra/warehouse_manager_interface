'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Product } from '@/lib/types'

interface StockAlertsTableProps {
  products: Product[]
}

export function StockAlertsTable({ products }: StockAlertsTableProps) {
  const criticalProducts = products.filter(
    (p) => p.stockLevel === 'CRITICO' || p.stockLevel === 'ALERTA'
  )

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

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Alertas de Estoque</CardTitle>
          <CardDescription>
            Produtos com estoque abaixo do nivel ideal
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/produtos">Ver todos</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {criticalProducts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nenhum alerta de estoque no momento.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Descricao</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Disponivel</TableHead>
                <TableHead className="text-right">Minimo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticalProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">
                    {product.code}
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.availableStock} {product.unit}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {product.minStock} {product.unit}
                  </TableCell>
                  <TableCell>{getStockLevelBadge(product.stockLevel)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
