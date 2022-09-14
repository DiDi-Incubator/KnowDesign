import Pagination from 'rc-pagination/lib/locale/lv_LV';
import DatePicker from '../../basic/date-picker/locale/lv_LV';
import TimePicker from '../../basic/time-picker/locale/lv_LV';
import Calendar from '../../basic/calendar/locale/lv_LV';
import { Locale } from '../../locale-provider/antd-locale-provider';

const localeValues: Locale = {
  locale: 'lv',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrēšanas izvēlne',
    filterConfirm: 'OK',
    filterReset: 'Atiestatīt',
    selectAll: 'Atlasiet pašreizējo lapu',
    selectInvert: 'Pārvērst pašreizējo lapu',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Atcelt',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Atcelt',
  },
  Transfer: {
    searchPlaceholder: 'Meklēt šeit',
    itemUnit: 'vienumu',
    itemsUnit: 'vienumus',
  },
  Upload: {
    uploading: 'Augšupielāde...',
    removeFile: 'Noņemt failu',
    uploadError: 'Augšupielādes kļūda',
    previewFile: 'Priekšskatiet failu',
    downloadFile: 'Lejupielādēt failu',
  },
  Empty: {
    description: 'Nav datu',
  },
};

export default localeValues;
