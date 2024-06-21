export const addToCart = (productId:any, quantity:any) => ({
  type: "ADD",
  payload: { productId, quantity },
});

export const updateCart = (productId:any, quantity:any) => ({
  type: "UPDATE_CART",
  payload: { productId, quantity },
});

export const deleteFromCart = (productId: any) => ({
  type: 'DELETE_CART',
  payload: { productId },
});

export const setNotification = (message:any) => ({
  type: 'SET_NOTIFICATION',
  payload: message,
});
