import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const fetchCampaignStatus = async () => {
      const campaign = Campaign(address);
      const otherDetails = await campaign.methods.getOtherDetails().call();
      setIsClosed(otherDetails[3]); 
    };

    fetchCampaignStatus();
  }, [address]);

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrMessage("");
    setSuccessMessage("");

    const campaign = Campaign(address);

    try {
      await campaign.methods.contribute().send({
        from: ethereum.selectedAddress,
        value: web3.utils.toWei(value, "ether"),
      });

      setSuccessMessage("Contribution successful!");
      setOpenSnackbar(true);
    } catch (err) {
      setErrMessage(err.message);
    }

    setLoading(false);
    setValue("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='text-center'>
      <form onSubmit={onSubmit}>
        <TextField
          label="Investment Amount"
          variant="outlined"
          value={value}
          required
          onChange={(event) => setValue(event.target.value)}
          InputProps={{
            endAdornment: 'Ether',
            style: { color: 'black' },
          }}
          InputLabelProps={{
            style: { color: 'black' },
          }}
          style={{ marginBottom: '10px' }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              borderColor: 'black',
            },
          }}
          className='text-[#eefdfe] w-[100%]'
        />

        <Button
          variant="contained"
          sx={{
            fontFamily: "nanum",
            backgroundColor: "#f36128",
            color: "#ffffff",
            padding: "15px",
            width: "100%",
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
          }}
          type="submit"
          disabled={loading || isClosed}
        >
          {loading ? <CircularProgress size={24} className='text-[#f36128]' /> : "INVEST"}
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </MuiAlert>
        </Snackbar>
      </form>
      {errMessage && (
        <Typography variant="body2" color="error" gutterBottom className='text-center mt-[8px]'>
          {errMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography variant="body2" color="success" gutterBottom className='text-center mt-[8px]'>
          {successMessage}
        </Typography>
      )}
      {isClosed && (
        <Typography variant="body2" color="error" gutterBottom className='text-center mt-[8px]'>
          This campaign is closed for contributions.
        </Typography>
      )}
    </div>
  );
};

export default ContributeForm;
