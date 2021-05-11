import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import Navbar from "../Navbar/Navbar";
import { useHistory,Link } from "react-router-dom";
import { auth } from "../../lib/firebase";
import CartItem from "./CartItem";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyle from "./Cart_style";

const Cart = ({ user }) => {
  const { shoppingCart, totalPrice, totalQty } = useContext(CartContext);
  const classes = useStyle();
  const history = useHistory();
  
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  });
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      
      Sepetiniz Boş,
      <Link to="/" className={classes.Link}>
        
        Alışverişe başla
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3} >
          <CartItem />
      </Grid>

      <Typography variant="h3" align="center">Cart Summary</Typography>
      <Typography variant="h4" align="center">
        <span>Total Price:</span>
        <span>{totalPrice}</span>
      </Typography>
      <Typography variant="h5" align="center">
        <span>Total Quality:</span>
        <span>{totalQty}</span>
      </Typography>
     <Grid>
      <Button
        
        className={classes.checkoutButton}
        component={Link}
        to="/cashout"
        size="large"
        type="button"
        variant="contained"
        color="primary"
      >
        Checkout
      </Button>
      </Grid>
    </>
  );
  return (
    <>
      <Navbar user={user} />
      <Container>
        <div className={classes.toolbar}>
          <Typography className={classes.title} variant="h3" gutterBottom>
            Your Shopping Cart
          </Typography>
          {!shoppingCart.length ? <EmptyCart /> : <FilledCart />}
        </div>
      </Container>
    </>
  );
};
export default Cart;
