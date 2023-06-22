import { Button, IconButton, Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import dayjs from 'dayjs'

const contestants = (onView, onRemove) => [
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
    accessorKey: 'talent',
    header: 'Talent',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Mobile Number',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'emailAddress',
    header: 'Email',
    cell: (info) => info.getValue(),
    width: 150,
  },

  {
    accessorKey: 'province',
    header: 'Province',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'barangay',
    header: 'Barangay',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'type',
    header: 'Type',
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

export default contestants
