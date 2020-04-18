import React  from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  showCartDlg,
  toggleMenu,
} from "../../Redux/Actions";
import cartImage from "../../Images/logo2.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
  };
};

// Option items for product categories.

const ConnectedHeader = (props) => {
   return (
      <AppBar
        position="static"
        style={{ backgroundColor: "#FAFAFB", padding: 10 }}
      >
        <Toolbar>
          <div className="left-part">
            <IconButton
              onClick={() => {
                props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="medium" />
            </IconButton>

            <img
              src={cartImage}
              alt={"Logo"}
              style={{ marginLeft: 10 }}

            />
          </div>
          <div className="right-part">
            <IconButton
              aria-label="Cart"
              onClick={() => {
                props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
