import { Button, IconButton, Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import dayjs from 'dayjs'

const competitions = (onView, onRemove) => [
  {
    accessorKey: 'competitionCode',
    header: 'Competition Code',
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
    accessorKey: 'province',
    header: 'Province',
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

export default competitions
