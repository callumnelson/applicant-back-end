import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
import { Job } from '../models/job.js'
import { v2 as cloudinary } from 'cloudinary'
import { Resource } from '../models/resource.js'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
    .populate('applications')
    .populate('starredResources')
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createResume(req, res) {
  try {
    const resume = req.body
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId, 
      req.body, 
      { new: true }
    )
    res.status(200).json(resume)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createBrandStatement(req, res) {
  try {
    const brand = req.body
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId, 
      req.body, 
      { new: true }
    )
    res.status(200).json(brand)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteProfile(req, res) {
  try {
    const requestProfile = await Profile.findById(req.user.profile)
    if (requestProfile.role > 200){
      const profileToDelete = await Profile.findById(req.params.profileId)
      const user = await User.findOne({profile : req.params.profileId})
      const jobs = await Job.deleteMany({_id : {$in: profileToDelete.applications}})
      const resourcesOwned = await Resource.deleteMany({owner: profileToDelete._id})
      const remainingResources = await Resource.find({})
      await Promise.all(
        remainingResources.map(async resource => {
          await Promise.all(resource.reviews.map(async review => {
            if (review.author.equals(profileToDelete._id)){
              resource.reviews.remove(review._id)
              await resource.save()
            }
          }))
        })
      )
      //delete profile
      await profileToDelete.deleteOne()
      //delete user
      await user.deleteOne()
      res.status(200).json(profileToDelete)
    } else {
      throw new Error('Access Denied: Not an admin')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { 
  index, 
  addPhoto, 
  show,
  createResume,
  createBrandStatement,
  deleteProfile as delete,
}
