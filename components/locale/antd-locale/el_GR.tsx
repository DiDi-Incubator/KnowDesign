import Pagination from 'rc-pagination/lib/locale/el_GR';
import DatePicker from '../../basic/date-picker/locale/el_GR';
import TimePicker from '../../basic/time-picker/locale/el_GR';
import Calendar from '../../basic/calendar/locale/el_GR';
import { Locale } from '../../locale-provider/antd-locale-provider';

const localeValues: Locale = {
  locale: 'el',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Μενού φίλτρων',
    filterConfirm: 'ΟΚ',
    filterReset: 'Επαναφορά',
    selectAll: 'Επιλογή τρέχουσας σελίδας',
    selectInvert: 'Αντιστροφή τρέχουσας σελίδας',
  },
  Modal: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο',
    justOkText: 'ΟΚ',
  },
  Popconfirm: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο',
  },
  Transfer: {
    searchPlaceholder: 'Αναζήτηση',
    itemUnit: 'αντικείμενο',
    itemsUnit: 'αντικείμενα',
  },
  Upload: {
    uploading: 'Μεταφόρτωση...',
    removeFile: 'Αφαίρεση αρχείου',
    uploadError: 'Σφάλμα μεταφόρτωσης',
    previewFile: 'Προεπισκόπηση αρχείου',
    downloadFile: 'Λήψη αρχείου',
  },
  Empty: {
    description: 'Δεν υπάρχουν δεδομένα',
  },
};

export default localeValues;
