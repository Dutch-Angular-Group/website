import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import '@dutchangulargroup/scully-plugin-meetup';

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
  },
};
