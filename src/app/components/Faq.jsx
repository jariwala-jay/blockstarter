import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqComp = () => {
    return (
        <div className='max-w-[1440px] mx-auto min-h-[300px]'>
            <Typography align="center" gutterBottom className='text-3xl mt-6 mb-4 font-sofia font-semibold'>
          FAQ
        </Typography>
        <Box sx={{ width: '70%' , marginLeft:'15%',marginBottom:'40px'}}>
          <Accordion className='bg-[#eefdfe]'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontSize: 15, fontWeight: 'regular'}} className='font-nanum'>
                What is Blockstarter?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='font-nanum'>
                Blockstarter is a launchpad for creators to raise funds for the initial production of their inventions. Backers (that's you!) can support the creator by pledging and receiving in exchange a reward.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion  className='bg-[#eefdfe]'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ fontSize: 15, fontWeight: 'regular' }}  className='font-nanum'>
                What does it mean to back a project?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography  className='font-nanum'>
                When you back a project, you’re funding the production of the product. That means you'll get your choice of bag once it's produced (based on the pledge level you selected during the campaign). Besides getting the product itself, you're also joining a community. Follow along the production process, take part in important surveys and give the creator valuable feedback to make the product even better.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Add more Accordion items as needed */}
        </Box>
        </div>
    )
}

export default FaqComp
