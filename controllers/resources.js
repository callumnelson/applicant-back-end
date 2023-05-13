import { Resource } from "../models/resource.js"

const index = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

const show = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const resource = await Resource.create(req.body)
    res.status(201).json(resource)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteResource = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

const update = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

const createReview = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

const deleteReview = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

const updateReview = async (req, res) => {
  try {
    
  } catch (err) {
    
  }
}

export {
  index,
  show,
  create,
  deleteResource as delete,
  update,
  createReview,
  deleteReview,
  updateReview
}