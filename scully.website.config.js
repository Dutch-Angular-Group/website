"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("@dutchangulargroup/scully-plugin-meetup");
var scully_1 = require("@scullyio/scully");
var scully_plugin_critical_css_1 = require("@scullyio/scully-plugin-critical-css");
var scully_plugin_minify_html_1 = require("scully-plugin-minify-html");
var scully_plugin_google_analytics_1 = require("@scullyio/scully-plugin-google-analytics");
var defaultPostRenderers = [scully_plugin_critical_css_1.criticalCSS, 'seoHrefOptimise', scully_plugin_minify_html_1.MinifyHtml];
// Configurations
// Markdown
scully_1.setPluginConfig('md', {});
//MinifyHtml
var minifyHtmlOptions = {
    minifyOptions: {
        removeComments: false,
    },
};
scully_1.setPluginConfig(scully_plugin_minify_html_1.MinifyHtml, 'render', minifyHtmlOptions);
//Google
// if (prod) {
scully_1.setPluginConfig(scully_plugin_google_analytics_1.GoogleAnalytics, { globalSiteTag: 'G-ELV3JE2NHF' });
// defaultPostRenderers.push(GoogleAnalytics);
// }
//ScullyConfig
exports.config = {
    projectRoot: './apps/website/src',
    projectName: 'website',
    outDir: './dist/static',
    defaultPostRenderers: defaultPostRenderers,
    routes: {
        '/talks/:talkid': {
            type: 'meetup',
            talkid: {
                url: 'https://api.meetup.com/Dutch-Angular-Group/events?page=100&status=past,upcoming',
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
