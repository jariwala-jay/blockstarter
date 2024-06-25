import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";

const RequestRow = ({ id, request, totalApproversCount, address, manager }) => {
  const [aLoading, setALoading] = useState(false);
  const [fLoading, setFLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [hasApproved, setHasApproved] = useState(false);

  useEffect(() => {
    const fetchAccountAndApprovalStatus = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0].toLowerCase());

      const campaign = Campaign(address);
      const approvalStatus = await campaign.methods.hasApproved(id).call({ from: accounts[0] });
      setHasApproved(approvalStatus);
    };

    fetchAccountAndApprovalStatus();
  }, [id, address]);

  const onApprove = async () => {
    setALoading(true);
    const campaign = Campaign(address);
    try {
      await campaign.methods.approveRequest(id).send({
        from: account,
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
        from: account,
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
        className='rounded-[15px] w-full'
        sx={{
          backgroundColor: request.complete ? "#808080" : "#eefdfe",
          marginBottom: "20px",
        }}
      >
        <CardContent className='sm:pl-[10%]'>
          <Typography variant="caption">Request {id + 1}</Typography>
          <Typography className='text-[0.65rem] sm:text-[1rem] font-nanum' gutterBottom>
            Description: &nbsp;
            <span className='font-semibold'>{request.description}</span>
          </Typography>
          <Typography gutterBottom className='text-[0.65rem] sm:text-[1rem] font-nanum'>
            Amount: &nbsp;
            <span className='font-semibold'>{web3.utils.fromWei(request.value, "ether")} Ether</span>
          </Typography>
          <Typography gutterBottom className='text-[0.65rem] sm:text-[1rem] font-nanum'>
            Recipient: <span className='font-semibold'>{request.recipient}</span>
          </Typography>
          <Typography gutterBottom className='text-[0.65rem] sm:text-[1rem] font-nanum'>
            Approval Count: &nbsp;
            <span className='font-semibold'>{`${request.approvalCount}/${totalApproversCount}`}</span>
          </Typography>
        </CardContent>
        <CardActions className='justify-center gap-[4rem]'>
          {request.complete ? (
            <>
              <Button
                disabled
                color="success"
                variant="contained"
                size="small"
              >
                Approved
              </Button>
              <Button
                disabled
                color="error"
                variant="contained"
                size="small"
              >
                Finalized
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={aLoading || hasApproved}
                color="success"
                variant="contained"
                size="small"
                onClick={onApprove}
              >
                {hasApproved ? 'Approved' : 'Approve'}
              </Button>
              {account === manager && (
                <Button
                  disabled={fLoading || !readyToFinalize}
                  color="error"
                  variant="contained"
                  size="small"
                  onClick={onFinalize}
                >
                  Finalize
                </Button>
              )}
            </>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default RequestRow;
