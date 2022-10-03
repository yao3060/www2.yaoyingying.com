import { getCategories } from "apis/categories";
import UISelect from "components/common/ui-select";
import { Category } from "interfaces";
import React, { useEffect, useState } from "react";
import usePostStore from "stores/posts";
import { useQueryParam, withDefault, NumberParam } from "use-query-params";
import shallow from "zustand/shallow";

export default function PostsSearchCategories() {
  const filter = usePostStore((state) => state.filter, shallow);
  const setFilter = usePostStore((state) => state.setFilter);

  const [categories] = useQueryParam(
    "categories",
    withDefault(NumberParam, undefined)
  );

  const [items, setItems] = useState<Category[] | []>([]);
  const getData = async () => {
    const response = await getCategories({ parent: 0, per_page: 100 });
    setItems(response.data);
  };

  const getSelectOptions = (items: Category[] | []) => {
    return items.map((item) => ({
      label: item.name,
      value: `${item.id}`,
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <UISelect
        className="form-control  mr-5"
        options={getSelectOptions(items)}
        value={categories?.toString()}
        onChange={(o) => {
          console.log(o);
          setFilter({
            ...filter,
            categories: o && Number(o.value) ? o.value : undefined,
            page: "1",
          });
        }}
      />
    </>
  );
}
