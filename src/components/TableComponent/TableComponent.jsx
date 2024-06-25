import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";

import "./table.style.css";
import Pagination from "./components/Pagination";

const TableComponent = ({
  data = [],
  tableConfig = {},
  error = false,
  loading = true,
  helperFunc={}
}) => {
  const [rowData, setRowData] = useState(data);
  const [search, setSearch] = useState("");
  const { columnList, searchEnabled, numberOfRows } = tableConfig;
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (key) => {
    console.log(key);
    let prev = [...rowData];
    prev.sort((a, b) => {
      if (typeof a[key] === "string") a[key].localeCompare(b[key]);
      else a[key] - b[key];
    });
    console.log(prev);
    setRowData(prev);
  };

  useEffect(() => {
    if (search === "") {
      setRowData(data);
    } else {
      const filteredData = data.filter((row) => {
        let condition = false;
        Object.values(row).forEach((obj) => {
          let curVal = obj;
          if (typeof obj !== "string") {
            curVal = JSON.stringify(obj);
          }
          console.log(curVal, search);
          if (curVal?.toLowerCase().includes(search.toLowerCase()))
            condition = true;
        });
        return condition;
      });
      setRowData(filteredData);
    }
  }, [data, search]);

  return (
    <Container>
      <Row class="py-3">
        <Col lg={9} sm={6} xs={6}>
          <h2>Table Title</h2>
        </Col>
        <Col lg={3} sm={6} xs={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Form.Control
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{overflow : 'scroll', maxHeight : '80vh'}}>
       
      <Table className="custom-table">
        <thead>
          <tr>
            {columnList.map((column) => {
              return (
                <th
                  onClick={() =>
                    column.sortable ? handleSort(column.accessor) : () => {}
                  }
                >
                  {column.columnName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row) => (
            <tr key={row.id} onClick={()=>helperFunc.openModal(row)}>
              {columnList.map((col) => {
                return (
                  <td>
                    <RenderCell row={row} col={col} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      </Col>
      </Row>
      <Pagination totalPages={5} currentPage={1} rowsPerPage={5} />
    </Container>
  );
};

const RenderCell = ({ row, col }) => {
  let cell = row[col.accessor];
  if (col.Cell) {
    return col.Cell({ row, col, cell });
  } else {
    return cell;
  }
};
export default TableComponent;
