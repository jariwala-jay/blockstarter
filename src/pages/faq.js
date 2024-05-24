import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from '../app/components/Layout';

export default function App() {
  return (
    <Layout>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          FAQ Page
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontSize: 15, fontWeight: 'regular' }}>
                What is BitStart?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Kickstarter is a launchpad for creators to raise funds for the initial production of their inventions. Backers (that's you!) can support the creator by pledging and receiving in exchange a reward.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ fontSize: 15, fontWeight: 'regular' }}>
                What does it mean to back a project?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                When you back a project, you’re funding the production of the product. That means you'll get your choice of bag once it's produced (based on the pledge level you selected during the campaign). Besides getting the product itself, you're also joining a community. Follow along the production process, take part in important surveys and give the creator valuable feedback to make the product even better.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Add more Accordion items as needed */}
        </Box>
      </Container>
    </Layout>
  );
}
