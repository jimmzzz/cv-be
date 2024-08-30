import express from 'express';
import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import HelloWorld from './components/HelloWorld.vue';
import puppeteer from 'puppeteer';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/status', async (req, res) => {
    res.send('status!!')
});

app.get('/generate', async (req, res) => {
  // Create a Vue instance with the component and its props
  const vueApp = createSSRApp({
    render: () => h(HelloWorld, { name: 'Server-side rendering with Vue 3 and TypeScript!' })
  });

  try {
    // Render the Vue app to a string
    const App = await renderToString(vueApp);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My resume</title>
          <style>
          </style>
        </head>
        <body>
          <div id="app">${App}</div>
        </body>
      </html>
      `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
    res.send(pdfBuffer);

    // Send the rendered HTML back to the client
    // res.send(`
    //   <!DOCTYPE html>
    //   <html lang="en">
    //     <head>
    //       <meta charset="UTF-8">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>Vue 3 SSR with TypeScript</title>
    //     </head>
    //     <body>
    //       <div id="app">${html}</div>
    //     </body>
    //   </html>
    // `);
  } catch (error) {
    console.error('Error during rendering:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', async (req, res) => {
    res.send('Working')
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
