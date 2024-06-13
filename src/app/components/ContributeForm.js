import React, { useState } from "react";
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
        style: { color: 'black' }, // Style for the input text
    }}
    InputLabelProps={{
        style: { color: 'black' }, // Style for the label text
    }}
    style={{ marginBottom: '10px' }}
    sx={{
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'black', // Color when focused
            },
            '&:hover fieldset': {
                borderColor: 'black', // Color when hovered
            },
            borderColor: 'black', // Default border color
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
            width:"100%",
            border: "2px solid",
            borderColor: "#f36128",
            borderRadius: "30px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "#f36128",
              borderColor: "#f36128",
              backgroundColor: "transparent",
            },
            marginTop: "10px", // Adjusted from '1rem' for consistency
            
          }}
          type="submit" // Added to specify button type
          disabled={loading} // Added to disable the button when loading
        >
          {loading ? <CircularProgress size={24}  className='text-[#f36128]'/> : "INVEST"}{" "}
          {/* Conditional rendering for loading state */}
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
    </div>
  );
};

export default ContributeForm;
