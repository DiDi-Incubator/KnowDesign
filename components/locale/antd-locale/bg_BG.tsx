import Pagination from 'rc-pagination/lib/locale/bg_BG';
import DatePicker from '../../basic/date-picker/locale/bg_BG';
import TimePicker from '../../basic/time-picker/locale/bg_BG';
import Calendar from '../../basic/calendar/locale/bg_BG';
import { Locale } from '../../locale-provider/antd-locale-provider';

const localeValues: Locale = {
  locale: 'bg',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Филтриране',
    filterConfirm: 'Добре',
    filterReset: 'Нулриане',
    selectAll: 'Избор на текуща страница',
    selectInvert: 'Обръщане',
  },
  Modal: {
    okText: 'Добре',
    cancelText: 'Отказ',
    justOkText: 'Добре',
  },
  Popconfirm: {
    okText: 'Добре',
    cancelText: 'Отказ',
  },
  Transfer: {
    searchPlaceholder: 'Търсене',
    itemUnit: 'избор',
    itemsUnit: 'избори',
  },
  Upload: {
    uploading: 'Качване...',
    removeFile: 'Премахване',
    uploadError: 'Грешка при качването',
    previewFile: 'Преглед',
    downloadFile: 'Свали файл',
  },
  Empty: {
    description: 'Няма данни',
  },
};

export default localeValues;
