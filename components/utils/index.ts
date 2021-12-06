import * as tools from './tools';
import * as axios from './request';
import { EventBus } from './event-bus';

export const Utils = {
  ...tools,
  ...axios,
  EventBus
};
