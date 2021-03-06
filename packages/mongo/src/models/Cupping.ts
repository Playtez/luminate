import mongoose from 'mongoose'
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface CuppingDocument extends DocumentWithTimestamps {
  description: string
  coffees?: [CoffeeCuppingDocument]
}

export interface CoffeeCuppingDocument {
  sessionCoffeeId: string
  coffee: string
}

const Cupping = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    coffees: [
      {
        sessionCoffeeId: {
          type: String,
          required: true,
        },
        coffee: {
          type: mongoose.Types.ObjectId,
          ref: 'coffee',
          required: true,
        },
      },
    ],
  },
  {timestamps: true},
)

export default mongoose.model<CuppingDocument>('cupping', Cupping)
