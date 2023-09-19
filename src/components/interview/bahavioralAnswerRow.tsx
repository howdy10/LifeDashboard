import { TableCell, TableRow, Typography, IconButton, Collapse, Checkbox } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

interface BehavioralAnswersRowInput {
  answer: any;
  columns: any;
}

export const BehavioralAnswersRow = ({ answer, columns, ...rest }: BehavioralAnswersRowInput) => {
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
                <Typography variant="body1" display="block" gutterBottom mb={3} key={0}>
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
