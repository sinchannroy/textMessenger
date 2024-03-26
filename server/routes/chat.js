import express from 'express';
import { Auth } from '../middleware/Auth.js';
import { accessChats } from '../controllers/accessChats.js';
import { fetchAllChats } from '../controllers/fetchAllChats.js';
import { createGroup } from '../controllers/createGroup.js';
import { renameGroup } from '../controllers/renameGroup.js';
import { removeFromGroup } from '../controllers/removeFromGroup.js';
import { addToGroup } from '../controllers/addToGroup.js';

const router = express.Router();

router.post('/', Auth, accessChats);
router.get('/', Auth, fetchAllChats);
router.post('/group', Auth, createGroup);
router.patch('/group/rename', Auth, renameGroup);
router.patch('/groupAdd', Auth, addToGroup);
router.patch('/api/chat/groupRemove', Auth, removeFromGroup);
router.delete('/removeuser', Auth);

export default router;