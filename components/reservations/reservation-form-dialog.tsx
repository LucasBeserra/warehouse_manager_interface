'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
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

export function ReservationFormDialog() {
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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Reserva</DialogTitle>
          <DialogDescription>
            Reserve produtos do estoque para uso futuro
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4 py-4">
            <Field>
              <FieldLabel>Codigo de Vinculo</FieldLabel>
              <Input placeholder="Ex: OS-2024-001" />
            </Field>
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
                  <span className="text-muted-foreground">Disponivel para reserva:</span>
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
            <Button type="submit">Confirmar Reserva</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
