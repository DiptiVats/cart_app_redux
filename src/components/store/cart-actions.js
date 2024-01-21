import { uiAction } from "./ui-slice";
import { cartActions } from "./cart-slice";
export function fetchCartData() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cartapp-a7b15-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching data to cart failed !",
        })
      );
    }
  };
}

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: "pending",
        title: "sending....",
        message: "Sending data to the cart",
      })
    );

    async function sendRequest() {
      const response = await fetch(
        "https://cartapp-a7b15-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("sending data to cart is failed.");
      }
    }

    try {
      await sendRequest();
      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success",
          message: "sent data to the cart successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error",
          message: "sending data to cart is failed !",
        })
      );
    }
  };
}
