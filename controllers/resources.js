import { Profile } from "../models/profile.js"
import { Resource } from "../models/resource.js"

const index = async (req, res) => {
  try {
    const resources = await Resource.find({})
      .populate("reviews.author")
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
      .populate('reviews.author')
    resource.reviews.unshift(req.body)
    await resource.save()

    let sum = 0
    resource.reviews.forEach(review => {
      sum += review.rating
    })
    resource.averageRating = sum / resource.reviews.length
    await resource.save()
    
    const newReview = resource.reviews[0]
    const profile = await Profile.findById(req.user.profile)
    newReview.author = profile

    res.status(201).json(resource)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteReview = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.resourceId)
      .populate('reviews.author')
    resource.reviews.remove(req.params.reviewId)
    await resource.save()

    if (resource.reviews.length === 0) {
      resource.averageRating = null
    } else {
      let sum = 0
      resource.reviews.forEach(review => {
        sum += review.rating
      })
      resource.averageRating = sum / resource.reviews.length
    }
    await resource.save()

    res.status(200).json(resource)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const updateReview = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.resourceId)
      .populate('reviews.author')
    const review = resource.reviews.id(req.params.reviewId)
    review.content = req.body.content
    review.rating = req.body.rating
    await resource.save()

    let sum = 0
    resource.reviews.forEach(review => {
      sum += review.rating
    })
    resource.averageRating = sum / resource.reviews.length
    await resource.save()

    res.status(201).json(resource)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const addStarredResource = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId)
    const starredResource = await Resource.findById(req.params.resourceId)
    profile.starredResources.push(starredResource)
    await profile.save()
    res.status(201).json(starredResource)
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteStarredResource = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId)
    const unstarredResource = await Resource.findById(req.params.resourceId)
    profile.starredResources.remove(unstarredResource)
    await profile.save()
    res.status(201).json(unstarredResource)
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  index,
  create,
  deleteResource as delete,
  update,
  createReview,
  deleteReview,
  updateReview,
  addStarredResource,
  deleteStarredResource,
}