import React, { useContext, useState } from "react";
import { AddShoppingCart } from "@material-ui/icons";
import { ProductsContext } from "../../Context/ProductsContext";
import { CartContext } from "../../Context/CartContext";
import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Container,
  Card,
} from "@material-ui/core";
import useStyles from "./Product_style";
import Pagination from "../Pagination/Pagination";

const Product = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const classes = useStyles();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentproducts = products.slice(indexOfFirstProducts, indexOfLastProducts);
  const totalPagesNum = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <Container>
        {products.length !== 0 && <h1 className={classes.marginTop}>Products</h1>}

        <main clasName={classes.content}>
          {products.length === 0 && (
            <div>slow internet...no products to display</div>
          )}
          <div className={classes.toolbar} />
          <Grid container justify="center" spacing={4}>
            {currentproducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} >
                <Card className={classes.root} >
                  <CardMedia
                    className={classes.media}
                    image={product.ProductImg}
                    title={product.ProductName}
                    
                    
                  />
                  <CardContent>
                    <div className={classes.cardContent}>
                      <Typography variant="h5" gutterBottom>
                        {product.ProductName}
                      </Typography>
                      <Typography variant="h5">
                        $ {product.ProductPrice}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton
                      aria-label="Add to Cart"
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_CART",
                          id: product.ProductID,
                          product,
                        
                          
                        })
                      }
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div>
            <Pagination
              pages={totalPagesNum}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>
      </Container>
    </>
  );
};

export default Product;
