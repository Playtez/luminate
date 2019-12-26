import {gql} from 'apollo-server-express'
import {createConnectionResults, LoaderFn} from '@luminate/graphql-utils'
import {Resolvers, Region, Farm} from '../types'

export const typeDefs = gql`
  type Region {
    id: ID!
    name: String
    country: Country
    farms: [Farm]
    createdAt: String
    updatedAt: String
  }

  type RegionConnection {
    pageInfo: PageInfo!
    edges: [RegionEdge!]!
  }

  type RegionEdge {
    cursor: String
    node: Region
  }

  input CreateRegionInput {
    name: String
    country: ID
  }

  input UpdateRegionInput {
    name: String
    country: ID
  }

  extend type Query {
    listRegions(cursor: String, limit: Int, query: [QueryInput]): RegionConnection!
    getRegion(id: ID!): Region
  }

  extend type Mutation {
    createRegion(input: CreateRegionInput!): Region
    updateRegion(id: ID!, input: UpdateRegionInput!): Region
    deleteRegion(id: ID!): Region
  }
`

export const resolvers: Resolvers = {
  Query: {
    listRegions: async (parent, args, {models}) => {
      const {Region} = models

      const results = await createConnectionResults({args, model: Region})
      return results
    },
    getRegion: async (parent, {id}, {loaders}, info) => {
      const {regions} = loaders
      return regions.load(id)
    },
  },
  Mutation: {
    createRegion: async (parent, {input}, {models}) => {
      const {Region} = models
      const region = await new Region(input).save()
      return region
    },
    updateRegion: async (parent, {id, input}, {models}) => {
      const {Region} = models
      const region = await Region.findByIdAndUpdate(id, input, {new: true})
      return region
    },
    deleteRegion: async (parent, {id}, {models}) => {
      const {Region} = models
      const region = await Region.findByIdAndDelete(id)
      return region
    },
  },
  Region: {
    country: async (parent, args, {loaders}) => {
      const {countries} = loaders
      return countries.load(parent.country)
    },
    farms: async (parent, args, {loaders}) => {
      const {farmsOfRegion} = loaders
      return farmsOfRegion.load(parent.id)
    },
  },
}

export interface RegionLoaders {
  regions: LoaderFn<Region>
  farmsOfRegion: LoaderFn<Farm[]>
}

export const loaders: RegionLoaders = {
  regions: async (ids, models) => {
    const {Region} = models
    const regions = await Region.find({_id: ids})
    return ids.map(id => {
      return regions.find((region: any) => region._id.toString() === id.toString())
    })
  },
  farmsOfRegion: async (ids, models) => {
    const {Farm} = models
    const farms = await Farm.find({region: ids})
    return ids.map(id => {
      return farms.filter((farm: any) => farm.region.toString() === id.toString())
    })
  },
}