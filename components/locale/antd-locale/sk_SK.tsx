import Pagination from 'rc-pagination/lib/locale/sk_SK';
import DatePicker from '../../basic/date-picker/locale/sk_SK';
import TimePicker from '../../basic/time-picker/locale/sk_SK';
import Calendar from '../../basic/calendar/locale/sk_SK';
import { Locale } from '../../locale-provider/antd-locale-provider';

const localeValues: Locale = {
  locale: 'sk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Prosím vyberte',
  },
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'OK',
    filterReset: 'Obnoviť',
    selectAll: 'Vybrať všetko',
    selectInvert: 'Vybrať opačné',
    sortTitle: 'Zoradiť',
    expand: 'Rozbaliť riadok',
    collapse: 'Zbaliť riadok',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Zrušiť',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Zrušiť',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Vyhľadávanie',
    itemUnit: 'položka',
    itemsUnit: 'položiek',
  },
  Upload: {
    uploading: 'Nahrávanie...',
    removeFile: 'Odstrániť súbor',
    uploadError: 'Chyba pri nahrávaní',
    previewFile: 'Zobraziť súbor',
    downloadFile: 'Stiahnuť súbor',
  },
  Empty: {
    description: 'Žiadne dáta',
  },
  Icon: {
    icon: 'ikona',
  },
  Text: {
    edit: 'Upraviť',
    copy: 'Kopírovať',
    copied: 'Skopírované',
    expand: 'Zväčšiť',
  },
  PageHeader: {
    back: 'Späť',
  },
};

export default localeValues;
