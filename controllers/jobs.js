import { Job } from "../models/job.js"

const index = async (req, res) => {
  try {
    const jobs = await Job.find({})
    res.status(200).json(jobs)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteJob = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const createNote = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteNote = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  index,
  show,
  create,
  deleteJob as delete,
  update,
  createNote,
  deleteNote
}