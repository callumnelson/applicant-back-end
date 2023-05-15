import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }],
  role: {
    type: Number,
    required: true,
    default: 100,
  },
  starredResources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  baseResume: {
    type: String
  },
  brandStatement: {
    type: String
  }
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
