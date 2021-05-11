import React, { useEffect, useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/Product/Product";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import AddProduct from "./components/Product/AddProduct";
import { ProductsContextProvider } from "./Context/ProductsContext";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { db, auth } from "./lib/firebase";
import { CartContextProvider } from "./Context/CartContext";
import Cashout from "./components/Cashout/Cashout";
import NotFound from "./components/NotFound.js/NotFound";

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
     auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("UserData")
          .doc(user.uid)
          .get()
          .then((snapshot) => { 
            setUser(snapshot.data().Name);
            localStorage.setItem("UserData", JSON.stringify(user));
           
          });
      } else {
        localStorage.removeItem("UserData");
        setUser(null);
      }
    });
    
  }, []);
 

  

  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <Router>
          <Switch>
            
            <Route exact path="/">
              <Navbar user={user} />
              <Products/>
            </Route>
            <Route exact path="/cart">
              <Cart user={user} />
            </Route>
            <Route exact path="/addproduct">
              <AddProduct />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/cashout" >
              <Cashout user={user}/>
            </Route>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
      </CartContextProvider>
    </ProductsContextProvider>
  );
};

export default App;
