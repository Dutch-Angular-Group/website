import '@dutchangulargroup/scully-plugin-meetup';
import {
  getMyConfig,
  registerPlugin,
  ScullyConfig,
  setPluginConfig,
} from '@scullyio/scully';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
import { MinifyHtml } from 'scully-plugin-minify-html';

export const GoogleAnalytics = 'googleAnalytics';
registerPlugin('render', GoogleAnalytics, googleAnalyticsPlugin);
const defaultPostRenderers = [criticalCSS, 'seoHrefOptimise', MinifyHtml,GoogleAnalytics];

// Configurations

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
        url:
          'https://api.meetup.com/Dutch-Angular-Group/events?page=100&status=past,upcoming',
        property: 'id',
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
<!-- Google Analytics -->
  <script sk>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', '${siteTag}', 'auto');
  ga('send', 'pageview');
  </script>
  <script sk async src='https://www.google-analytics.com/analytics.js'></script>
  <!-- End Google Analytics -->
`;

  return html.replace(/<\/head/i, `${googleAnalyticsScript}</head`);
}
