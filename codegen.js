const clientGenerates = {
  'packages/admin/src/graphql/index.tsx': {
    documents: 'packages/admin/src/graphql/**/*.graphql',
    schema: 'http://localhost:3000/graphql',
    plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    config: {
      withComponent: false,
      withHOC: false,
      withHooks: true,
      nonOptionalTypename: true,
      federation: true,
    },
  },
  'packages/gatsby-theme-luminate/src/graphql/index.tsx': {
    documents: 'packages/gatsby-theme-luminate/src/graphql/**/*.graphql',
    schema: 'http://localhost:3000/graphql',
    plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    config: {
      withComponent: false,
      withHOC: false,
      withHooks: true,
      nonOptionalTypename: true,
      federation: true,
    },
  },
}

const serverGenerates = {
  'packages/graphql-utils/src/types.ts': {
    plugins: ['typescript'],
  },
  'packages/server-auth/src/types.d.ts': {
    schema: ['./packages/server-auth/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        Role: '@luminate/mongo#RoleDocument',
        Scope: '@luminate/mongo#ScopeDocument',
        User: '@luminate/mongo#UserDocument',
      },
    },
  },
  'packages/server-encyclopedia/src/types.d.ts': {
    schema: ['./packages/server-encyclopedia/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        Coffee: '@luminate/mongo#CoffeeDocument',
        Country: '@luminate/mongo#CountryDocument',
        Farm: '@luminate/mongo#FarmDocument',
        FarmZone: '@luminate/mongo#FarmZoneDocument',
        Region: '@luminate/mongo#RegionDocument',
        Variety: '@luminate/mongo#VarietyDocument',
      },
    },
  },
  'packages/server-sensory-eval/src/types.d.ts': {
    schema: ['./packages/server-sensory-eval/src/schema/**/!(index.ts)*.ts'],
    plugins: ['typescript', 'typescript-resolvers'],
    config: {
      contextType: './startServer#Context',
      useIndexSignature: true,
      federation: true,
      mappers: {
        Cupping: '@luminate/mongo#CuppingDocument',
        CuppingCoffee: '@luminate/mongo#CoffeeCuppingDocument',
      },
    },
  },
}

module.exports = {
  schema: ['./packages/graphql-utils/src/schema/**/*.ts'],
  generates: Object.assign(
    {},
    process.argv.find(arg => arg === '--client') ? clientGenerates : null,
    process.argv.find(arg => arg === '--server') ? serverGenerates : null,
  ),
}
