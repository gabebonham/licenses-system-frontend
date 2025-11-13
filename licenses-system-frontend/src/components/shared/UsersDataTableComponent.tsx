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
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'
import { User } from '@/entities/user.entity'
import CreateUserModalButton from '@/app/admin/components/CreateUserModalButton'
import { deleteUser } from '@/app/admin/actions/users.service'
import { toast } from 'sonner'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => <div className=" ">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue('role')}</div>
    ),
  },

  {
    accessorKey: 'accountNumber',
    header: 'Conta',
    cell: ({ row }) => <div className=" ">{row.getValue('accountNumber')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className=" ">{row.getValue('email')}</div>,
  },

  {
    id: 'actions',
    header: 'Ações',
    accessorKey: 'actions',
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar id do Usuário
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteUser(row.getValue('id'))

                toast('Atualize a página')
              }}
              className="text-red-500"
            >
              Excluir Usuário
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/30" />
            <DropdownMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>Ver Licenças</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-foreground text-blueLight lg:text-xl border-white/30 "
                >
                  <ScrollArea>
                    <div className="max-h-36">
                      {payment.licenses &&
                        payment.licenses.map((license) => (
                          <p
                            className={`${
                              license.status == 'Ativo'
                                ? 'text-green-400'
                                : 'text-red-500'
                            }`}
                          >
                            {license.id}
                          </p>
                        ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function UsersDataTable({ users }: { users: User[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: users,
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
    <div className="w-full text-dark  ">
      <div className="flex items-center py-4 gap-x-4 justify-around">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-dark border-1 text-dark lg:text-xl lg:h-12"
        />
        <div className="lg:block hidden">
          <CreateUserModalButton
            btn={
              <CustomButton
                label="Adicionar Usuário"
                css="w-fit px-12 h-12 lg:text-xl   "
                color="Option"
              />
            }
          />
        </div>
        <div className="lg:hidden">
          <CreateUserModalButton
            btn={
              <CustomButton
                icon="Plus"
                css="w-fit  lg:text-xl rounded-lg  "
                color="Option"
              />
            }
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto cursor-pointer border-dark bg-grayLight text-dark lg:text-xl lg:h-12"
            >
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-grayLight text-dark ">
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
      <div className="overflow-x-auto rounded-md border border-dark bg-grayLight px-8 ">
        <Table className="min-w-full  ">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-dark   lg:h-18" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-dark lg:text-xl">
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
          <TableBody className="border-dark">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-dark lg:text-xl lg:h-18"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.columnDef.header == 'Role' ? (
                        cell.getValue() == 'admin' ? (
                          <Badge className="bg-gradient-to-br from-yellow-400 rounded-xl font-normal to-yellow-800">
                            Admin
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-to-br rounded-xl from-blue-300 to-blue-800">
                            User
                          </Badge>
                        )
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
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
