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
import { Product } from '@/entities/product.entity'
import CreateProductModalButton from '@/app/admin/components/CreateProductModalButton'
import { deleteProduct } from '@/app/admin/actions/products.service'
import { userAgent } from 'next/server'
import { User } from '@/entities/user.entity'
import { createLicence } from '@/app/admin/actions/licences.service'
import CreateLicenseModalButton from '@/app/admin/components/CreateLicenseModalButton'
import { toast } from 'sonner'

export function createColumns(users: User[]) {
  const columns: ColumnDef<Product>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          className="text-blueLight/70"
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          className="text-blueLight/70"
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'id',
      header: 'id',
      cell: ({ row }) => <div className=" ">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'maxVolume',
      header: 'Volume Máx.',
      cell: ({ row }) => <div className=" ">{row.getValue('maxVolume')}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Preço',
      cell: ({ row }) => (
        <div className=" ">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(row.getValue('price') as number)}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'expertId',
      header: 'Expert Id',
      cell: ({ row }) => <div className=" ">{row.getValue('expertId')}</div>,
    },
    {
      accessorKey: 'lastLinkName',
      header: 'Nome no Last Link',
      cell: ({ row }) => (
        <div className=" ">{row.getValue('lastLinkName')}</div>
      ),
    },
    {
      accessorKey: 'webHookToken',
      header: 'Token Webhook',
      cell: ({ row }) => (
        <div className=" ">{row.getValue('webHookToken')}</div>
      ),
    },
    {
      accessorKey: 'licenseId',
      header: 'Id da licença',
      cell: ({ row }) =>
        row.original.licenses.length > 0 ? (
          <div
            className={
              row.original.licenses[0].status == 'Ativo'
                ? 'text-green-500'
                : ' text-red-500'
            }
          >
            {row.original.licenses[0].id}
          </div>
        ) : (
          <div></div>
        ),
    },

    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Ações',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-foreground text-blueLight lg:text-xl border-white/30 "
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/30" />
              <DropdownMenuItem
                onClick={() => {
                  deleteProduct(row.getValue('id'))

                  toast('Atualize a página')
                }}
                className="text-red-500"
              >
                Excluir Produto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  return columns
}
export function ProductsDataTable({
  products,
  users,
}: {
  products: Product[]
  users: User[]
}) {
  const columns = createColumns(users)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: products,
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
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-white/30 lg:text-xl lg:h-12"
        />
        <div className="lg:block hidden">
          <CreateProductModalButton
            btn={
              <CustomButton
                label="Criar Produto"
                css="w-fit px-12 h-12 lg:text-xl rounded-lg  "
                color="Action"
              />
            }
          />
        </div>
        <div className="lg:hidden">
          <CreateProductModalButton
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
