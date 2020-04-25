import React, { Component,useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {sendOrder} from "../../Redux/apiCall";
const mapStateToProps = state => {
    return {
        checkedOutItems: state.checkedOutItems
    };
};
const mapDispatchToProps = dispatch => ({
    sendOrder: (item) => dispatch(sendOrder(item)),
    setLoggedInUser: (name) => dispatch(setLoggedInUser(name))
});
const ConnectedLogin =(props)=>{
    const [userName,setUserName] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [redirectToReferrer,setRedirectToReferrer] = useState(false);
    const [wrongCred,setWrongCred] = useState(false);
    const { from } = props.location.state || { from: { pathname: "/" } };
    if (redirectToReferrer === true) {
        return <Redirect to={from} />;
    }
    console.log('checkedOutItems',props.checkedOutItems);

    return (
        <div style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
        }}>
            <div
                style={{
                    height: 300,
                    width: 200,
                    padding: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <Avatar style={{ marginBottom: 10 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <div
                    style={{
                        marginBottom: 20,
                        fontSize: 24,
                        textAlign: "center"
                    }}
                >
                    {" "}
                    Log in
                    {" "}
                </div>
                <TextField
                    value={userName}
                    placeholder="User name"
                    onChange={e => {
                        setUserName(e.target.value)
                    }}
                />
                <TextField
                    value={address}
                    type="Address"
                    placeholder="Address"
                    onChange={e => {
                        setAddress(e.target.value)
                    }}
                />
                <TextField
                    value={phone}
                    type="Phone"
                    placeholder="Phone"
                    onChange={e => {
                        setPhone(e.target.value)
                    }}
                />
                <Button
                    style={{ marginTop: 20, width: 200 }}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        props.checkedOutItems.map((item) => {
                            const order = {
                                name: userName,
                                phone,
                                address,
                                totalAmount: item.price,
                                pizzaName: item.name,
                                quantity: item.quantity
                            }
                            props.sendOrder(order);
                        })
                        props.setLoggedInUser({ name: userName })
                        setRedirectToReferrer(true)
                    }}
                >
                    Log in
                </Button>
                {wrongCred && (
                    <div style={{ color: "red" }}>Wrong username and/or password</div>
                )}
            </div>
        </div>
    );
};
const Login = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin));

export default Login;
