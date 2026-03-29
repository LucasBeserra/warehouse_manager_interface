'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { mockProducts } from '@/lib/mock-data'

export function ExitFormDialog() {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>('')

  const product = mockProducts.find((p) => p.id === selectedProduct)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-stock-critical text-stock-critical hover:bg-stock-critical/10">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Registrar Saida
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Saida</DialogTitle>
          <DialogDescription>
            Registre a saida de produtos do estoque
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4 py-4">
            <Field>
              <FieldLabel>Produto</FieldLabel>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.code} - {product.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            {product && (
              <div className="rounded-md border border-border bg-muted/50 p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Disponivel:</span>
                  <span className="font-medium">{product.availableStock} {product.unit}</span>
                </div>
              </div>
            )}
            <Field>
              <FieldLabel>Quantidade</FieldLabel>
              <Input
                type="number"
                placeholder="0"
                min="1"
                max={product?.availableStock}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-stock-critical text-foreground hover:bg-stock-critical/90">
              Confirmar Saida
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
