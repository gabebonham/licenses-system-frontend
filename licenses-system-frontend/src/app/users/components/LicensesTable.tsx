'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { License } from '@/entities/license.entity'

export default function LicensesTable({ licenses }: { licenses: License[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Volume Máximo</TableHead>
          <TableHead className="text-right">Conteúdo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.map((license) => (
          <TableRow>
            <TableCell className="font-medium">{license.id}</TableCell>
            <TableCell>{license.product?.name}</TableCell>
            <TableCell>{license.status}</TableCell>
            <TableCell>{license.product?.maxVolume}</TableCell>
            <TableCell className="text-right">
              {license.product?.maxVolume}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
