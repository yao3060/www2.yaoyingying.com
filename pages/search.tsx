import SearchForm from "components/common/search-form";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../layouts/page-layout";

const SearchPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {}, []);

  return (
    <Layout title="Search">
      <SearchForm />
    </Layout>
  );
};

export default SearchPage;
