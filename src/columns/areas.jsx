import { Button, IconButton, Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const areas = (onView, onRemove) => [
  {
    accessorKey: 'region.text',
    header: 'Region',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'province.text',
    header: 'Province',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'city.text',
    header: 'City',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'barangay.text',
    header: 'Barangay',
    cell: (info) => info.getValue(),
    width: 150,
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: (info) => (
      <>
        <IconButton aria-label="edit" onClick={() => onView(info.row.original, info.row.index)}>
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

export default areas
