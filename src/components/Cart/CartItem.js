import React, { useContext } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./CartItem_style";
import { CartContext } from "../../Context/CartContext";

const CartItem = () => {
  const { dispatch, shoppingCart } = useContext(CartContext);

  const classes = useStyles();
  return (
    <>
      {shoppingCart &&
        shoppingCart.map((cart) => (
          <Card className={classes.margin} key={cart.ProductID}>
            <CardMedia
              image={cart.ProductImg}
              alt="not found"
              className={classes.media}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h4">{cart.ProductName}</Typography>
              <Typography variant="h5">${cart.ProductPrice}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                <Button
                  type="button"
                  size="small"
                  onClick={() =>
                    dispatch({ type: "DEC", id: cart.ProductID, cart })
                  }
                >
                  -
                </Button>
                <span>{cart.qty}</span>
                <Button
                  type="button"
                  size="small"
                  onClick={() =>
                    dispatch({ type: "INC", id: cart.ProductID, cart })
                  }
                >
                  +
                </Button>
              </div>
              <Button
                variant="contained"
                type="button"
                color="secondary"
                onClick={() =>
                  dispatch({ type: "DELETE", id: cart.ProductID, cart })
                }
              >
                Remove
              </Button>
              <Typography variant="h5"></Typography>
            </CardActions>
          </Card>
        ))}
    </>
  );
};

export default CartItem;
