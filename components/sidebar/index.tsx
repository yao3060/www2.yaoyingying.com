import CategoriesWidget from "./categories-widget";
import SearchWidget from "./search-widget";
import TagsWidget from "./tags-widget";

const Sidebar = () => {
  return (
    <div className="widget-area sidebar pt-10 pl-10 pb-10">
      <SearchWidget />
      <div className="divider"></div>
      <CategoriesWidget />
      <div className="divider"></div>
      <TagsWidget />
    </div>
  );
};

export default Sidebar;
