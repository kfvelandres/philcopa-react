import React from 'react'
import PropTypes from 'prop-types'

import Table from './Table'
import groupMembers from 'src/columns/groupMembers'

const sampleData = [
  {
    id: '1',
    lastName: 'Wick',
    firstName: 'John',
    middleName: '',
    mobileNumber: '666 666 6666',
    visa: true,
  },
  {
    id: '2',
    lastName: 'Stark',
    firstName: 'Tony',
    middleName: '',
    mobileNumber: '666 666 6666',
    visa: false,
  },
]

const GroupMembers = ({ id }) => {
  const handleEdit = () => {}
  const handleDelete = () => {}

  return <Table columns={groupMembers(handleEdit, handleDelete)} data={sampleData} />
}

GroupMembers.propTypes = {
  id: PropTypes.string,
}

export default GroupMembers
