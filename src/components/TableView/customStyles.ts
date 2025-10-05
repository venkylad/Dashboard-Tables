import type { TableStyles } from "react-data-table-component";

export const customStyles: TableStyles = {
  headCells: {
    style: {
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "14px",
      paddingLeft: "16px",
      paddingRight: "16px",
      color: "#7e7e7e",
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "8px",
      paddingBottom: "8px",
    },
  },
  rows: {
    style: {
      minHeight: "50px",
    },
  },
};
