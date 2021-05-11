import React, { useContext,useState } from "react";
import useStyles from "./Navbar_style";
import {  ShoppingCart,AccountCircle } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { CartContext } from "../../Context/CartContext";
import { Button,Badge,Menu,MenuItem,Typography,IconButton,Toolbar,AppBar } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';


const Navbar = (user) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const history = useHistory();
  const { totalQty } = useContext(CartContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  
  
 
  

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{user.user}</MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );
 

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          component={Link}
          to="/cart"
          aria-label="Show cart items"
          color="inherit"
        >
          <Badge badgeContent={totalQty} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
          >
            <img
              src="/images/logo.png"
              alt="Commerce.js"
              height="50px"
              className={classes.image}
            />
            My-Commerce
          </Typography>
          
          <div className={classes.grow} />
          {!user.user && (
            <div>
              <Button
                className={classes.Button}
                component={Link}
                to="/signup"
                size="medium"
                type="button"
                variant="contained"
              >
                SignUp
              </Button>
              <Button
                className={classes.Button}
                component={Link}
                to="/login"
                size="medium"
                type="button"
                variant="contained"
              >
                Login
              </Button>
            </div>
          )}

          {user.user && (
            <>
            
              <div className={classes.sectionDesktop}>
                {user.user ==="fatih çetin" &&(<IconButton
                  component={Link}
                  to="/addproduct"
                  aria-label="addProduct"
                  color="inherit"
                >
                  
                    <AddIcon />
                  
                </IconButton>)}
                
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  
                  <Badge badgeContent={totalQty} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default Navbar;
