import React from 'react';
import './pagination.css';

const Pagination = ({ totalPages=5, currentPage=1, onPageChange, rowsPerPage=5, onRowsPerPageChange, numberOfRows=[5,10,15] }) => {
  const handleClick = (page) => {
    onPageChange(page);
  };

  const handleRowsPerPageChange = (e) => {
    onRowsPerPageChange(parseInt(e.target.value));
  };

  return (
    <div className="custom-pagination">
      <div className="rows-per-page">
        <label htmlFor="rowsPerPage">Rows per page:</label>
        <select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {numberOfRows.map(e=>{
                return (
                    <option key={e} value={e}>{e}</option>
                )
            })}
        </select>
      </div>
      <div className="pagination-controls">
        <div className={`arrow ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handleClick(currentPage - 1)}>
          &lt;
        </div>
        
          <div
            className={`page-number active`}
          >
            {currentPage}
          </div>
       
        <div className={`arrow ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => handleClick(currentPage + 1)}>
          &gt;
        </div>
      </div>
    </div>
  );
};

export default Pagination;
