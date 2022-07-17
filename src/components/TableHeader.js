import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="center">Date</TableCell>
        <TableCell align="center">Distance (km)</TableCell>
        <TableCell align="center">Time</TableCell>
        <TableCell align="center">Elevation gain (m)</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
