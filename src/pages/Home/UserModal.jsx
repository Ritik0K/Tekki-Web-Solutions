import React from 'react'
import CustomModal from '../../components/Modal/Modal'
import { Card } from 'react-bootstrap'

const UserModal = ({user, show, onHide}) => {
  return (
      <CustomModal
        title={"User Details"}
        body={<ModalBody user={user} />}
        show={show}
        onHide={onHide}
      />
  )
}

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

export default UserModal
