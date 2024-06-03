import React, { useEffect, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Layout from '../../../src/app/components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../src/app/components/RequestRow';
import Link from 'next/link'; // Import Link from Next.js
import { useRouter } from 'next/router'; // Import useRouter hook from Next.js

export default function RequestIndex() {
    const router = useRouter();
    const { address } = router.query;
    const [requests, setRequests] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [totalApproversCount, setTotalApproversCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const campaign = Campaign(address);
                const reqCount = await campaign.methods.getRequestCount().call();
                const totalApp = await campaign.methods.approversCount().call();

                setRequestCount(reqCount);
                setTotalApproversCount(totalApp);

                const requestList = await Promise.all(
                    Array(parseInt(reqCount)).fill().map((_, index) => campaign.methods.requests(index).call())
                );

                setRequests(requestList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (address) {
            fetchData();
        }
    }, [address]);

    const renderRow = () => {
        return requests.map((request, index) => (
            <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                totalApproversCount={totalApproversCount}
            />
        ));
    };

    return (
        <Layout>
            <h1>Requests</h1>
            <Button primary floated='right' style={{ marginBottom: '10px' }}>
                <Link href={`/campaigns/${address}`}>
                    Back
                </Link>
            </Button>
            <Button primary floated='right' style={{ marginBottom: '10px' }}>
                <Link href={`/campaigns/${address}/requests/new`}>
                    Add Request
                </Link>
            </Button>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Approval Count</Table.HeaderCell>
                        <Table.HeaderCell>Approve</Table.HeaderCell>
                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderRow()}
                </Table.Body>
            </Table>
            <div>Found {requestCount} Requests</div>
        </Layout>
    );
}
