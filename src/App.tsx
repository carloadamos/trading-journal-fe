import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  LocalAtm,
  ShowChart,
  Dashboard as DashboardIcon,
  ExpandMore,
  ExpandLess,
  Notes as NotesIcon,
  NoteAdd as NoteAddIcon,
  Info as InfoIcon,
} from '@material-ui/icons';
import { Drawer, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

// Components
import Header from './components/Header/Header';

// Pages
import LogList from './pages/Logs/LogList/LogList';
import Funds from './pages/Funds/Funds';
import LogEntry from './pages/Logs/LogEntry/LogEntry';
import Dashboard from './pages/Dashboard/Dashboard';
import StockData from './pages/Stock Data/StockData';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 100,
      padding: theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:3001/graphql',
    }),
    cache: new InMemoryCache(),
  });
};

const App: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleLogsClick = () => {
    setOpen(!open);
  };

  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <Header />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <ListItem component={Link} to="/" button key="main">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button key="logs" onClick={handleLogsClick}>
                  <ListItemIcon>
                    <ShowChart />
                  </ListItemIcon>
                  <ListItemText primary="Trades" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem component={Link} to="/entry" button className={classes.nested}>
                      <ListItemIcon>
                        <NoteAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Entry" />
                    </ListItem>
                    <ListItem component={Link} to="/logs" button className={classes.nested}>
                      <ListItemIcon>
                        <NotesIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logs" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem component={Link} to="/funds" button key="funds">
                  <ListItemIcon>
                    <LocalAtm />
                  </ListItemIcon>
                  <ListItemText primary="Funds" />
                </ListItem>
                <ListItem component={Link} to="/data" button key="data">
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="Data" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/logs">
                <LogList />
              </Route>
              <Route path="/funds">
                <Funds />
              </Route>
              <Route path="/entry">
                <LogEntry />
              </Route>
              <Route path="/data">
                <StockData />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
