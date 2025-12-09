import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/Header.css";
import "./assets/styles/Footer.css";
import "./assets/styles/MyCart.css";
import "./assets/styles/BookDetail.css";
import "./assets/styles/MyRequestBook.css";
import "./assets/styles/MyShop.css";
import "./assets/styles/MyOrder.css";
import "./assets/styles/ManageOrder.css";
import BookCategory from "./components/book/BookCategory";
import { NewUserProfile} from "./components/profile/NewUserProfile";
import { NewManageOrder } from "./components/order/NewManageOrder";

function App() {
  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
