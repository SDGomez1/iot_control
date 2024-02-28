import { router, publicProcedure } from "@trpcApi/trpc";
import { z } from "zod";

export const adminRouter = router({
  create: publicProcedure
    .input(
      z.object({
        word: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.commands.create({
        data: {
          command: input.word,
        },
      });
    }),
  read: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.prisma.commands.findMany();
  }),
  delete: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.prisma.commands.deleteMany({});
  }),
});
