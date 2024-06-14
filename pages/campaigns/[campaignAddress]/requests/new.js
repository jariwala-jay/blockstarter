import React, { useState } from "react";
import { Button, TextField, Typography, Grid, CircularProgress, Paper } from "@mui/material";
import { useRouter } from "next/router";
import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";

export default function RequestNew(props) {
  const router = useRouter();
  const address = router.query.campaignAddress;

  const [state, setState] = useState({
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);
    const { description, value, recipient } = state;
    setState({ ...state, loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: senderAddress,
        });
      router.push(`/campaigns/${address}/`);
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
    setState({ ...state, loading: false });
  };

  return (
    <>
      <div className="max-w-[800px] mx-auto mt-6 py-6">
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            backgroundColor: "#eefdfe",
            borderRadius: "15px",

          }}
        >
          <Typography variant="h5" className="text-center mb-4 font-semibold">
            Create a Request
          </Typography>

          <form onSubmit={onSubmit}>
            <Grid container spacing={2} className="mx-auto w-[90%]">
              <Grid item xs={12}>
                <TextField
                  required
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={state.description}
                  onChange={(event) =>
                    setState({ ...state, description: event.target.value })
                  }
                  InputProps={{
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="number"
                  label="Amount In Ether"
                  variant="outlined"
                  fullWidth
                  value={state.value}
                  onChange={(event) =>
                    setState({ ...state, value: event.target.value })
                  }
                  InputProps={{
                    endAdornment: "Ether",
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Recipient Address"
                  variant="outlined"
                  fullWidth
                  value={state.recipient}
                  onChange={(event) =>
                    setState({ ...state, recipient: event.target.value })
                  }
                  InputProps={{
                    style: { color: "#000000", borderColor: "#f36128" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                    },
                  }}
                  className="text-[#000000]"
                />
              </Grid>
            </Grid>
            {state.errorMessage && (
              <Typography
                variant="body2"
                color="error"
                gutterBottom
                className="text-center mt-[8px]"
              >
                {state.errorMessage}
              </Typography>
            )}
            <div className="text-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={state.loading}
                sx={{
                  fontFamily: "nanum",
                  backgroundColor: "#f36128",
                  color: "#ffffff",
                  padding: "10px 20px",
                  width: "200px",
                  border: "2px solid",
                  borderColor: "#f36128",
                  borderRadius: "30px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: "#f36128",
                    borderColor: "#f36128",
                    backgroundColor: "transparent",
                  },
                  marginTop: "20px",
                }}
              >
                {state.loading ? (
                  <CircularProgress size={24} className="text-[#f36128]" />
                ) : (
                  "Create Request"
                )}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
}
