import '@dutchangulargroup/scully-plugin-meetup';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';


setPluginConfig('md', {});
export const config: ScullyConfig = {
  projectRoot: './apps/website/src',
  projectName: 'website',
  outDir: './dist/static',
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
