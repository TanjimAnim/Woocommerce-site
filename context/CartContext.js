import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./Reducer";

const ShoppingCartContext = createContext();
const emptyArray = [];
export function ShoppingCartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: emptyArray,
  });

  // if cart aleady exists in the localstorage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      dispatch({
        type: "SET_INITIAL_CART_VALUE",
        payload: JSON.parse(localStorage.getItem("cart")),
      });
    }
  }, []);

  //to update the localstorage when it already has a product
  useEffect(() => {
    if (state.cart !== emptyArray)
      localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // to sync between multiple tabs based on page visibility
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        dispatch({
          type: "SET_INITIAL_CART_VALUE",
          payload: JSON.parse(localStorage.getItem("cart")),
        });
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false
    );
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  return (
    <ShoppingCartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}
