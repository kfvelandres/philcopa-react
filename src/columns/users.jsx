import { Button, IconButton, Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import dayjs from 'dayjs'

const users = (onView, onDelete) => [
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    cell: (info) => (info.getValue() ? info.getValue() : '--'),
    width: 150,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: (info) => (info.getValue() ? info.getValue() : '--'),
    width: 150,
  },
  {
    accessorKey: 'middleName',
    header: 'Middle Name',
    cell: (info) => (info.getValue() ? info.getValue() : '--'),
    width: 150,
  },
  {
    accessorKey: 'emailAddress',
    header: 'Email',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: (info) => (
      <>
        <IconButton aria-label="edit" onClick={() => onView(info.row.original, info.row.index)}>
          <VisibilityIcon color="primary" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onDelete(info.getValue(), info.row.index)}>
          <DeleteOutlineIcon color="error" />
        </IconButton>
      </>
    ),
    align: 'center',
    width: 120,
    minWidth: 120,
  },
]

export default users
