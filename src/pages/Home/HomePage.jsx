import React, { useState } from "react";
import {  Container } from "react-bootstrap";
import TableComponent from "../../components/TableComponent/TableComponent";
import tableConfig from "./constants";
import useUsers from "../../hooks/usersHook";
import UserModal from "./UserModal";

const HomePage = () => {
  const [users, loading, error] = useUsers();

  const [pagination, setPagination] = useState({
    rowPerPage: 5,
    currentPage: 1,
  });

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
  const onPageChange = () =>{

  }
  const onRowsPerPageChange = () =>{

  }

  return (
    <Container style={{marginTop : '14px'}}>
      <TableComponent
        loading={loading}
        error={error}
        data={users}
        tableConfig={tableConfig}
        helperFunc={{ pagination, setPagination, openModal, onPageChange,  }}
      />

    <UserModal user={tableModal.curRow} show={tableModal.show} onHide={handleHideModal} />
    </Container>
  );
};





export default HomePage;
