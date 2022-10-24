import React from "react";
import Layout from "layouts/one-column-layout";
import Image18 from "assets/images/18.jpg";
import { motion } from "framer-motion";

import Welcome from "components/about/welcome";
import Grids from "components/about/grids";

const AboutPage = () => {
  return (
    <Layout
      fullWidth={true}
      title="About | Next.js + TypeScript Page"
      bgImage={Image18.src}
    >
      <Welcome />
      <motion.div
        initial={{ opacity: 0, translateY: "-2rem" }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1 }}
      >
        <Grids />
      </motion.div>
    </Layout>
  );
};

export default AboutPage;
