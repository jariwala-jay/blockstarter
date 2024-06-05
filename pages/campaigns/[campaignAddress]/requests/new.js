import React, { useState } from "react";
import Layout from "../../../../src/app/components/Layout";
import { Button, TextField, Typography, Grid, CircularProgress } from "@mui/material";
import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";
import { useRouter } from "next/router";

export default function RequestNew(props) {
  const router =useRouter()
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
      const accounts = await web3.eth.getAccounts(); // Get available accounts
      const senderAddress = accounts[0]; // Assuming the first account is the sender
  
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: senderAddress // Use sender's address obtained from getAccounts
        });
      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
    setState({ ...state, loading: false });
  };
  

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold text-center">
          Create a Request
        </h1>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} className="mx-auto w-[50%]">
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
                  style: { color: "#ffffff" },
                }}
                InputLabelProps={{
                  style: { color: "#ffffff" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#f36128",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f36128",
                    },
                    borderColor: "#f36128",
                  },
                }}
                className="text-[#eefdfe] w-[90%]"
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
                  style: { color: "#ffffff" },
                }}
                InputLabelProps={{
                  style: { color: "#ffffff" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#f36128",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f36128",
                    },
                    borderColor: "#f36128",
                  },
                }}
                className="text-[#eefdfe] w-[90%]"
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
                  style: { color: "#ffffff", borderColor: "#f36128" }, // Border color added here
                }}
                InputLabelProps={{
                  style: { color: "#ffffff" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#f36128",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f36128",
                    },
                  },
                }}
                className="text-[#eefdfe] w-[90%]"
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
          <Button
            className="mx-[43%]"
            type="submit"
            variant="contained"
            color="primary"
            disabled={state.loading}
            sx={{
              fontFamily: "nanum",
              backgroundColor: "#f36128",
              color: "#ffffff",
              padding: "20px",
              width: "190px",
              border: "2px solid",
              borderColor: "#f36128",
              borderRadius: "30px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: "#f36128",
                borderColor: "#f36128",
                backgroundColor: "transparent",
              },
              marginTop: "10px",
              marginLeft: "30%",
            }}
          >
            {state.loading ? (
              <CircularProgress size={24} className="text-[#f36128]" />
            ) : (
              "Create Request"
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
}

RequestNew.getInitialProps = async (props) => {
  let { address } = props.query;
  return { address };
};
