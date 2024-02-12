import express from "express"
const router = express.Router()
import { getUserController, postUserController, putUserController, patchUserController, deleteUserController, getDetailUserController } from "../controllers/user.controller.js"

router.get('/', getUserController)
router.get('/:id', getDetailUserController)
router.post('/', postUserController)
router.put('/:id', putUserController)
router.patch('/:id', patchUserController)
router.delete('/:id', deleteUserController)

export default router