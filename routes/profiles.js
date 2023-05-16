import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:profileId', checkAuth, profilesCtrl.show)
router.post('/:profileId/resume', checkAuth, profilesCtrl.createResume)
router.post('/:profileId/brand', checkAuth, profilesCtrl.createBrandStatement)
router.post('/:profileId/starredResources', checkAuth, profilesCtrl.addStarredResource)
router.delete('/:profileId', checkAuth, profilesCtrl.delete)
router.delete('/:profileId/starredResources/:resourceId', checkAuth, profilesCtrl.removeStarredResource)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)


export { router }
