import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiAction } from "./components/store/ui-slice";
import { useEffect, Fragment } from "react";
import Notification from "./components/UI/Notification";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiAction.showNotification({
          status: "pending",
          title: "sending....",
          message: "Sending data to the cart",
        })
      );
      const response = await fetch(
        "https://cartapp-a7b15-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("sending data to cart is failed.");
      }

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success",
          message: "sent data to the cart successfully",
        })
      );
    };

    sendCartData().catch((error) => {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error",
          message: "sending data to cart is failed !",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
