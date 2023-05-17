import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
import { Job } from '../models/job.js'
import { v2 as cloudinary } from 'cloudinary'

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
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId, 
      req.body, 
      { new: true }
    )
    res.status(200).json(updatedProfile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createBrandStatement(req, res) {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId, 
      req.body, 
      { new: true }
    )
    console.log('updated brand profile', updatedProfile)
    res.status(200).json(updatedProfile)
    console.log('new brand')
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteProfile(req, res) {
  try {
    const requestProfile = await Profile.findById(req.user.profile)
    if (requestProfile.role > 200){
      const profile = await Profile.findById(req.params.profileId)
      const user = await User.findOne({profile : req.params.profileId})
      console.log(profile)
      console.log(user)
      const jobs = await Job.deleteMany({_id : {$in: profile.applications}})
      //delete profile
      await profile.deleteOne()
      //delete user
      await user.deleteOne()
      res.status(200).json(profile)
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
