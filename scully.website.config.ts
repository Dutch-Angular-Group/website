import '@dutchangulargroup/scully-plugin-meetup';
import {
  getMyConfig,



  prod, registerPlugin,
  ScullyConfig,
  setPluginConfig
} from '@scullyio/scully';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
import { MinifyHtml } from 'scully-plugin-minify-html';

// Configurations
export const GoogleAnalytics = 'googleAnalytics';
registerPlugin('render', GoogleAnalytics, googleAnalyticsPlugin);

const prodPostRenders = ['seoHrefOptimise', MinifyHtml, GoogleAnalytics];
const defaultPostRenderers = prod
  ? [...prodPostRenders, criticalCSS]
  : [criticalCSS];

// Markdown
setPluginConfig('md', {});

//MinifyHtml
const minifyHtmlOptions = {
  minifyOptions: {
    removeComments: false,
  },
};

setPluginConfig(MinifyHtml, 'render', minifyHtmlOptions);

//Googleanalytics
setPluginConfig(GoogleAnalytics, { globalSiteTag: 'G-S66QSVVTFS' });

//ScullyConfig
export const config: ScullyConfig = {
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
