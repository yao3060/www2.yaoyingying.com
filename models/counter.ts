import { createModel } from "@rematch/core";
import { RootModel } from ".";

export const counter = createModel<RootModel>()({
  state: 1,
  reducers: {
    increment(state, payload: number) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload: number, state) {
      console.log("This is current root state", state);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.counter.increment(payload);
    },
  }),
});
