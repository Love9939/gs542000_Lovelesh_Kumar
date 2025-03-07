import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Store, Inventory, Timeline, BarChart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logoo.svg';

const drawerWidth = 240;

const menuItems = [
  { text: 'Stores', icon: <Store />, path: '/stores' },
  { text: 'SKUs', icon: <Inventory />, path: '/skus' },
  { text: 'Planning', icon: <Timeline />, path: '/planning' },
  { text: 'Chart', icon: <BarChart />, path: '/chart' },
];

function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <img src={Logo} alt="GSynergy" height="40" />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              onClick={() => navigate(item.path)}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          minWidth: '1080px',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;