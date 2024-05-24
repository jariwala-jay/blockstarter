import React, { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { useRouter } from 'next/router';

const RequestRow = ({ id, request, TotalApprovers, address }) => {
  const [Aloading, setAloading] = useState(false);
  const [Floading, setFloading] = useState(false);
  const router = useRouter();

  const onApprove = async () => {
    setAloading(true);
    const campaign = Campaign(address);
    try {
      await campaign.methods.approveRequest(id).send({
        from: ethereum.selectedAddress,
      });
      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      console.error(err);
    }
    setAloading(false);
  };

  const onFinalize = async () => {
    setFloading(true);
    const campaign = Campaign(address);
    try {
      await campaign.methods.finalizeRequest(id).send({
        from: ethereum.selectedAddress,
      });
      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      console.error(err);
    }
    setFloading(false);
  };

  const readyToFinalize = request.approvalCount > TotalApprovers / 2;

  return (
    <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Table.Cell>{id + 1}</Table.Cell>
      <Table.Cell>{request.description}</Table.Cell>
      <Table.Cell>{web3.utils.fromWei(request.value, "ether")}</Table.Cell>
      <Table.Cell>{request.recipient}</Table.Cell>
      <Table.Cell>
        {request.approvalCount}/{TotalApprovers}
      </Table.Cell>
      <Table.Cell>
        {request.complete ? 'Approved' : (
          <Button loading={Aloading} color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>
        {request.complete ? 'Finalized' : (
          <Button color="teal" loading={Floading} basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default RequestRow;
