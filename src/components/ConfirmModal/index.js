import { jsx as _jsx } from "react/jsx-runtime";
import { Modal, Button } from "antd";
const ConfirmModal = ({ visible, title, content, onConfirm, onCancel, confirmText = "Xác nhận", cancelText = "Hủy", confirmLoading = false, }) => {
    return (_jsx(Modal, { visible: visible, title: title, onCancel: onCancel, footer: [
            _jsx(Button, { onClick: onCancel, children: cancelText }, "cancel"),
            _jsx(Button, { type: "primary", danger: true, loading: confirmLoading, onClick: onConfirm, children: confirmText }, "confirm"),
        ], children: _jsx("p", { children: content }) }));
};
export default ConfirmModal;
