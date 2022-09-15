import Pagination from 'rc-pagination/lib/locale/pt_PT';
import DatePicker from '../../basic/date-picker/locale/pt_PT';
import TimePicker from '../../basic/time-picker/locale/pt_PT';
import Calendar from '../../basic/calendar/locale/pt_PT';
import { Locale } from '../../locale-provider/antd-locale-provider';

const localeValues: Locale = {
  locale: 'pt',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtro',
    filterConfirm: 'Aplicar',
    filterReset: 'Reiniciar',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter seleção',
    sortTitle: 'Ordenação',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancelar',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancelar',
  },
  Transfer: {
    searchPlaceholder: 'Procurar...',
    itemUnit: 'item',
    itemsUnit: 'itens',
  },
  Upload: {
    uploading: 'A carregar...',
    removeFile: 'Remover',
    uploadError: 'Erro ao carregar',
    previewFile: 'Pré-visualizar',
    downloadFile: 'Baixar',
  },
  Empty: {
    description: 'Sem resultados',
  },
};

export default localeValues;
