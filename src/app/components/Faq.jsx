import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqComp = () => {
    return (
        <div className='max-w-[1440px] mx-auto min-h-[300px]'>
            <Typography align="center" gutterBottom className='text-3xl mt-6 mb-4 font-sofia font-semibold'>
                FAQ
            </Typography>
            <Box sx={{ width: '70%', marginLeft: '15%', marginBottom: '40px' }}>
                <Accordion className='bg-[#eefdfe]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className='font-nanum'>
                            What is Blockstarter?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum'>
                            Blockstarter is a launchpad for creators to raise funds for the initial production of their inventions. Backers (that's you!) can support the creator by pledging and receiving in exchange a reward.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='bg-[#eefdfe]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className='font-nanum'>
                            What does it mean to back a project?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum'>
                            When you back a project, you’re funding the production of the product. That means you'll get your choice of bag once it's produced (based on the pledge level you selected during the campaign). Besides getting the product itself, you're also joining a community. Follow along the production process, take part in important surveys and give the creator valuable feedback to make the product even better.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='bg-[#eefdfe]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className='font-nanum'>
                            How does Blockstarter work?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum'>
                            Creators set up a campaign on Blockstarter with a funding goal and a timeline. Backers can then pledge money to support the project. If the project meets its funding goal within the timeline, the creator receives the funds to bring the project to life.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='bg-[#eefdfe]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className='font-nanum'>
                            Is my pledge amount publicly displayed?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum'>
                            No, your pledge amount is not publicly displayed. Only you and the project creator will know how much you have pledged.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='bg-[#eefdfe]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className='font-nanum'>
                            What happens if a project doesn't reach its funding goal?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum'>
                            If a project doesn’t reach its funding goal, no money is collected from backers. You will not be charged, and the project will not receive any funds.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
              
                <Accordion className='bg-[#eefdfe]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel8a-content"
                        id="panel8a-header"
                    >
                        <Typography sx={{ fontSize: 15, fontWeight: 'regular' }} className='font-nanum'>
                            How do I receive my reward?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='font-nanum'>
                            Once the project is successfully funded and completed, the creator will ship the reward to the address you provided during the pledge process.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </div>
    )
}

export default FaqComp;
