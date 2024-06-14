import React, { useEffect, useState } from 'react';
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableBody } from '@mui/material';
import Layout from '../../../../src/app/components/Layout';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../src/app/components/RequestRow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RequestNew from './new';

const NewRequestForm = ({ address, onCancel }) => {
  // Placeholder for the new request form component
  return (
    <div>
    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
     <Button variant="contained" onClick={onCancel} >
        Back
      </Button>
      </div>
     <RequestNew/>
    </div>
  );
};

export default function RequestIndex() {
  const router = useRouter();
  const address = router.query.campaignAddress;
  const [requests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [totalApproversCount, setTotalApproversCount] = useState(0);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false); // State to track form visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (address) {
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
    <>
      <div className="max-w-[800px] mx-auto px-4">
        {showNewRequestForm ? (
          <NewRequestForm address={address} onCancel={() => setShowNewRequestForm(false)} />
        ) : (
          <>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={() => setShowNewRequestForm(true)}>
                Add Request
              </Button>
            </div>
            <TableContainer component={Paper} style={{ overflowX: 'auto', maxWidth: '800px', margin: '50px auto' ,backgroundColor:'#eefdfe' ,borderRadius:'15px'}}>
              <Table stickyHeader>
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
                <TableBody>
                  {renderRow()}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body2" className="mt-4">
              Found {requestCount} Requests
            </Typography>
          </>
        )}
      </div>
    </>
  );
}
