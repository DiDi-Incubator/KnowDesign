import OriginModal, { ModalFuncProps } from './Modal';
import confirm, {
  withWarn,
  withInfo,
  withSuccess,
  withError,
  withConfirm,
  ModalStaticFunctions,
  modalGlobalConfig,
} from './confirm';
import useModal from './useModal';
import destroyFns from './destroyFns';

export { ModalProps, ModalFuncProps } from './Modal';

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
}

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    useModal: typeof useModal;
    destroyAll: () => void;
    config: typeof modalGlobalConfig;
  };

const Modal = OriginModal as ModalType;

Modal.useModal = useModal;

Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;

Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

Modal.config = modalGlobalConfig;

export default Modal;
