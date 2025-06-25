// @ts-nocheck
import authRouters from '../../modules/auth/route';
import booksRouters from '../../modules/books/route';
import audioRouters from '../../modules/audio/route';
import videoRouters from '../../modules/videos/route';
import uploadRouters from '../../modules/upload/route';
import updateRouters from '../../modules/updates/route';

export const setupRoutes = (app) => {
  app.use('/auth', authRouters);
  app.use('/books', booksRouters);
  app.use('/audio', audioRouters);
  app.use('/video', videoRouters);
  app.use('/file', uploadRouters);
  app.use('/updates', updateRouters);
  //   app.use("/profile", profileRouters);
  //   app.use("/rfq", rfqRouters);
};
