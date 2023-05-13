import { Job } from "../models/job.js"

const index = async (req, res) => {
  try {
    const jobs = await Job.find({_id : req.user._id})
      .sort({ createdAt: 'desc' })
    res.status(200).json(jobs)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    req.body.applicant = req.user.profile
    const job = await Job.create(req.body)
    res.status(201).json(job)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndRemove(req.params.jobId)
    res.status(200).json(deletedJob)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.jobId, 
      req.body, 
      { new: true }
    )
    res.status(200).json(updatedJob)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const createNote = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
    job.notes.unshift(req.body)
    await job.save()
    res.status(201).json(job)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteNote = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
    job.notes.id(req.params.noteId).deleteOne()
    await job.save()
    res.status(200).json(job)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  index,
  create,
  deleteJob as delete,
  update,
  createNote,
  deleteNote
}