import { Profile } from "../models/profile.js"
import { Resource } from "../models/resource.js"

const index = async (req, res) => {
  try {
    const resources = await Resource.find({})
      .sort({ createdAt: 'desc' })
    res.status(200).json(resources)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
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
    const resource = await Resource.findByIdAndDelete(req.params.resourceId)
    res.status(200).json(resource)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.resourceId,
      req.body,
      { new: true }
    )
    res.status(200).json(resource)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const createReview = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const resource = await Resource.findById(req.params.resourceId)
    resource.reviews.push(req.body)
    await resource.save()
    
    const newReview = resource.reviews[resource.reviews.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newReview.author = profile

    res.status(201).json(newReview)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
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
  create,
  deleteResource as delete,
  update,
  createReview,
  deleteReview,
  updateReview
}