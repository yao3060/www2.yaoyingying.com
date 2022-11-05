import React, { useState, useEffect } from "react";
import usePostStore from "stores/posts";
import shallow from "zustand/shallow";
import { useRouter } from "next/router";

export default function PostsSearchOrder() {
  const router = useRouter();
  const { order } = router.query;
  const [checked, setChecked] = useState(true);

  const filter = usePostStore((state) => state.filter, shallow);
  const setFilter = usePostStore((state) => state.setFilter);

  useEffect(() => {
    if (order) {
      setChecked(order === "desc");
    }
  }, [order]);
  return (
    <div className="form-control  mr-5">
      <label className="btn swap">
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={() => {
            setChecked(!checked);
            setFilter({
              ...filter,
              order: !checked ? "desc" : "asc",
            });
          }}
        />
        <div className="swap-on">DESC</div>
        <div className="swap-off">ASC</div>
      </label>
    </div>
  );
}
