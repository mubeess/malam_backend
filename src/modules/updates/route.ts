import { Router } from 'express';
import { getAppUpdates } from './controller';

const router = Router();

router.get('/', async (req, res) => {
  try {
    //@ts-ignore
    await getAppUpdates(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
