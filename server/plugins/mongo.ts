import mongoose from "mongoose";
import Model from "../model";
import { IGlobalDB } from "~~/types";

declare global {
  var DB: IGlobalDB;
}

export default defineNitroPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(runtimeConfig.mongoURI as string, {
        dbName: runtimeConfig.mongoDB,
      });

      global.DB = Model(mongoose);
    }
  } catch (e: any) {
    console.error(e);

    throw createError({
      statusCode: 500,
      statusMessage: e.toString(),
    });
  }
});
