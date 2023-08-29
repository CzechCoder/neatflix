import { Dispatch, FC, SetStateAction } from "react";
import { SUBSCRIPTION_TIERS } from "../../data/subscription-tiers";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./index.module.css";

interface ChangePlanDialogProps {
  handleClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setSubscription: (data: string) => void;
}

export const ChangePlanDialog: FC<ChangePlanDialogProps> = ({
  handleClose,
  open,
  setSubscription,
}) => (
  <Dialog
    onClose={() => handleClose(false)}
    open={open}
    maxWidth="lg"
    fullWidth
  >
    <Container component="main" sx={{ textAlign: "end", mt: "10px" }}>
      <CloseIcon
        onClick={() => handleClose(false)}
        style={{ cursor: "pointer" }}
      />
      <Grid
        container
        spacing={5}
        alignItems="flex-end"
        sx={{ padding: { sm: "50px 30px", xs: "16px 0 16px" } }}
      >
        {SUBSCRIPTION_TIERS.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[200],
                }}
              />
              <CardContent>
                <Box className={styles.textContainer}>
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    / mo
                  </Typography>
                </Box>
                <ul className={styles.pricingList}>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setSubscription(tier.title);
                    handleClose(false);
                  }}
                >
                  Select plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Dialog>
);
