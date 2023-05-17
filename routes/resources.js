import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as resourcesCtrl from '../controllers/resources.js'

const router = Router()

// ALL ROUTES HIT localhost:3001/api/resources

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, resourcesCtrl.index)
router.post('/', checkAuth, resourcesCtrl.create)
router.post('/:resourceId/reviews', checkAuth, resourcesCtrl.createReview)
router.post('/:resourceId/starredResources/:profileId', checkAuth, resourcesCtrl.addStarredResource)
router.delete('/:resourceId', checkAuth, resourcesCtrl.delete)
router.delete('/:resourceId/reviews/:reviewId', checkAuth, resourcesCtrl.deleteReview)
router.delete('/:resourceId/starredResources/:profileId', checkAuth, resourcesCtrl.deleteStarredResource)
router.put('/:resourceId', checkAuth, resourcesCtrl.update)
router.put('/:resourceId/reviews/:reviewId', checkAuth, resourcesCtrl.updateReview)

export { router }
