import React from 'react'
import TableComponent from '../../../components/TableComponent/TableComponent'
const UserList = ({loading, error, users, tableConfig, helperFunc}) => {
  return (
    <TableComponent
    loading={loading}
    error={error}
    data={users}
    tableConfig={tableConfig}
    helperFunc={helperFunc}
  />
  )
}

export default UserList