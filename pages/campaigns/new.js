import React, { useState } from 'react';
import Layout from '../../src/app/components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router'; // Import useRouter hook

export default function CampaignNew() {
    const router = useRouter(); // Access router object using useRouter hook

    const [state, setState] = useState({
        minimumContribution: '',
        errorMessage: '',
        loading: false,
        title: '',
        description: ''
    });

    const onSubmit = async (event) => {
        setState({ ...state, loading: true, errorMessage: '' });
        event.preventDefault();
        try {
            await factory.methods.createCampaign(state.title, state.description, web3.utils.toWei(state.minimumContribution, 'ether')).send({
                from: ethereum.selectedAddress
            });
            router.push('/');
        } catch (err) {
            setState({ ...state, errorMessage: err.message });
        }
        setState({ ...state, loading: false });
    };

    return (
        <Layout>
            <h1>Create New Campaign</h1>
            <Form onSubmit={onSubmit} error={!!state.errorMessage} >
                <Form.Field>
                    <label>Title</label>
                    <Input
                        value={state.title}
                        onChange={event => setState({ ...state, title: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={state.description}
                        onChange={event => setState({ ...state, description: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label='ether'
                        labelPosition='right'
                        value={state.minimumContribution}
                        onChange={event => setState({ ...state, minimumContribution: event.target.value })}
                    />
                    <Message
                        error
                        header='Oops !'
                        content={state.errorMessage}
                    />
                    <Button loading={state.loading} primary style={{ marginTop: '10px' }}>Create</Button>
                </Form.Field>
            </Form>
        </Layout>
    );
}
