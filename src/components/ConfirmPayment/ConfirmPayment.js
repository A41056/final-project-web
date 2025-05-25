import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { orderApi } from "@/config/api";
import { useCartStore } from "@/stores/cartStore";
const ConfirmPayment = () => {
    const navigate = useNavigate();
    const clearCart = useCartStore((state) => state.clearCart);
    const { data, isLoading, error } = orderApi.useGet(`/confirm-payment${window.location.search}`);
    useEffect(() => {
        if (data) {
            const { rspCode, Message } = data;
            console.log(`RSP Code: ${rspCode}`);
            if (rspCode === "00") {
                message.success("Thanh toán thành công! Đơn hàng của bạn đã được xác nhận.");
                clearCart();
                setTimeout(() => navigate("/"), 2000);
            }
            else {
                message.error(`Thanh toán thất bại: ${Message}`);
                setTimeout(() => navigate("/cart"), 2000);
            }
        }
        if (error) {
            message.error("Đã xảy ra lỗi khi xác nhận thanh toán.");
            console.error("Confirm payment error:", error);
            setTimeout(() => navigate("/cart"), 2000);
        }
    }, [data, error, navigate, clearCart]);
    return (_jsx("div", { className: "container-detail flex flex-col items-center justify-center px-4 md:px-24 py-4 gap-2 min-h-[300px]", children: isLoading ? (_jsx(Spin, { tip: "\u0110ang x\u00E1c nh\u1EADn thanh to\u00E1n..." })) : (_jsx("h2", { className: "text-xl md:text-2xl font-bold", children: "\u0110ang x\u1EED l\u00FD thanh to\u00E1n..." })) }));
};
export default ConfirmPayment;
