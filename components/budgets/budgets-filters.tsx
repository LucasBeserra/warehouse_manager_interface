'use client'

import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'

const statuses = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'EM_COTACAO', label: 'Em Cotacao' },
  { value: 'AGUARDANDO_APROVACAO', label: 'Aguardando Aprovacao' },
  { value: 'APROVADO', label: 'Aprovados' },
  { value: 'REJEITADO', label: 'Rejeitados' },
]

export function BudgetsFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <InputGroup>
          <InputGroupAddon>
            <Search className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar por fornecedor ou solicitacao..." />
        </InputGroup>
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
