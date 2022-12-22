import { Button, Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputMoney } from "../forms/money-input";
import { Income } from "../../pages/taxEstimator";

const defaultValues = {
  hsa: 0,
  healthcare: 0,
  dental: 0,
  vision: 0,
  preTax401: 0,
};
export const IncomeForm = ({ setIncome }) => {
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;

  const onSubmit = (data) => {
    let format: Income = {
      income: parseFloat(data.income) * 100,
      fedWithheld: parseFloat(data.fedWithheld) * 100,
      preTaxDeductions:
        parseFloat(data.hsa) * 100 +
        parseFloat(data.healthcare) * 100 +
        parseFloat(data.dental) * 100 +
        parseFloat(data.vision) * 100 +
        parseFloat(data.preTax401) * 100,
    };
    setIncome(format);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h4">
              Income
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid sx={{ mt: 1 }} container spacing={2}>
          <Grid item xs={6}>
            <FormInputMoney
              rules={{ required: true }}
              fullWidth
              name="income"
              control={control}
              label="Gross Income"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputMoney
              rules={{ required: true }}
              fullWidth
              name="fedWithheld"
              control={control}
              label="Federal Withholdings"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography color="textPrimary" gutterBottom>
              Pre Tax Deductions
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <FormInputMoney fullWidth name="hsa" control={control} label="HSA" rules={{}} />
          </Grid>
          <Grid item xs={6}>
            <FormInputMoney
              fullWidth
              name="healthcare"
              control={control}
              label="Health Care"
              rules={{}}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInputMoney fullWidth name="dental" control={control} label="Dental" rules={{}} />
          </Grid>
          <Grid item xs={6}>
            <FormInputMoney fullWidth name="vision" control={control} label="Vision" rules={{}} />
          </Grid>
          <Grid item xs={6}>
            <FormInputMoney fullWidth name="preTax401" control={control} label="401k" rules={{}} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
