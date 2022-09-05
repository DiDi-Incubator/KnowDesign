import Pagination from 'rc-pagination/lib/locale/da_DK';
import DatePicker from '../../basic/date-picker/locale/da_DK';
import TimePicker from '../../basic/time-picker/locale/da_DK';
import Calendar from '../../basic/calendar/locale/da_DK';
import { Locale } from '../../locale-provider/antd-locale-provider';

const localeValues: Locale = {
  locale: 'da',
  DatePicker,
  TimePicker,
  Calendar,
  Pagination,
  Table: {
    filterTitle: 'Filtermenu',
    filterConfirm: 'OK',
    filterReset: 'Nulstil',
    filterEmptyText: 'Ingen filtre',
    emptyText: 'Ingen data',
    selectAll: 'Vælg alle',
    selectNone: 'Ryd alt data',
    selectInvert: 'Invertér valg',
    selectionAll: 'Vælg alt data',
    sortTitle: 'Sortér',
    expand: 'Udvid række',
    collapse: 'Flet række',
    triggerDesc: 'Klik for at sortere faldende',
    triggerAsc: 'Klik for at sortere stigende',
    cancelSort: 'Klik for at annullere sortering',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Afbryd',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Afbryd',
  },
  Transfer: {
    searchPlaceholder: 'Søg her',
    itemUnit: 'element',
    itemsUnit: 'elementer',
  },
  Upload: {
    uploading: 'Uploader...',
    removeFile: 'Fjern fil',
    uploadError: 'Fejl ved upload',
    previewFile: 'Forhåndsvisning',
    downloadFile: 'Download fil',
  },
  Empty: {
    description: 'Ingen data',
  },
};

export default localeValues;
