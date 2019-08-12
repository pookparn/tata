
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
    root: {
        width: '98%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}));

function createData(name, calories, fat, carbs, protein, age) {
    return { name, calories, fat, carbs, protein, age };
}

const rows = [
    createData(1, "asdasdasda", "asdasdasd", "asdasdasd", "asdasdsa", "asdasdas"),
    createData(2, 237, 9.0, 37, 4.3, 20),
    createData(3, 262, 16.0, 24, 6.0, 30),
    createData(4, 305, 3.7, 67, 4.3, 10),
    createData(5, 356, 16.0, 49, 3.9, 20),
    { name: 6, calories: 356, fat: 16.0, carbs: 49, protein: 3.9, age: 20 }
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ลำดับ</TableCell>
                        <TableCell align="left">วันที่ลูกค้ารับรถ</TableCell>
                        <TableCell align="right">บริษัท</TableCell>
                        <TableCell align="right">ทะเบียน</TableCell>
                        <TableCell align="right">รุ่นรถ</TableCell>
                        <TableCell align="right">ผู้ติดต่อ 1</TableCell>

                        <TableCell align="right">โทรศัพท์ติดต่อ 1</TableCell>
                        <TableCell align="right">ผู้ติดต่อ 2</TableCell>
                        <TableCell align="right">โทรศัพท์ติดต่อ 2</TableCell>
                        <TableCell align="right">เลขประวัติการเข้ารับบริการ</TableCell>
                        <TableCell align="right">ประเภทการบริการ</TableCell>

                        <TableCell align="right">เลขกิโลออก</TableCell>
                        <TableCell align="right">รอบการบำรุงรักษา (km)</TableCell>
                        <TableCell align="right">จำนวนเดือนติดตาม</TableCell>
                        <TableCell align="right">อาการที่พบ</TableCell>
                        <TableCell align="right">การแจ้งเตือน</TableCell>

                        <TableCell align="right">รายละเอียดการแจ้งเตือน</TableCell>
                        <TableCell align="right">สถานะการแแจ้งเตือน</TableCell>
                        <TableCell align="right">หมายเหตุ</TableCell>
                        <TableCell align="right">การแก้ไข</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell align="left" component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.calories}</TableCell>
                            <TableCell align="center">
                                <Input
                                    defaultValue={row.fat}
                                    
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}