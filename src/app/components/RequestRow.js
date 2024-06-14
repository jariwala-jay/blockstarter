import React, { useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Grid } from "@mui/material";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { useRouter } from "next/router";

const RequestRow = ({ id, request, totalApproversCount, address }) => {
  const [aLoading, setALoading] = useState(false);
  const [fLoading, setFLoading] = useState(false);
  const router = useRouter();

  const onApprove = async () => {
    setALoading(true);
    const campaign = Campaign(address);
    try {
      await campaign.methods.approveRequest(id).send({
        from: ethereum.selectedAddress,
      });
      
    } catch (err) {
      console.error(err);
    }
    setALoading(false);
  };

  const onFinalize = async () => {
    setFLoading(true);
    const campaign = Campaign(address);
    try {
      await campaign.methods.finalizeRequest(id).send({
        from: ethereum.selectedAddress,
      });
      
    } catch (err) {
      console.error(err);
    }
    setFLoading(false);
  };

  const readyToFinalize = request.approvalCount > totalApproversCount / 2;

  return (
    <div className='flex flex-col'>
      <Card
        className=' rounded-[15px] w-full'
        sx={{
          backgroundColor: request.complete
            ? "#808080" : "#eefdfe"
            ,
          marginBottom: "20px",
          
        }}
      >
        <CardContent className='sm:pl-[10%]'>
          <Typography variant="caption">Request {id + 1}</Typography>
          <Typography className='text-[0.65rem] sm:text-[1rem] font-nanum' gutterBottom>Description: &nbsp;
          <span className='font-semibold'>
          {request.description}
          </span>
          </Typography>
          <Typography  gutterBottom className='text-[0.65rem] sm:text-[1rem] font-nanum'>Amount:  &nbsp;
           <span className='font-semibold'>
           {web3.utils.fromWei(request.value, "ether")} Ether
           </span>
           </Typography>
          <Typography  gutterBottom className='text-[0.65rem] sm:text-[1rem] font-nanum'>Recipient: 
          <span className='font-semibold'>
          {request.recipient}
          </span>
          </Typography>
          <Typography  gutterBottom className='text-[0.65rem] sm:text-[1rem] font-nanum'>Approval Count:  &nbsp;
          <span className='font-semibold'>
          {`${request.approvalCount}/${totalApproversCount}`}
          </span>
          </Typography>
        </CardContent>
        <CardActions className='justify-center gap-[4rem]'>
          {request.complete ? (
            <Button
              disabled
              color="success"
              variant="contained"
              size="small"
              onClick={onApprove}
            >
              Approved
            </Button>
          ) : (
            <Button
              disabled={aLoading}
              color="success"
              variant="contained"
              size="small"
              onClick={onApprove}
            >
              Approve
            </Button>
          )}
          {readyToFinalize ? ( 
            request.complete ? (
            <Button
              disabled
              color="error"
              variant="contained"
              size="small"
              onClick={onFinalize}
            >
              Finalized
            </Button>
            ) : 
            <Button
              disabled={fLoading}
              color="error"
              variant="contained"
              size="small"
              onClick={onFinalize}
            >
              Finalize
            </Button>

          ) : (
            <Button
              disabled
              color="error"
              variant="contained"
              size="small"
              onClick={onFinalize}
            >
              Finalize
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default RequestRow;
