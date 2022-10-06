import create from "zustand";
import { devtools } from "zustand/middleware";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()(
  devtools(
    (set) => ({
      bears: 0,
      increase: (by) =>
        set((state) => ({ bears: state.bears + by }), false, {
          type: "bear/increase",
          by,
        }),
    }),
    {
      name: "BearStore",
      serialize: { options: true },
    }
  )
);

export default useBearStore;
