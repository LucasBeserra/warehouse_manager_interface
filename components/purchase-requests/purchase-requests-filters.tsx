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
  { value: 'PENDENTE', label: 'Pendentes' },
  { value: 'EM_COTACAO', label: 'Em Cotacao' },
  { value: 'APROVADA', label: 'Aprovadas' },
  { value: 'FINALIZADA', label: 'Finalizadas' },
]

const priorities = [
  { value: 'all', label: 'Todas as Prioridades' },
  { value: 'URGENTE', label: 'Urgente' },
  { value: 'ALTA', label: 'Alta' },
  { value: 'MEDIA', label: 'Media' },
  { value: 'BAIXA', label: 'Baixa' },
]

export function PurchaseRequestsFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <InputGroup>
          <InputGroupAddon>
            <Search className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar solicitacao..." />
        </InputGroup>
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
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
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Prioridade" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((priority) => (
            <SelectItem key={priority.value} value={priority.value}>
              {priority.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
