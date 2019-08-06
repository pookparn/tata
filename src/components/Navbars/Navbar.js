import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
//import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }));

const NavBar = () => {
    const classes = useStyles();
    return(
        <div>
        <AppBar position="static" style={{ background: '#0277bd'}}>
            <Toolbar>
                <Button color="inherit" href="/" className={classes.button}>
                    Search
                </Button>
                <Button color="inherit" href="/users" className={classes.button}>
                    Users
                </Button>
                <Button color="inherit" href="/contact" className={classes.button}>
                    Contact
                </Button>
            </Toolbar>
        </AppBar>
        
        </div>
    )
}
export default NavBar;