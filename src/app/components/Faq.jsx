import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqComp = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className='max-w-[1440px] mx-auto min-h-[300px]'>
            <Typography align="center" gutterBottom className='text-3xl mt-6 mb-4 font-sofia font-semibold'>
                FAQ
            </Typography>
            <Box sx={{ width: '70%', marginLeft: '15%', marginBottom: '40px' }}>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                    className={`rounded-lg mb-4 ${expanded === 'panel1' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel1' ? 'text-white' : 'text-black'} font-nanum`}>
                            What is Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            Blockstarter is a blockchain-based crowdfunding platform where creators can launch campaigns to fund their projects. Backers can pledge support and receive rewards based on their contribution levels.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                    className={`rounded-lg mb-4 ${expanded === 'panel2' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel2' ? 'text-white' : 'text-black'} font-nanum`}>
                            How secure is Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            Blockstarter leverages blockchain technology for secure and transparent transactions. However, users should always verify the authenticity of campaigns and contracts before participating.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                    className={`rounded-lg mb-4 ${expanded === 'panel3' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel3' ? 'text-white' : 'text-black'} font-nanum`}>
                            How do I create a campaign on Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            To create a campaign on Blockstarter, you need to connect your wallet, fill in campaign details including the funding goal and duration, and submit the campaign for approval.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel4'}
                    onChange={handleChange('panel4')}
                    className={`rounded-lg mb-4 ${expanded === 'panel4' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel4' ? 'text-white' : 'text-black'} font-nanum`}>
                            How can I invest in a project on Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            You can invest in projects on Blockstarter by browsing active campaigns, selecting a project, and pledging ETH through MetaMask. Ensure you have testnet ETH for transactions.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel5'}
                    onChange={handleChange('panel5')}
                    className={`rounded-lg mb-4 ${expanded === 'panel5' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel5' ? 'text-white' : 'text-black'} font-nanum`}>
                            What is the role of MetaMask in using Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            MetaMask is used to connect your wallet to Blockstarter, manage testnet ETH, and authorize transactions. It ensures secure interaction with the blockchain.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel6'}
                    onChange={handleChange('panel6')}
                    className={`rounded-lg mb-4 ${expanded === 'panel6' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel6a-content"
                        id="panel6a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel6' ? 'text-white' : 'text-black'} font-nanum`}>
                            Can I cancel my pledge on Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            No, pledges cannot be canceled once submitted on Blockstarter. Ensure you review campaign details carefully before making a pledge.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel7'}
                    onChange={handleChange('panel7')}
                    className={`rounded-lg mb-4 ${expanded === 'panel7' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel7a-content"
                        id="panel7a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel7' ? 'text-white' : 'text-black'} font-nanum`}>
                            How are funds transferred to creators on Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            Funds pledged by backers are transferred to creators automatically upon successful completion of the campaign, ensuring transparency and accountability.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel8'}
                    onChange={handleChange('panel8')}
                    className={`rounded-lg mb-4 ${expanded === 'panel8' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel8a-content"
                        id="panel8a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel8' ? 'text-white' : 'text-black'} font-nanum`}>
                            What happens if a campaign exceeds its funding goal?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            If a campaign exceeds its funding goal, the creator receives the extra funds, which can be used to enhance the project or fulfill stretch goals as outlined in the campaign.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel10'}
                    onChange={handleChange('panel10')}
                    className={`rounded-lg mb-4 ${expanded === 'panel10' ? 'bg-[#f36128]' : 'bg-[#eefdfe]'}`}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel10a-content"
                        id="panel10a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className={`${expanded === 'panel10' ? 'text-white' : 'text-black'} font-nanum`}>
                            How can I contact Blockstarter support?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum  text-white'>
                            For support inquiries, you can reach out to Blockstarter via email or through the support portal on the website. Our team is available to assist with any questions or issues you may encounter.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </div>
    )
}

export default FaqComp;
