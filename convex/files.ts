import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    try {
      const identify = await ctx.auth.getUserIdentity();

      if (!identify) {
        throw new ConvexError("You must be logged in to create file");
      }
      await ctx.db.insert("files", {
        name: args.name,
      });
    } catch (error) {
      console.log("error", error);
    }
  },
});

export const getFiles = query({
  args: {},
  async handler(ctx, args) {
    const identify = await ctx.auth.getUserIdentity();

    if (!identify) {
      return [];
    }

    const files = await ctx.db.query("files").collect();

    return files;
  },
});
