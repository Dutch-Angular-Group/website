import '@dutchangulargroup/scully-plugin-meetup';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
import { MinifyHtml } from 'scully-plugin-minify-html';
import { GoogleAnalytics, googleAnalyticsPlugin } from '@scullyio/scully-plugin-google-analytics';

const defaultPostRenderers = [criticalCSS, 'seoHrefOptimise', MinifyHtml];

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

//Google
// if (prod) {
  setPluginConfig(GoogleAnalytics, { globalSiteTag: 'G-ELV3JE2NHF' });

  // defaultPostRenderers.push(GoogleAnalytics);
// }

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
