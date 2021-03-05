import { theVaultReady } from '@herodevs/scully-plugin-the-vault';
import {
  getMyConfig,
  prod,
  registerPlugin,
  ScullyConfig,
  setPluginConfig
} from '@scullyio/scully';
import 'scully-plugin-meetup';

// Configurations
export const GoogleAnalytics = 'googleAnalytics';
registerPlugin('render', GoogleAnalytics, googleAnalyticsPlugin);

const prodPostRenders = ['seoHrefOptimise', GoogleAnalytics];
const defaultPostRenderers = prod ? [...prodPostRenders] : [];

// Markdown
setPluginConfig('md', {});

//MinifyHtml
// const minifyHtmlOptions = {
//   minifyOptions: {
//     removeComments: false,
//   },
// };

// should be enabled when issue is resolved.
// import { MinifyHtml } from 'scully-plugin-minify-html';
// setPluginConfig(MinifyHtml, 'render', minifyHtmlOptions);

//Googleanalytics
setPluginConfig(GoogleAnalytics, { globalSiteTag: 'G-S66QSVVTFS' });

//ScullyConfig
export const config: Promise<ScullyConfig> = createConfig();

async function createConfig(): Promise<ScullyConfig> {
  await theVaultReady({
    customerId: 99,
    customerKey: process.env.customerKey,
    projectId: 1,
  });

  return {
    projectRoot: './apps/website/src',
    projectName: 'website',
    outDir: './dist/static',
    defaultPostRenderers,
    routes: {
      '/talks/:talkid': {
        type: 'meetup',
        talkid: {
          name: 'Dutch-Angular-Group',
          property: 'id',
          amount: 100,
          status: `past,upcoming`,
          sorting: (a, b) => (a.date < b.date ? 1 : -1),
        },
      },
      '/docs/:slug': {
        type: 'contentFolder',
        slug: {
          folder: './docs',
        },
      },
    },
  };
}

async function googleAnalyticsPlugin(html: string): Promise<string> {
  const googleAnalyticsConfig = getMyConfig(googleAnalyticsPlugin);

  if (!googleAnalyticsConfig) {
    throw new Error('googleAnalytics plugin missing Global Site Tag');
  }
  const siteTag: string = googleAnalyticsConfig['globalSiteTag'];

  const googleAnalyticsScript = `
  <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${siteTag}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${siteTag}');
</script>
`;

  return html.replace(/<\/head/i, `${googleAnalyticsScript}</head`);
}
