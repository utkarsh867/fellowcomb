import { nexusPrisma } from 'nexus-plugin-prisma'
import { makeSchema, objectType, queryType } from '@nexus/schema'
import {nexusSchemaPrisma} from "nexus-plugin-prisma/schema"
import path from "path"

const User = objectType({
  name: "User",
  definition(t){
    t.model.id()
  }
})

const Query = queryType({
  definition(t){
    t.string("name")
  }
})

export const schema = makeSchema({
  types: [Query, User],
  plugins: [nexusSchemaPrisma()],
  outputs: {
    schema: path.join(__dirname, 'schema.graphql'),
    typegen: path.join(__dirname, "nexus.d.ts")
  },
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma"
      },
      {
        source: require.resolve("./context"),
        alias: "Context"
      }
    ]
  }
})
