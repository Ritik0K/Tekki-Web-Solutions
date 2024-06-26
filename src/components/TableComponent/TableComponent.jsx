import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";

import "./table.css";

import Pagination from "./components/Pagination";
import { ascending, descending, sortable } from "../icons/sortingIcons";

const TableComponent = ({
  data = [],
  tableConfig = {},
  error = false,
  loading = true,
  helperFunc = {},
}) => {
  const [rowData, setRowData] = useState(data);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ key: "", ascending: true });
  const {pagination , setPagination} = helperFunc;
  const { columnList, searchEnabled, numberOfRows } = tableConfig;
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (key) => {
    setSorting((prev) => ({
      key,
      ascending: key === prev.key ? (prev.ascending ? false : true) : true,
    }));
  };

  useEffect(() => {
    let prev = [...rowData];
    let key = sorting.key;
    prev.sort((a, b) => {
      if (typeof a[key] === "string")
        return sorting.ascending
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      else return sorting.ascending ? a[key] - b[key] : b[key] - a[key];
    });
    setRowData(prev);
  }, [sorting]);

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
      <Row className="py-3">
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
        <Col style={{ overflow: "scroll", maxHeight: "80vh" }}>
          <Table className="custom-table">
            <thead>
              <tr>
                {columnList.map((column, idx) => {
                  return (
                    <th key={idx}
                      onClick={() =>
                        column.sortable ? handleSort(column.accessor) : () => {}
                      }
                    >
                      {column.columnName}{" "}
                      {sorting.key === column.accessor ? (
                        sorting.ascending ? (
                          <img src={ascending} />
                        ) : (
                          <img src={descending} />
                        )
                      ) : (
                        column.sortable && <img src={sortable} />
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, idx) => (
                <tr key={row.id} onClick={() => helperFunc.openModal(row)}>
                  {columnList.map((col, idx) => {
                    return (
                      <td key={idx}>
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
      <Pagination
        totalPages={helperFunc?.totalPages || 5}
        currentPage={pagination?.currentPage || 1}
        rowsPerPage={pagination?.rowsPerPage || 5}
        onPageChange={helperFunc?.onPageChange}
        onRowsPerPageChange={helperFunc?.onRowsPerPageChange}
        numberOfRows={tableConfig.numberOfRows}
      />
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
