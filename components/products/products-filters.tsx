'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'

const categories = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'Fixadores', label: 'Fixadores' },
  { value: 'Eletrica', label: 'Eletrica' },
  { value: 'Hidraulica', label: 'Hidraulica' },
  { value: 'Ferramentas', label: 'Ferramentas' },
]

const stockLevels = [
  { value: 'all', label: 'Todos os Niveis' },
  { value: 'CRITICO', label: 'Critico' },
  { value: 'ALERTA', label: 'Alerta' },
  { value: 'OK', label: 'OK' },
]

export function ProductsFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <InputGroup>
          <InputGroupAddon>
            <Search className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar por codigo ou descricao..." />
        </InputGroup>
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Nivel" />
        </SelectTrigger>
        <SelectContent>
          {stockLevels.map((level) => (
            <SelectItem key={level.value} value={level.value}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
