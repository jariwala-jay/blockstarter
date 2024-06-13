import React, { useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
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
      router.push(`/campaigns/${address}/`);
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
      router.push(`/campaigns/${address}/`);
    } catch (err) {
      console.error(err);
    }
    setFLoading(false);
  };

  const readyToFinalize = request.approvalCount > totalApproversCount / 2;

  return (
    <TableRow
      disabled={request.complete}
      sx={{
        backgroundColor: request.complete
          ? "#eefdfe"
          : readyToFinalize && !request.complete
          ? "#dff0d8"
          : "inherit",
      }}
    >
       <TableCell>{id + 1}</TableCell>
      <TableCell style={{ maxWidth: "300px", overflowWrap: "break-word" }}>
        {request.description}
      </TableCell>
      <TableCell>{web3.utils.fromWei(request.value, "ether")}</TableCell>
      <TableCell style={{ maxWidth: "200px", overflowWrap: "break-word" }}>
        {request.recipient}
      </TableCell>
      <TableCell>{`${request.approvalCount}/${totalApproversCount}`}</TableCell>
      <TableCell>
        {request.complete ? (
          "Approved"
        ) : (
          <Button
            disabled={aLoading} // Disable the button when loading
            color="success"
            variant="contained"
            size="small" // Adjust button size
            onClick={onApprove}
          >
            Approve
          </Button>
        )}
      </TableCell>
      <TableCell>
        {request.complete ? (
          "Finalized"
        ) : (
          <Button
            disabled={fLoading} // Disable the button when loading
            color="primary"
            variant="contained"
            size="small" // Adjust button size
            onClick={onFinalize}
          >
            Finalize
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RequestRow;
