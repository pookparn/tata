import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const Dialogbox = () => {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={this.state.dialogOpen}
                onClose={this.handleDialogClose.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"ต้องการ \"บันทึกข้อมูลทั้งหมด\" ใช่หรือไม่?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClickUpdateYes.bind(this)} color="primary" autoFocus>
                        ใช่
            </Button>
                    <Button onClick={this.handleDialogClose.bind(this)} color="primary" >
                        ไม่ใช่
            </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
export default Dialogbox;