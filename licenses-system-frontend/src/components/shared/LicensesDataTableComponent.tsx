'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CustomButton from './buttons/CustomButton'
import CreateBotModalButton from '@/app/admin/components/CreateBotModalButton'
import { Expert } from '@/entities/expert.entity'
import { deleteExpert } from '@/app/admin/actions/experts.service'
import { License } from '@/entities/license.entity'
import {
  deleteLicense,
  toggleLicenseStatus,
} from '@/app/admin/actions/licences.service'
import CreateLicenseModalButton from '@/app/admin/components/CreateLicenseModalButton'
import { toast } from 'sonner'

export const columns: ColumnDef<License>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => <div className=" ">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'productId',
    header: 'Id do Produto',
    cell: ({ row }) => <div className=" ">{row.getValue('productId')}</div>,
  },
  {
    accessorKey: 'userId',
    header: 'Id do Usuário',
    cell: ({ row }) => <div className=" ">{row.getValue('userId')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={
          row.original.status == 'Ativo' ? 'text-green-500' : 'text-red-500'
        }
      >
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'statusToggle',
    accessorKey: 'statusToggle',
    header: 'Alterar Status',
    cell: ({ row }) => {
      const license = row.original

      return (
        <CustomButton
          color="Action"
          css={`
            ${license.status == 'Inativo' && 'bg-red-400'}
          `}
          label={license.status == 'Ativo' ? 'Desativar' : 'Ativar'}
          action={() => {
            toggleLicenseStatus(
              license.id,
              license.status == 'Ativo' ? 'Inativo' : 'Ativo',
            )
            toast('Atualize a página')
          }}
        />
      )
    },
  },
  {
    id: 'deleteAction',
    accessorKey: 'deleteAction',
    header: 'Deletar',
    cell: ({ row }) => {
      const license = row.original

      return (
        <CustomButton
          color="Option"
          label="Deletar Licença"
          action={() => {
            deleteLicense(license.id)

            toast('Atualize a página')
          }}
        />
      )
    },
  },
]

export function LicensesDataTable({ licenses }: { licenses: License[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: licenses,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full text-blueLight  ">
      <div className="flex items-center py-4 gap-x-4 justify-around">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-white/30 lg:text-xl lg:h-12"
        />
        <div className="lg:block hidden">
          <CreateLicenseModalButton
            btn={
              <CustomButton
                label="Criar Licença"
                css="w-fit px-12 h-12 lg:text-xl rounded-lg  "
                color="Action"
              />
            }
          />
        </div>
        <div className="lg:hidden">
          <CreateLicenseModalButton
            btn={
              <CustomButton
                icon="Plus"
                css="w-fit  lg:text-xl rounded-lg  "
                color="Action"
              />
            }
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto cursor-pointer border-white/30 text-blueLight/60 lg:text-xl lg:h-12"
            >
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-foreground text-blueLight "
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize lg:text-xl"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto rounded-md border border-white/30 bg-foreground px-8 ">
        <Table className="min-w-full  ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-white/30 text-blueLight lg:h-18"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-blueLight/70 lg:text-xl"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-white/30">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-white/30 lg:text-xl lg:h-18"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer lg:text-xl"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer lg:text-xl"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
