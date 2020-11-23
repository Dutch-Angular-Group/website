import { httpGetJson, registerPlugin, routeSplit } from '@scullyio/scully';
import { RouteConfig } from '@scullyio/scully/lib/routerPlugins';

const MEETUP_URI = (group, status, amount) =>
  `https://api.meetup.com/${group}/events?page=${amount}&status=${status}`;

export const meetupPlugin = async (route: string, config: RouteConfig) => {
  const parts = route.split('/');
  /** we just only handle the first param **/
  const param = parts
    .filter((p) => p.startsWith(':'))
    .map((id) => id.slice(1))[0];
  const url = MEETUP_URI(config[param].name, config[param].status, config[param].amount).trim();
  const list = (await httpGetJson(url)) as any[];
  const { createPath } = routeSplit(route);
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

  return handledRoutes.sort(config[param].sorting);
};

registerPlugin('router', 'meetup', meetupPlugin);
