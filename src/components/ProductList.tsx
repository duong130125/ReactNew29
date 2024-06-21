import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCart,
  deleteFromCart,
  setNotification,
} from "../actions";

export default function ProductList() {
  const stateProducts = useSelector(
    (state: any) => state.reducerProduct.products
  );
  const stateCarts = useSelector((state: any) => state.reducerProduct.carts);
  const notification = useSelector(
    (state: any) => state.reducerProduct.notification
  );

  const dispatch = useDispatch();

  const [productQuantities, setProductQuantities] = useState<any>({});
  const [cartQuantities, setCartQuantities] = useState<any>({});

  useEffect(() => {
    initializeProductQuantities();
    initializeCartQuantities();
  }, [stateProducts, stateCarts]);

  const initializeProductQuantities = () => {
    const initialProductQuantities: any = {};
    stateProducts.forEach((item: any) => {
      initialProductQuantities[item.id] = 1;
    });
    setProductQuantities(initialProductQuantities);
  };

  const initializeCartQuantities = () => {
    const initialCartQuantities: any = {};
    stateCarts.forEach((item: any) => {
      initialCartQuantities[item.id] = item.quantity;
    });
    setCartQuantities(initialCartQuantities);
  };

  const handleProductQuantityChange = (productId: any, value: any) => {
    const validatedValue = Math.max(value, 1);
    setProductQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [productId]: validatedValue,
    }));
  };

  const handleCartQuantityChange = (productId: any, value: any) => {
    const validatedValue = Math.max(value, 1);
    setCartQuantities((prevQuantities: any) => ({
      ...prevQuantities,
      [productId]: validatedValue,
    }));
  };

  const handleUpdateCart = (productId: any) => {
    const quantity: any = cartQuantities[productId];
    const product: any = stateProducts.find((p: any) => p.id === productId);

    if (!product) return;

    if (quantity > product.stock) {
      dispatch(
        setNotification("Số lượng sản phẩm vượt quá số lượng trong kho")
      );
    } else {
      dispatch(updateCart(productId, quantity));
      dispatch(setNotification("Update cart successfully"));
    }
  };

  const handleDeleteCart = (productId: any) => {
    const confirmed = window.confirm("Bạn có chắc bạn muốn xóa mục này?");
    if (confirmed) {
      dispatch(deleteFromCart(productId));
      dispatch(setNotification("Delete cart successfully"));
    }
  };

  const handleAddCart = (productId: any) => {
    const quantity: any = productQuantities[productId] || 1;
    dispatch(addToCart(productId, quantity));
    dispatch(setNotification("Add to cart successfully"));
  };

  return (
    <>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h1 className="panel-title">List Products</h1>
          </div>
          <div className="panel-body" id="list-product">
            {stateProducts.map((item: any) => (
              <div key={item.id} className="media product">
                <div className="media-left">
                  <a href="#">
                    <img
                      className="media-object"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{item.name}</h4>
                  <p>{item.description}</p>
                  <input
                    name={`quantity-product-${item.id}`}
                    type="number"
                    min={1}
                    value={productQuantities[item.id] || 1}
                    onChange={(e) =>
                      handleProductQuantityChange(
                        item.id,
                        parseInt(e.target.value)
                      )
                    }
                  />
                  <a onClick={() => handleAddCart(item.id)} className="price">
                    {item.price} USD
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h1 className="panel-title">Your Cart</h1>
          </div>
          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "4%" }}>STT</th>
                  <th>Name</th>
                  <th style={{ width: "15%" }}>Price</th>
                  <th style={{ width: "4%" }}>Quantity</th>
                  <th style={{ width: "25%" }}>Action</th>
                </tr>
              </thead>
              <tbody id="my-cart-body">
                {stateCarts.map((cart: any, index: any) => (
                  <tr key={cart.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{cart.name}</td>
                    <td>{cart.price}</td>
                    <td>
                      <input
                        name={`cart-item-quantity-${cart.id}`}
                        type="number"
                        min={1}
                        value={cartQuantities[cart.id] || cart.quantity}
                        onChange={(e) =>
                          handleCartQuantityChange(
                            cart.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>
                      <a
                        className="label label-info update-cart-item"
                        onClick={() => handleUpdateCart(cart.id)}
                      >
                        Update
                      </a>
                      <a
                        className="label label-danger delete-cart-item"
                        onClick={() => handleDeleteCart(cart.id)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot id="my-cart-footer">
                {stateCarts.length > 0 ? (
                  <tr>
                    <td colSpan={4}>
                      There are <b>{stateCarts.length}</b> items in your
                      shopping cart.
                    </td>
                    <td colSpan={2} className="total-price text-left">
                      {stateCarts.reduce(
                        (total: any, item: any) =>
                          total + item.price * item.quantity,
                        0
                      )}{" "}
                      USD
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Empty product in your cart
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>
        </div>

        {notification && (
          <div
            className={`alert ${
              notification.includes("Add") ? "alert-success" : "alert-danger"
            }`}
            role="alert"
            id="mnotification"
          >
            {notification}
          </div>
        )}
      </div>
    </>
  );
}
