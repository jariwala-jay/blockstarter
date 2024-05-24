import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

const ContributeForm = ({ address }) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrMessage('');
        setSuccessMessage('');

        const campaign = Campaign(address);

        try {
            await campaign.methods.contribute().send({
                from: ethereum.selectedAddress,
                value: web3.utils.toWei(value, 'ether'),
            });

            setSuccessMessage('Contribution successful!');
        } catch (err) {
            setErrMessage(err.message);
        }

        setLoading(false);
        setValue('');
    };

    return (
        <>
            <Form onSubmit={onSubmit} error={!!errMessage} success={!!successMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        label="Ether"
                        labelPosition="right"
                    />
                    <Message error header="Oops !" content={errMessage} />
                    <Message success header="Success!" content={successMessage} />
                    <Button loading={loading} primary style={{ marginTop: '10px' }}>
                        Contribute
                    </Button>
                </Form.Field>
            </Form>
        </>
    );
};

export default ContributeForm;
