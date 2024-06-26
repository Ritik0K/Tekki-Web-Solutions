import React, { useState } from "react";
import {  Container } from "react-bootstrap";
import tableConfig from "./constants";
import useUsers from "../../hooks/usersHook";
import UserModal from "./components/UserModal";
import UserList from "./components/UserList";

const HomePage = () => {
  
  const [pagination, setPagination] = useState({
    rowsPerPage: 5,
    currentPage: 1,
  });
  const [users, loading, error, totalPages] = useUsers({pagination});
  
  const [tableModal, setTableModal] = useState({
    curRow: null,
    show: false,
  });

  const handleHideModal = () => {
    setTableModal(prev=>({...prev, curRow: null}));
    setTableModal(prev=>({...prev, show: false}));
  };
  const openModal = (row) => {
    setTableModal({ curRow: row, show: true });
  };
  const onPageChange = (page) =>{
    setPagination(prev=>({...prev, currentPage: page }))
  }
  const onRowsPerPageChange = (rowsPerPage) =>{
    setPagination(prev=>({...prev, rowsPerPage : rowsPerPage }))
  }

  const helperFunc ={ pagination, setPagination, openModal, onPageChange,onRowsPerPageChange, totalPages }

  return (
    <Container style={{marginTop : '14px'}}>
      <UserList
        loading={loading}
        error={error}
        users={users}
        tableConfig={tableConfig}
        helperFunc={helperFunc}
      />

    <UserModal user={tableModal.curRow} show={tableModal.show} onHide={handleHideModal} />
    </Container>
  );
};





export default HomePage;
