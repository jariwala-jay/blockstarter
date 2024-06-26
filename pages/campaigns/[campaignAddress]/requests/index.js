import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Layout from '../../../../src/app/components/Layout';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../src/app/components/RequestRow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RequestNew from './new';

const NewRequestForm = ({ address, onCancel }) => (
  <div>
    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" onClick={onCancel}>
        Back
      </Button>
    </div>
    <RequestNew />
  </div>
);

export default function RequestIndex() {
  
  const router = useRouter();
  const address = router.query.campaignAddress;
  const [requests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [totalApproversCount, setTotalApproversCount] = useState(0);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [account, setAccount] = useState(null);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (address) {
          const campaign = Campaign(address);
          const OtherDetails = await campaign.methods.getOtherDetails().call();
          const reqCount = parseInt(OtherDetails[1]);
          const totalApp = parseInt(OtherDetails[2]);
          const FundingDetails = await campaign.methods.fundingDetails().call();
          const managerAddress = FundingDetails.manager.toString().toLowerCase();
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accountAddress = accounts[0].toLowerCase();
          setManager(managerAddress);
          setAccount(accountAddress);
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
        manager={manager} 
      />
    ));
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto px-4">
        {account && manager && account === manager ? (
          <>
            {showNewRequestForm ? (
              <NewRequestForm address={address} onCancel={() => setShowNewRequestForm(false)} />
            ) : (
              <>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary" onClick={() => setShowNewRequestForm(true)}>
                    Add Request
                  </Button>
                </div>
                <div className="mt-12">
                  {renderRow()}
                </div>
                <Typography variant="body2" className="mt-2">
                  Found {requestCount} Requests
                </Typography>
              </>
            )}
          </>
        ) : (
          <>
                <div className="mt-12">
                  {renderRow()}
                </div>
                <Typography variant="body2" className="mt-2">
                  Found {requestCount} Requests
                </Typography>
          </>
        )}
      </div>
    </>
  );
}
