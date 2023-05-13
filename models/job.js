import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Resume', 'Interview Qs', 'Skills', 'To-Do', 'Networking', 'General'],
      required: true
    },
    content: { 
      type: String, 
      required: true
    }
  },
  { timestamps: true }
)

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  jobListing: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  jobResume: {
    type: String,
  },
  jobCoverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['Interested', 'To Apply', 'Preparing Materials', 'Applied', 'Interview', 'Rejected', 'Offer']
  },
  priority: {
    type: String,
    enum: ['Dream Job', 'Great Option', 'Totally Fine', 'Will Pay Bills']
  },
  salary: {
    type: Number,
    min: 0,
  },
  contactName: {
    type: String
  },
  contactEmail: {
    type: String
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  notes: {
    type: [noteSchema]
  }
},{
  timestamps: true,
})

const Job = mongoose.model('Job', jobSchema)

export { Job }