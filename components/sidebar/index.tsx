import CategoriesWidget from "./categories-widget";
import SearchWidget from "./search-widget";

const Sidebar = () => {
  return (
    <div className="widget-area sidebar pt-10 pl-10 pb-10">
      <SearchWidget />
      <div className="divider"></div>
      <CategoriesWidget />
    </div>
  );
};

export default Sidebar;
