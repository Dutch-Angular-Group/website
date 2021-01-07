import {
  findPlugin,
  getMyConfig,
  HandledRoute,
  log,
  prod,
  registerPlugin,
  ScullyConfig,
  setPluginConfig,
  yellow
} from '@scullyio/scully';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';
import { scullySystem } from '@scullyio/scully/lib/pluginManagement/pluginRepository';
import { puppeteerRender } from '@scullyio/scully/lib/renderPlugins/puppeteerRenderPlugin';
import 'scully-plugin-meetup';
import { MinifyHtml } from 'scully-plugin-minify-html';




// Configurations
export const GoogleAnalytics = 'googleAnalytics';
registerPlugin('render', GoogleAnalytics, googleAnalyticsPlugin);

const prodPostRenders = ['seoHrefOptimise', MinifyHtml, GoogleAnalytics];
const defaultPostRenderers = prod
  ? [...prodPostRenders]
  : [];

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
      preRenderer: (h: HandledRoute) => {
        h.renderPlugin = renderOnce;
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

//libs/scully/src/lib/renderPlugins/puppeteerRenderPlugin.ts
export const renderOnce = Symbol('renderOnce');
const render = findPlugin(puppeteerRender);
const cache = new Map<any, Promise<string>>();

registerPlugin(scullySystem, renderOnce, (route: any, config) => {
  if (!cache.has(config)) {
    cache.set(config, render(route, config));
  }
  log(`Cache used for "${yellow(route.route)}"`)
  return cache.get(config);
});
