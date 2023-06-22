import { Button, IconButton, Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import dayjs from 'dayjs'

const groupMembers = (onEdit, onRemove) => [
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'middleName',
    header: 'Middle Name',
    cell: (info) => (info.getValue() ? info.getValue() : '--'),
    width: 150,
  },
  {
    accessorKey: 'visa',
    header: 'Visa',
    cell: (info) => (info.getValue() ? 'Yes' : 'No'),
    width: 150,
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Mobile Number',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: (info) => (
      <>
        <IconButton aria-label="edit" onClick={() => onEdit(info.row.original, info.row.index)}>
          <EditOutlinedIcon color="primary" />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onRemove(info.getValue(), info.row.index)}>
          <DeleteOutlineIcon color="error" />
        </IconButton>
      </>
    ),
    align: 'center',
    width: 120,
    minWidth: 120,
  },
]

export default groupMembers
