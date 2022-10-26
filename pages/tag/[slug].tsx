import React from "react";
import Layout from "layouts/page-layout";

function TagPage() {
  const content = `<h1>Comming Soom</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <h2>What to expect from here on out</h2>
          <p>
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit..."
          </p>
          <p>
            "There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain..."
          </p>
          <blockquote>
            <p>
              Typography is pretty important if you don't want your stuff to
              look like trash. Make it good then it won't be bad.
            </p>
          </blockquote>
<pre><code class="language-js">module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
</code></pre>`;

  return (
    <Layout>
      <div className="min-h-screen">
        <article
          className="prose  lg:prose-xl prose-headings:underline prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: content }}
        ></article>
      </div>
    </Layout>
  );
}

export default TagPage;
