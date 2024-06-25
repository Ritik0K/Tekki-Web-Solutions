import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import TableComponent from "../../components/TableComponent/TableComponent";
import tableConfig from "./constants";
import useUsers from "../../hooks/usersHook";
import CustomModal from "../../components/Modal/Modal";

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

  return (
    <Container style={{marginTop : '14px'}}>
      <TableComponent
        loading={loading}
        error={error}
        data={users}
        tableConfig={tableConfig}
        helperFunc={{ pagination, setPagination, openModal }}
      />

      <CustomModal
        title={"User Details"}
        body={<ModalBody user={tableModal.curRow} />}
        show={tableModal.show}
        onHide={handleHideModal}
      />
    </Container>
  );
};

const ModalBody = ({ user  }) => {
  return (
    <Card>
    <Card.Body>
      <Card.Title>{user?.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">ID: {user?.id}</Card.Subtitle>
      <Card.Text><strong>Username:</strong> {user?.username}</Card.Text>
      <Card.Text><strong>Email:</strong> {user?.email}</Card.Text>
      <Card.Text><strong>Address:</strong> {user?.address?.street}, {user?.address?.city}</Card.Text>
      <Card.Text><strong>Phone:</strong> {user?.phone}</Card.Text>
      <Card.Text><strong>Website:</strong> <a href={`http://${user?.website}`} target="_blank" rel="noopener noreferrer">{user?.website}</a></Card.Text>
    </Card.Body>
    </Card>
  );
};

export default HomePage;
