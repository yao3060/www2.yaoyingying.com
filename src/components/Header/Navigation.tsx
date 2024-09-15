import env from "@/env";
import { MenuItem } from "@/wordpress/wordpress";
import { wpClient } from "@/wordpress/WPClient";

const Navigation = async () => {
  // get HEADER MENU https://yaoyingying.com/wp-json/wp/v2/nav-menus/navigation
  const response = await wpClient.fetch("/wp-json/wp/v2/nav-menus/navigation");
  const menus = (await response.json()) as MenuItem[];

  return (
    <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
      <ul className="flex space-x-8">
        {menus.map((menu) => {
          const link = menu.url.replaceAll(env.WordPressRestAPI, "");
          return (
            <li key={menu.ID}>
              <a
                className="hover:text-sky-500 dark:hover:text-sky-400"
                href={link}
                dangerouslySetInnerHTML={{ __html: menu.title }}
              ></a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
