'use client'

import type { selectSiteSchemaType } from '@/zod-schemas/site'

import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import { MoreHorizontal, TableOfContents } from 'lucide-react'

import Link from 'next/link'

type Props = {
  data: selectSiteSchemaType[]
}

export default function SiteTable({ data }: Props) {
  const columnHeadersArray: Array<keyof selectSiteSchemaType> = [
    'name',
    'description',
    'subdirectory',
    'active'
  ]

  const columnHelper = createColumnHelper<selectSiteSchemaType>()

  const ActionsCell = ({ row }: CellContext<selectSiteSchemaType, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/tickets/form?customerId=${row.original.id}`}
              className='w-full'
              prefetch={false}
            >
              New Ticket
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/sites/form?siteId=${row.original.id}`}
              className='w-full'
              prefetch={false}
            >
              Edit Site
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  ActionsCell.displayName = 'ActionsCell'

  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => <TableOfContents />,
      cell: ActionsCell
    }),
    ...columnHeadersArray.map(columnName => {
      return columnHelper.accessor(columnName, {
        id: columnName,
        header: columnName[0].toUpperCase() + columnName.slice(1)
      })
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='border-border mt-6 overflow-hidden rounded-lg border'>
      <Table className='border'>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  className={`bg-secondary ${header.id === 'actions' ? 'w-12' : ''}`}
                >
                  <div
                    className={`${header.id === 'actions' ? 'flex items-center justify-center' : ''}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className='hover:bg-border/25 dark:hover:bg-ring/40 cursor-pointer'
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className='border'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
