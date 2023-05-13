import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    content: { 
      type: String, 
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  { timestamps: true }
)

const resourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Networking', 'Interviewing', 'Job Search', 'Resumes', 'Other']
  },
  owner: {  
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  reviews: {
    type: [reviewSchema]
  },
  averageRating: {
    type: Number,
    min: 1,
    max: 5,
  },
},{
  timestamps: true,
})

const Resource = mongoose.model('Resource', resourceSchema)

export { Resource }