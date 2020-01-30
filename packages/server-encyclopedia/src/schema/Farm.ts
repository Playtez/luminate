import {gql, ApolloError} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers} from '../types'
import {FarmDocument, FarmZoneDocument} from '@luminate/mongo'

const typeDefs = gql`
  type Farm {
    id: ID!
    name: String
    country: Country
    region: Region
    farmZones: [FarmZone]
    createdAt: String
    updatedAt: String
  }

  type FarmConnection {
    pageInfo: PageInfo!
    edges: [FarmEdge!]!
  }

  type FarmEdge {
    cursor: String
    node: Farm
  }

  input CreateFarmInput {
    name: String
    country: ID
    region: ID
  }

  input UpdateFarmInput {
    name: String
    country: ID
    region: ID
  }

  extend type Query {
    listFarms(cursor: String, limit: Int, query: [QueryInput]): FarmConnection!
    getFarm(id: ID!): Farm
  }

  extend type Mutation {
    createFarm(input: CreateFarmInput!): Farm
    updateFarm(id: ID!, input: UpdateFarmInput!): Farm
    deleteFarm(id: ID!): Farm
  }
`

const resolvers: Resolvers = {
  Query: {
    listFarms: async (parent, args, {models}) => {
      const {Farm} = models
      const results = await createConnectionResults({args, model: Farm})
      return results
    },
    getFarm: async (parent, {id}, {loaders}, info) => {
      const {farms} = loaders
      return farms.load(id)
    },
  },
  Mutation: {
    createFarm: async (parent, {input}, {models}) => {
      const {Farm} = models
      const farm = await new Farm(input).save()
      return farm
    },
    updateFarm: async (parent, {id, input}, {models}) => {
      const {Farm} = models
      const farm = await Farm.findByIdAndUpdate(id, input, {new: true})
      return farm
    },
    deleteFarm: async (parent, {id}, {models}) => {
      const {Farm} = models
      const farm = await Farm.findByIdAndDelete(id)
      if (!farm) {
        throw new ApolloError('Document not found')
      }
      return farm
    },
  },
  Farm: {
    country: async (parent, args, {loaders}) => {
      const {countries} = loaders
      if (!parent.country) return null
      return countries.load(parent.country)
    },
    region: async (parent, args, {loaders}) => {
      const {regions} = loaders
      if (!parent.region) return null
      return regions.load(parent.region)
    },
    farmZones: async (parent, args, {models, loaders}) => {
      const {farmZonesOfFarm} = loaders
      return farmZonesOfFarm.load(parent.id)
    },
  },
}

export interface FarmLoaders {
  farms: LoaderFn<FarmDocument>
  farmZonesOfFarm: LoaderFn<FarmZoneDocument[]>
}

export const loaders: FarmLoaders = {
  farms: async (ids, models) => {
    const {Farm} = models
    const farms = await Farm.find({_id: ids})
    return ids.map(id => {
      const farm = farms.find((farm: any) => farm._id.toString() === id.toString())
      if (!farm) throw new Error('Document not found')
      return farm
    })
  },
  farmZonesOfFarm: async (ids, models) => {
    const {FarmZone} = models
    const farmZones = await FarmZone.find({farm: ids})
    return ids.map(id => {
      return farmZones.filter((farmZone: any) => farmZone.farm && farmZone.farm.toString() === id)
    })
  },
}

export const schema = {typeDefs, resolvers}
