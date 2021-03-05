import { httpGetJson, registerPlugin, routeSplit } from '@scullyio/scully';
import { RouteConfig } from '@scullyio/scully/src/lib/routerPlugins';

const MEETUP_URI = (group, status, amount) =>
  `https://api.meetup.com/${group}/events?page=${amount}&status=${status}`;

const defaultConfig = {
  amount: 100,
  status: `past,upcoming`,
  sorting: (a, b) => (a.date < b.date ? 1 : -1),
};
export const meetupPlugin = async (route: string, routeConfig: RouteConfig) => {
  const { createPath, params } = routeSplit(route);
  const param = params[0].part;
  const config = { ...defaultConfig, ...routeConfig[param] };
  const url = MEETUP_URI(config.name, config.status, config.amount).trim();
  const list = (await httpGetJson(url)) as any[];

  const handledRoutes = [];
  for (let item of list) {
    handledRoutes.push({
      route: createPath(item.id),
      data: {
        title: item.name,
        date: new Date(item.time),
        status: item.status,
        yes_rsvp_count: item.yes_rsvp_count,
        is_online_event: item.is_online_event,
        local_time: item.local_time,
        link: item.link,
      },
    });
  }

  return handledRoutes.sort(routeConfig[param].sorting);
};

registerPlugin('router', 'meetup', meetupPlugin);
