import * as tools from './tools';
import * as axios from './request';
import { EventBus } from './event-bus';

export default {
  ...tools,
  ...axios,
  EventBus,
};
