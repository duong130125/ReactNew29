import ProductList from "./components/ProductList";

export default function App() {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <ProductList></ProductList>
        </div>
      </div>
    </>
  );
}
