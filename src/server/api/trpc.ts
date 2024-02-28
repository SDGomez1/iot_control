import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "../db";

import { initTRPC, TRPCError } from "@trpc/server";

type CreateContextOptions = {};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    prisma,
  };
};
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  return createInnerTRPCContext({});
};
const t = initTRPC.context<typeof createInnerTRPCContext>().create({});

export const router = t.router;

export const publicProcedure = t.procedure;
