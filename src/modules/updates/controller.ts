import { AppUpdateTable } from '../../db/schemas/appUpdateSchema';
import { db } from '../../db/schemas';

export const getAppUpdates = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(AppUpdateTable);
    //@ts-ignore
    return res.status(200).json({ ...data[0] });
  } catch (error) {
    console.error(error);
    //@ts-ignore
    return res.status(500).json({ error: 'Failed to get updates' });
  }
};
