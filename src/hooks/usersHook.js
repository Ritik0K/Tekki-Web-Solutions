import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUsers } from '../apis/apis';

const useUsers = ({pagination}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchUsers = async (params) => {
      try {
        let params = {
          page : pagination.currentPage,
          rowPerPage : pagination.rowsPerPage
        }
        const response = await getUsers(params) ;
        setUsers(response.data.filter((e,i)=> i < pagination.rowsPerPage));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, [pagination]);

  return [ users, loading, error, 1 ];
};

export default useUsers;
