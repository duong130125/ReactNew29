const initialState = {
  products: JSON.parse(localStorage.getItem("products") || "[]"),
  carts: JSON.parse(localStorage.getItem("carts") || "[]"),
  notification: "",
};

const reducerProducts = (state = initialState, action:any) => {
  switch (action.type) {
    case 'ADD':
      const { productId, quantity } = action.payload;
      const productToAdd = state.products.find((p:any) => p.id === productId);
      if (!productToAdd) return state;

      const existingCartItem = state.carts.find((item:any) => item.id === productId);
      let updatedCart;

      if (existingCartItem) {
        updatedCart = state.carts.map((item:any) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...state.carts, { ...productToAdd, quantity }];
      }

      localStorage.setItem("carts", JSON.stringify(updatedCart));
      return { ...state, carts: updatedCart, notification: "Add to cart successfully" };

    case 'UPDATE_CART':
      const { productId: updateId, quantity: updateQuantity } = action.payload;
      const productToUpdate = state.products.find((p:any) => p.id === updateId);
      if (!productToUpdate) return state;

      if (updateQuantity > productToUpdate.stock) {
        return { ...state, notification: "Số lượng sản phẩm vượt quá số lượng trong kho" };
      }

      updatedCart = state.carts.map((item:any) =>
        item.id === updateId ? { ...item, quantity: updateQuantity } : item
      );
      localStorage.setItem("carts", JSON.stringify(updatedCart));
      return { ...state, carts: updatedCart, notification: "Update cart successfully" };

    case 'DELETE_CART':
      const updatedCartAfterDelete = state.carts.filter((item:any) => item.id !== action.payload.productId);
      localStorage.setItem("carts", JSON.stringify(updatedCartAfterDelete));
      return { ...state, carts: updatedCartAfterDelete, notification: "Delete cart successfully" };

    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };

    default:
      return state;
  }
};

export default reducerProducts;
