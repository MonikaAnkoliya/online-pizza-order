import React, {Component, useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems } from "../../Redux/Actions";
import {getHistoryOfOrder} from "../../Redux/apiCall";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems,
    orderHistory: []
  };
};
const mapDispatchToProps = dispatch => ({
    getHistoryOfOrder: () => dispatch(getHistoryOfOrder())
});
// This component shows the items user checked out from the cart.
const ConnectedOrder = (props)=>{
    let items = [];
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        fetchData()
    },[]);

    const fetchData=async ()=> {
        setLoading(true)
        await props.getHistoryOfOrder();
        setLoading(false);
    };
    if (loading) {
        return (
            <CircularProgress className="circular" />
        );
    }
    console.log('props.orderHistory', props.orderHistory);
    let totalPrice = props.orderHistory.reduce((accumulator, item) => {
        debugger
        return accumulator + item.totalAmount * item.quantity;
    }, 0);
    debugger
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
                    {props.orderHistory.map((item, index) => {
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
                    props.dispatch(setCheckedOutItems([]));
                }}
                style={{ margin: 5, marginTop: 30 }}
            >
                Discard
            </Button>
        </div>
    );}
const Order = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedOrder));

export default Order;
