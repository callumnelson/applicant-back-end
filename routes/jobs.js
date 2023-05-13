import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as jobsCtrl from '../controllers/jobs.js'

const router = Router()

// ALL ROUTES HIT localhost:3001/api/jobs

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, jobsCtrl.index)
router.post('/', checkAuth, jobsCtrl.create)
router.post('/:jobId/notes', checkAuth, jobsCtrl.createNote)
router.delete('/:jobId', checkAuth, jobsCtrl.delete)
router.delete('/:jobId/notes/:noteId', checkAuth, jobsCtrl.deleteNote)
router.put('/:jobId', checkAuth, jobsCtrl.update)

export { router }
