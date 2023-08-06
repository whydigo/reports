import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../slices/reportsSlice";
import preloader from "../assets/loading.gif";

// столбцы пришлось захардкодить на благо mui
const columns = [
  { id: "average", label: "Average", minWidth: 100 },
  { id: "close", label: "Close", minWidth: 70 },
  {
    id: "date",
    label: "Date",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "high",
    label: "High",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "label",
    label: "Label",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "low",
    label: "Low",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "minute",
    label: "Minute",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "notional",
    label: "Notional",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "numberOfTrades",
    label: "Number of trades",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "open",
    label: "Open",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "volume",
    label: "Volume",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const Reports = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  // достаем данные из стейта
  const reports = useSelector((state) => state.reportsReducer.reports);

  const loading = useSelector((state) => state.reportsReducer.loading);

  // фильтрую, чтобы не отображались не полные данные, на выходе получим только
  // данные со всеми ключами.
  const filterReports = reports.filter((i) => i.open !== null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="preloader">
        <img className="preloader_item" src={preloader} alt="preloader" />
      </div>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterReports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={filterReports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Reports;
