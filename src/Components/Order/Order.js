import React, {useEffect, useState} from "react";
import { connect,useDispatch,useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems } from "../../Redux/Actions";
import {getHistoryOfOrder} from "../../Redux/apiCall";
import CircularProgress from "@material-ui/core/CircularProgress";
// This component shows the items user checked out from the cart.
const ConnectedOrder = (props)=>{
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const orderHistory = useSelector((state)=>state.orderHistory || []);
    useEffect(()=>{
        fetchData()
    },[]);

    const fetchData=async ()=> {
        setLoading(true)
        await dispatch(getHistoryOfOrder())
        setLoading(false);
    };
    if (loading) {
        return (
            <CircularProgress className="circular" />
        );
    }
    let totalPrice = orderHistory.reduce((accumulator, item) => {
        debugger
        return accumulator + item.totalAmount * item.quantity;
    }, 0);
    return (
        <div style={{ padding: 10 }}>
            <div style={{ fontSize: 24, marginTop: 10 }}>
                Order summary
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>User name</TableCell>
                        <TableCell>Item name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderHistory.map((item, index) => {
                        const date = new Date(item.createdAt);
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{date.toLocaleDateString()}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.pizzaName}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.totalAmount}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.totalAmount*item.quantity}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <div
                style={{
                    color: "#504F5A",
                    marginLeft: 5,
                    marginTop: 50,
                    fontSize: 22
                }}
            >
                Total price: {totalPrice} $
            </div>
            <Button
                color="primary"
                variant="outlined"
                disabled={totalPrice === 0}
                onClick={() => {
                    console.log("purchased");
                }}
                style={{ margin: 5, marginTop: 30 }}
            >
                Purchase
            </Button>
            <Button
                color="secondary"
                variant="outlined"
                disabled={totalPrice === 0}
                onClick={() => {
                    dispatch(setCheckedOutItems([]))
                }}
                style={{ margin: 5, marginTop: 30 }}
            >
                Discard
            </Button>
        </div>
    );}

export default ConnectedOrder;
