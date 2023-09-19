import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { answers } from "../../__mocks__/interview";
import { useState } from "react";
import { BehavioralAnswersRow } from "./bahavioralAnswerRow";

const columns = [
  { title: "Story told", field: "insurance", type: "boolean" },
  { title: "Category", field: "category" },
  { title: "Title", field: "title" },
];

export const BehavioralAnswers = () => {
  return (
    <Card>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: 2,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Interview answers
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table data-testid="full-table">
          <TableHead>
            <TableRow>
              {columns.map((item, index) => {
                let text: any = item.title;

                if (item.type === "boolean") {
                  text = <Box sx={{ textAlign: "center" }}>{text}</Box>;
                }
                return (
                  <TableCell data-testid={"column-" + index} key={index}>
                    {text}
                  </TableCell>
                );
              })}
              <TableCell data-testid={"column-collapse"} />
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((x) => (
              <BehavioralAnswersRow answer={x} columns={columns} key={0} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
