import dotenv from 'dotenv';
dotenv.config();

const startApp = async () => {
  const { default: App } = await import('./app.js');
  const app = new App();
  app.listen();
};

startApp();
