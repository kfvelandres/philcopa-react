import React from 'react'
import PropTypes from 'prop-types'
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
//import { ButtonUnstyled } from '@mui/base'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    padding: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F5FAF9',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const ButtonHeader = styled('button')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  fontFamily: 'inherit',
  fontWeight: 700,
  background: 'none',
  border: 0,
  cursor: 'pointer',
  verticalAlign: 'text-top',
  padding: 0,
  textAlign: 'left',
}))

const Table = ({ data, columns, sorting, onSorting }) => {
  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting: sorting,
    },
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: false,
    manualPagination: true,
    enableSorting: !!sorting,
  })

  const handleSort = (id) => {
    if (sorting.length) {
      // If sorting is the same field and descending is now true, remove sorting
      if (sorting[0].id === id && sorting[0].desc) {
        onSorting([])
      } else {
        onSorting([{ id: id, desc: sorting[0].id === id ? !sorting[0].desc : false }])
      }
    } else {
      onSorting([{ id: id, desc: false }])
    }
  }

  return (
    <TableContainer sx={{ display: data?.length > 0 ? 'block' : 'none', overflowX: 'auto' }}>
      <MuiTable size="small">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    align={header.column.columnDef?.align}
                    sx={{
                      width: header.column.columnDef?.width ? header.column.columnDef.width : 'auto',
                      minWidth: header.column.columnDef?.minWidth ? header.column.columnDef.minWidth : 'auto',
                      maxWidth: header.column.columnDef?.maxWidth ? header.column.columnDef.maxWidth : '',
                    }}>
                    {header.column.getCanSort() ? (
                      <ButtonHeader onClick={() => handleSort(header.column.id)}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ArrowDropUpIcon sx={{ verticalAlign: 'middle' }} />,
                          desc: <ArrowDropDownIcon sx={{ verticalAlign: 'middle' }} />,
                        }[header.column.getIsSorted()] ?? null}
                      </ButtonHeader>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} align={cell.column.columnDef?.align}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  sorting: PropTypes.array,
  onSorting: PropTypes.func,
}

export default Table
