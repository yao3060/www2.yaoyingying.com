import { getCategories } from "apis/categories";
import UISelect, { Option } from "components/common/ui-select";
import { Category } from "interfaces";
import React, { useEffect, useState } from "react";
import usePostStore from "stores/posts";
import { useQueryParam, withDefault, NumberParam } from "use-query-params";
import shallow from "zustand/shallow";

export default function PostsSearchCategories() {
  const filter = usePostStore((state) => state.filter, shallow);
  const setFilter = usePostStore((state) => state.setFilter);

  const [categories, setCategories] = useQueryParam(
    "categories",
    withDefault(NumberParam, undefined)
  );

  const [items, setItems] = useState<Category[] | []>([]);
  const getData = async () => {
    const response = await getCategories({ parent: 0, per_page: 100 });
    setItems(response.data);
  };

  const getSelectOptions = (items: Category[] | []): Option[] => {
    return items.map((item) => ({
      label: item.name,
      value: `${item.id}`,
    }));
  };

  const [value, setValue] = useState<Option | undefined>(undefined);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (categories && items) {
      const cat = items.find((item) => item.id === categories);
      if (cat)
        setValue({
          label: cat.name,
          value: cat.id,
        });
    }
  }, [categories, items]);

  return (
    <>
      <UISelect
        className="form-control  mr-5"
        options={getSelectOptions(items)}
        value={value}
        onChange={(o) => {
          setCategories(o === undefined ? null : parseInt(o?.value as string));
          setValue(o);
          setFilter({
            ...filter,
            categories: o === undefined ? undefined : `${o.value}`,
            page: "1",
          });
        }}
      />
    </>
  );
}
