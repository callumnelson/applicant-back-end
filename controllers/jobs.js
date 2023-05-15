import { Job } from "../models/job.js"
import { Profile } from "../models/profile.js"

const index = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
      .populate('applications')
    res.status(200).json(profile.applications)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
    req.body.applicant = req.user.profile
    const job = await Job.create(req.body)
    profile.applications.push(job._id)
    await profile.save()
    res.status(201).json(job)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteJob = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
    const deletedJob = await Job.findByIdAndRemove(req.params.jobId)
    profile.applications.remove(deletedJob._id)
    await profile.save()
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