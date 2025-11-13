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
import { deleteExpert, setFirst } from '@/app/admin/actions/experts.service'
import CustomInput from './inputs/CustomInput'
import { toast } from 'sonner'
import EditBotModalButton from '@/app/admin/components/EditBotModalButton'

export function getColumns(ref: any) {
  const columns: ColumnDef<Expert>[] = [
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
      accessorKey: 'description',
      header: 'Descrição',
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue('description')}</div>
      ),
    },
    {
      accessorKey: 'magicNumber',
      header: 'Magic',
      cell: ({ row }) => <div className=" ">{row.getValue('magicNumber')}</div>,
    },
    {
      accessorKey: 'initDate',
      header: 'Data Início',
      cell: ({ row }) => (
        <div className=" ">
          {new Date(row.getValue('initDate') as string).toLocaleDateString(
            'pt-BR',
          )}
        </div>
      ),
    },
    {
      accessorKey: 'first',
      header: 'Primeiro',
      cell: ({ row }) => {
        const value = row.getValue('first') as boolean
        const [current, setCurrent] = React.useState(value)
        return (
          <Checkbox
            checked={current}
            onCheckedChange={(checked) => {
              setFirst(row.getValue('id'), value)
              setCurrent(!current)
            }}
          />
        )
      },
    },

    {
      accessorKey: 'archive',
      header: 'Arquivo',
      cell: ({ row }) => (
        <CustomInput
          type="automatedFile"
          placeholder={
            row.original?.fileContentUrl
              ? 'Atualizar arquivo'
              : 'Nenhum Arquivo...'
          }
          inputId={row.getValue('id')}
          name="archive"
          css="bg-transparent hover:bg-transparent  text-white w-fit p-0"
        />
      ),
    },

    {
      accessorKey: 'delete',
      header: 'Deletar',
      cell: ({ row }) => (
        <CustomButton
          label="Deletar"
          color="Option"
          action={() => {
            deleteExpert(row.getValue('id'))
            toast('Atualize a página')
          }}
        />
      ),
    },
    {
      accessorKey: 'edit',
      header: 'Editar',
      cell: ({ row }) => (
        <EditBotModalButton
          btn={<CustomButton color="Option" label="Editar" />}
          id={row.getValue('id')}
        />
      ),
    },
  ]
  return columns
}

export function BotsDataTable({ experts }: { experts: Expert[] }) {
  const ref = React.useRef<HTMLInputElement | null>(null)
  const columns = getColumns(ref)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: experts,
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
          placeholder="Filter nome..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-dark lg:text-xl lg:h-12"
        />
        <div className="lg:block hidden">
          <CreateBotModalButton
            btn={
              <CustomButton
                label="Criar Robô"
                css="w-fit px-12 h-12 lg:text-xl rounded-lg  "
                color="Option"
              />
            }
          />
        </div>
        <div className="lg:hidden">
          <CreateBotModalButton
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
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-dark text-dark lg:h-18"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-dark lg:text-xl">
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
