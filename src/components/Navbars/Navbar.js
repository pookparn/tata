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
                <Button color="inherit" href="/Alert" className={classes.button}>
                    รายการติดตาม
                </Button>
                <Button color="inherit" href="/Customer" className={classes.button}>
                    ข้อมูลลูกค้า
                </Button>
                <Button color="inherit" href="/contact" className={classes.button}>
                    ข้อมูลรถ
                </Button>
            </Toolbar>
        </AppBar>
        
        </div>
    )
}
export default NavBar;