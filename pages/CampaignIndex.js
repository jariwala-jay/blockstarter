"use client"

import React from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react'; // Import Semantic UI React components
import Layout from '../src/app/components/Layout';
import Link from 'next/link'; // Import Link from Next.js
import Campaign from '../ethereum/campaign';
import '@fortawesome/fontawesome-free/css/all.min.css';

class CampaignIndex extends React.Component {
    static async getInitialProps(props) {
        const campaignAddresses = await factory.methods.getDeployedCampaign().call();
        const campaignDetails = await Promise.all(
            campaignAddresses.map(async (address) => {
                const title = await Campaign(address).methods.CampaignTitle().call();
                const description = await Campaign(address).methods.CampaignDescription().call();
                return { address, title, description };
            })
        );
        return { campaignAddresses, campaignDetails };
    }

    renderCampaigns() {
        return this.props.campaignDetails.map((campaignDetail, index) => {
            return {
                header: campaignDetail.title,
                meta: 'Description',
                description: campaignDetail.description,
                extra: (
                    <Link href={`/campaigns/${campaignDetail.address}`} key={index}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true,
                style: { backgroundColor: '#eefdfe', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' ,color:'black'},
                key: index,
            };
        });
    }

    render() {
        return (
            <Layout>
                <h1 style={{ paddingBottom: '10px' }}>Open Campaign</h1>
                <Link href="/campaigns/new">
                    <Button
                        style={{
                            backgroundColor: '#4056a1',
                            color: 'white',
                            marginLeft: '30px',
                            fontSize: '17px',
                        }}
                        content="Create Campaign"
                        icon="add"
                        primary
                        floated="right"
                    />
                </Link>
                <div>
                    <Card.Group items={this.renderCampaigns()} />
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;