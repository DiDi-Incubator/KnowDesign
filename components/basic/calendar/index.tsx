import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generateCalendar, { CalendarProps } from './generateCalendar';

const Calendar = generateCalendar<Moment>(momentGenerateConfig);

export type { CalendarProps };
export default Calendar;
