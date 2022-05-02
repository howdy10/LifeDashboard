import { Button, Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FormInputMoney } from "src/components/forms/money-input";

const defaultValues = {
  hsa: 0,
  healthcare: 0,
  dental: 0,
  vision: 0,
  preTax401: 0,
};

const fields = [
  { label: "401k - Esaul", name: "we", category: "retirement" },
  { label: "401k - Talene", name: "wt", category: "retirement" },
  { label: "IRA - Esaul", name: "ira", category: "retirement" },
  { label: "Roth IRA - Esaul", name: "roth", category: "retirement" },
];

export const NetWorthForm = ({ setNetworth }) => {
  const methods = useForm();
  const { handleSubmit, reset, control, setValue } = methods;

  const onSubmit = (data) => {
    const sum = 0;

    console.log(data);
    //   let format = {
    //     income: parseFloat(data.income) * 100,
    //     fedWithheld: parseFloat(data.fedWithheld) * 100,
    //     preTaxDeductions:
    //       parseFloat(data.hsa) * 100 +
    //       parseFloat(data.healthcare) * 100 +
    //       parseFloat(data.dental) * 100 +
    //       parseFloat(data.vision) * 100 +
    //       parseFloat(data.preTax401) * 100,
    //   };
    //   setIncome(format);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h4">
              Assets
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid sx={{ mt: 1 }} container spacing={2}>
          {fields.map((f, index) => (
            <Grid item xs={6} key={index}>
              <FormInputMoney fullWidth name={f.name} control={control} label={f.label} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Divider />
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
