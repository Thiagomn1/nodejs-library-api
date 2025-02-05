import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value: string) => value !== "",
  message: ({ path }: { path: string }) => `The field ${path} cannot be empty`,
});
