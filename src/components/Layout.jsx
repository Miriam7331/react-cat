import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

const Layout = () => {
  return (
    <div>
      <header>
        <h1>Mi Tienda</h1>
        <SearchBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
