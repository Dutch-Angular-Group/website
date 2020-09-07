import { httpGetJson, registerPlugin, routeSplit } from '@scullyio/scully';

export const meetupPlugin = async (route, config) => {
  console.log(config);
  const url = config['talkid'].url.trim();
  const list = (await httpGetJson(url)) as any[];
  const { createPath } = routeSplit(route);
  const handledRoutes = [];
  for (let item of list) {
    console.log(item);
    handledRoutes.push({
      route: createPath(item.id),
      data: { title: item.name, date: new Date(item.time), status: item.status },
    });
  }
  return handledRoutes.sort((a, b) => (a.date < b.date ? 1 : -1));
};

const validator = async (config) => [];
registerPlugin('router', 'meetup', meetupPlugin, validator);
