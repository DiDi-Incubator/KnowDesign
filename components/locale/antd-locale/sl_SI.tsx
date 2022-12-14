import Pagination from 'rc-pagination/lib/locale/sl_SI';
import DatePicker from '../../basic/date-picker/locale/sl_SI';
import TimePicker from '../../basic/time-picker/locale/sl_SI';
import Calendar from '../../basic/calendar/locale/sl_SI';
import { Locale } from '../../locale-provider/antd-locale-provider';

const localeValues: Locale = {
  locale: 'sl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'Filtriraj',
    filterReset: 'Pobriši filter',
    selectAll: 'Izberi vse na trenutni strani',
    selectInvert: 'Obrni izbor na trenutni strani',
  },
  Modal: {
    okText: 'V redu',
    cancelText: 'Prekliči',
    justOkText: 'V redu',
  },
  Popconfirm: {
    okText: 'v redu',
    cancelText: 'Prekliči',
  },
  Transfer: {
    searchPlaceholder: 'Išči tukaj',
    itemUnit: 'Objekt',
    itemsUnit: 'Objektov',
  },
  Upload: {
    uploading: 'Nalaganje...',
    removeFile: 'Odstrani datoteko',
    uploadError: 'Napaka pri nalaganju',
    previewFile: 'Predogled datoteke',
    downloadFile: 'Prenos datoteke',
  },
  Empty: {
    description: 'Ni podatkov',
  },
};

export default localeValues;
