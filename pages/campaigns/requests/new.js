import React, { useState } from "react";
import Layout from "../../../src/app/components/Layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { useRouter } from "next/router"; // Import useRouter hook

export default function RequestNew(props) {
  const router = useRouter(); // Access router object using useRouter hook

  const [state, setState] = useState({
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);
    const { description, value, recipient } = state;
    setState({ ...state, loading: true, errorMessage: "" });
    try {
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: ethereum.selectedAddress,
        });
      router.push(`/campaigns/${props.address}/requests`);
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
    setState({ ...state, loading: false });
  };

  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!state.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={state.description}
            onChange={(event) =>
              setState({ ...state, description: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Amount In Ether</label>
          <Input
            value={state.value}
            onChange={(event) =>
              setState({ ...state, value: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient Address</label>
          <Input
            value={state.recipient}
            onChange={(event) =>
              setState({ ...state, recipient: event.target.value })
            }
          />
        </Form.Field>
        <Message error header="Oops!" content={state.errorMessage} />
        <Button loading={state.loading} primary>
          Create Request
        </Button>
        <Button primary onClick={() => router.push(`/campaigns/${props.address}/requests`)}>
          Back
        </Button>
      </Form>
    </Layout>
  );
}

RequestNew.getInitialProps = async (props) => {
  let { address } = props.query;
  return { address };
};
