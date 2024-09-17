import env from "@/env";
import { MenuItem } from "@/wordpress/wordpress";
import { wpClient } from "@/wordpress/WPClient";
import Link from "next/link";

const Navigation = async () => {
  // get HEADER MENU https://yaoyingying.com/wp-json/wp/v2/nav-menus/navigation
  const response = await wpClient.fetch("/wp-json/wp/v2/nav-menus/navigation");
  const menus = (await response.json()) as MenuItem[];

  return (
    <nav className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
      <ul className="flex space-x-8">
        {menus.map((menu) => {
          const link = menu.url.replaceAll(
            env.WordPressRestAPI,
            ""
          ) as __next_route_internal_types__.RouteImpl<string>;
          return (
            <li key={menu.ID}>
              <Link
                className="hover:text-sky-500 dark:hover:text-sky-400"
                href={link}
                dangerouslySetInnerHTML={{ __html: menu.title }}
              ></Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
