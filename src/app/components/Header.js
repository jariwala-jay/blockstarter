import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Link from 'next/link';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000', boxShadow: 'unset' }}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            backgroundColor: '#eefdfe',
            marginRight: '90px',
            color: '#000000', // Set text color explicitly
            paddingY: '42px',
            marginLeft: '-25px',
            paddingLeft: '65px',
          }} 
        >
          <Link href="/" passHref>
            Blockstarter
          </Link>
        </Typography>

        <Button color="inherit" component={Link} href="/campaigns" sx={{ marginX: '20px' }} className='font-nanum'>
          Projects
        </Button>
        <Button color="inherit" component={Link} href="/faq" sx={{ marginX: '20px' }} className='font-nanum'>
          FAQ
        </Button>
        <Button color="inherit" component={Link} href="/community" sx={{ marginX: '20px' }} className='font-nanum'>
          Community
        </Button>
        <Button color="inherit" component={Link} href="/updates" sx={{ marginX: '20px', marginRight: '300px' }} className='font-nanum'>
          Updates
        </Button>
        <Button
          startIcon={<AccountBalanceWalletIcon />}
          component={Link}
          href="/campaigns/new"
          sx={{
            marginX: '10px',
            marginRight: '100px',
            backgroundColor: '#eefdfe',
            color: '#000000',
            padding: '15px',
            paddingX: '25px',
            border: '3px solid',
            borderRadius: '30px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              color: 'white',
              borderColor: '#eefdfe',
            },
          }} 
          className='font-nanum'
        >
          Connect Wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
