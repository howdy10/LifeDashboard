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

const columns = [
  { title: "Story told", field: "insurance", type: "boolean" },
  { title: "Category", field: "category" },
  { title: "Title", field: "title" },
];

const row = (answer) => {
  const [isInfoRowOpened, setIsInfoRowOpened] = useState(false);
  return (
    <>
      <TableRow hover>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell onClick={() => setIsInfoRowOpened(!isInfoRowOpened)}>
          {answer.category}
        </TableCell>
        <TableCell onClick={() => setIsInfoRowOpened(!isInfoRowOpened)}>{answer.title}</TableCell>

        {
          <TableCell onClick={() => setIsInfoRowOpened(!isInfoRowOpened)}>
            <IconButton aria-label="expand row" size="small">
              {isInfoRowOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        }
      </TableRow>
      {
        <TableRow>
          <TableCell colSpan={columns.length + 1}>
            <Collapse in={isInfoRowOpened} timeout="auto" unmountOnExit>
              {answer.story.map((x) => (
                <Typography variant="body1" display="block" gutterBottom mb={3}>
                  {x}
                </Typography>
              ))}
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </>
  );
};

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
            {answers.map((x) => row(x))}
            {/* {data &&
              localData &&
              dataListIdOrder.map((firebaseId, indexRow) => row(firebaseId, indexRow))}
            { (
              <TableRow
                style={{
                  height: 55 ,
                }}
              >
                <TableCell colSpan={columns.length} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
