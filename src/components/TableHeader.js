import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = () => {
  const titleFontWeight = { fontWeight: "bold" };
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={titleFontWeight}>Name</TableCell>
        <TableCell sx={titleFontWeight} align="center">
          Date
        </TableCell>
        <TableCell sx={titleFontWeight} align="center">
          Distance (km)
        </TableCell>
        <TableCell sx={titleFontWeight} align="center">
          Time
        </TableCell>
        <TableCell sx={titleFontWeight} align="center">
          Elevation gain (m)
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
