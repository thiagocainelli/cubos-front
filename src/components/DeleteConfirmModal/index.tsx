import React from "react";
import { Modal } from "antd";
import Button from "../Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Confirmar Exclusão",
  message = "Tem certeza que deseja deletar este item?",
  confirmText = "Deletar",
  cancelText = "Cancelar",
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onConfirm}
      onCancel={onClose}
      confirmLoading={loading}
      footer={null}
    >
      <p>{message}</p>
      <p className="text-sm text-gray-500 mt-2">
        Esta ação não pode ser desfeita.
      </p>

      <div className="flex gap-2 justify-end mt-4">
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
