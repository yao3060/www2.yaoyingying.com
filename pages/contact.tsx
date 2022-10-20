import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "layouts/one-column-layout";
import { RootState, Dispatch } from "stores/rematch";
import classNames from "classnames";

const ContactPage = () => {
  const isLoading = useSelector(
    (rootState: RootState) => rootState.loading.models.counter
  );
  const counterState = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    dispatch.counter.increment(1);
  }, []);

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <div className="py-10">
        <h1 className="text-4xl">Rematch Counter: {counterState}</h1>

        <p className="my-10">
          <button
            type="button"
            className="btn   mr-5"
            onClick={() => dispatch.counter.increment(2)}
          >
            Increment 2
          </button>

          <button
            type="button"
            className={classNames("btn", {
              "loading  btn-disabled": isLoading,
            })}
            onClick={() => dispatch.counter.incrementAsync(5)}
          >
            Async Increment 5
          </button>
        </p>
        <hr />
      </div>
    </Layout>
  );
};

export default ContactPage;
