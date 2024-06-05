import React, { useEffect, useState } from 'react';
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../../../../src/app/components/Layout';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../src/app/components/RequestRow';
import Link from 'next/link'; // Import Link from Next.js
import { useRouter } from 'next/router'; // Import useRouter hook from Next.js

export default function RequestIndex() {
    const router =useRouter()
    const address = router.query.campaignAddress;
    const [requests, setRequests] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [totalApproversCount, setTotalApproversCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (address) { // Check if address is defined
                    const campaign = Campaign(address);
                    const reqCount = parseInt(await campaign.methods.getRequestCount().call());
                    const totalApp = parseInt(await campaign.methods.approversCount().call());
                    setRequestCount(reqCount);
                    setTotalApproversCount(totalApp);

                    const requestList = await Promise.all(
                        Array(parseInt(reqCount)).fill().map((_, index) => campaign.methods.requests(index).call())
                    );
    
                    setRequests(requestList);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        if (address) { // Check if address is defined
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
            <div className="max-w-[1440px] mx-auto px-[4rem]">
            <h1 className="text-3xl mt-6 mb-6 font-sofia font-semibold text-center">Requests</h1>
            <div style={{ marginBottom: '10px' }}>
                <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    <Link href={`/campaigns/${address}`}>
                        Back
                    </Link>
                </Button>
                <Button variant="contained" color="primary">
                    <Link href={`/campaigns/${address}/requests/new`}>
                        Add Request
                    </Link>
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Recipient</TableCell>
                            <TableCell>Approval Count</TableCell>
                            <TableCell>Approve</TableCell>
                            <TableCell>Finalize</TableCell>
                        </TableRow>
                    </TableHead>
                    <tbody>
                        {renderRow()}
                    </tbody>
                </Table>
            </TableContainer>
            <div>Found {requestCount} Requests</div>
            </div>
        </Layout>
    );
}
