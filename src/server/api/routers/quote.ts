import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quote.findMany();
  }),
  create: privateProcedure
    .input(
      z.object({
        author: z.string(),
        text: z.string(),
        date: z.string(),
        comment: z.string(),
      })
    )
    // .input(
    //   z.object({
    //     author: z.string(),
    //     text: z.string(),
    //     date: z.string(),
    //     comment: z.string(),
    //   })
    // )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.auth.userId;

      const quote = await ctx.prisma.quote.create({
        data: {
          userId: user,
          author: input.author,
          text: input.text,
          date: input.date,
          comment: input.comment,
        },
      });
      console.log(quote);
      return quote;
    }),
});
