export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cart.length === 0) {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload.product,
              qty: action.payload.qty,
              total_price: action.payload.qty * action.payload.price,
            },
          ],
        };
      }
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.product.id
      );

      if (itemIndex >= 0) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === action.payload.product.id) {
              return { ...item, qty: item.qty + action.payload.qty };
            } else {
              return item;
            }
          }),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload.product,
              qty: action.payload.qty,
              total_price: action.payload.qty * action.payload.price,
            },
          ],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload),
      };

    case "INCREASE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            return {
              ...item,
              qty: action.payload.qty,
              total_price: action.payload.qty * item.price,
            };
          } else {
            return item;
          }
        }),
      };
    case "DECREASE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            return {
              ...item,
              qty: action.payload.qty,
              total_price: action.payload.qty * item.price,
            };
          } else {
            return item;
          }
        }),
      };
    case "SET_INITIAL_CART_VALUE":
      return {
        ...state,
        cart: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
