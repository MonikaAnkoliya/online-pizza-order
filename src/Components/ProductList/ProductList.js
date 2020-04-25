import React, { Component,useState,useEffect } from "react";
import Item from "../Item/Item";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../../Api";
import ProductsHeader from "../ProductsHeader/ProductsHeader"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getPizzaItem} from "../../Redux/apiCall";
const mapStateToProps = state => {
  return { pizzaItem: state.pizzaItem };
};
const mapDispatchToProps = dispatch => ({
  getPizzaItems: () => dispatch(getPizzaItem())
});
const PizzaItems =(props)=>{
  console.log('props', props);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    fetchData()
  },[]);

  const fetchData=async ()=> {
    setLoading(true)
    await props.getPizzaItems();
    setLoading(false);
  };
  if (loading) {
    return (
        <CircularProgress className="circular" />
    );
  }
  return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ProductsHeader
            totalItemsCount={props.pizzaItem.length} />

        <div style={{ flex: 1 }}>
          {props.pizzaItem.map(item => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
      </div >
  );
};
const ProductList = withRouter(connect(mapStateToProps, mapDispatchToProps)(PizzaItems));

export default ProductList;
