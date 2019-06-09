import phoneNumberRoutes from './phoneNumbers';

const apiPrefix = '/api/v1';
const routes = (app) => {
  app.use(apiPrefix, phoneNumberRoutes);
  app.use('*', (_, res) => res.status(404).json({
    success: false,
    error: 'This routes does not exist'
  }));
  return app;
};

export default routes;
