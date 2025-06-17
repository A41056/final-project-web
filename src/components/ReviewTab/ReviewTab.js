import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "react-query";
import { Form, InputNumber, Input, Modal, Button, Pagination } from "antd";
import ReviewCard from "@/components/ReviewCard";
import { reviewApi } from "@/config/api";
import { useAuthStore } from "@/stores/authStore";
import { OrderStatus } from "@/types/order";
import { icons } from "../../assets/icons";
const ReviewTab = ({ productId }) => {
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 6;
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [reviewForm] = Form.useForm();
    const userId = useAuthStore((state) => state.user?.id || "");
    const REVIEW_API_URL = import.meta.env.ORDER_API_URL || "http://localhost:6003";
    const { data: reviewsData, isLoading: isReviewsLoading } = reviewApi.useGetReviewsByProductId(productId, { pageIndex, pageSize });
    const { data: ordersData, isLoading: isOrdersLoading } = useQuery(["orders", userId], () => fetch(`${REVIEW_API_URL}/orders/customer/${userId}`, {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
    }).then((res) => res.json()), {
        enabled: !!userId,
    });
    const hasCompletedOrder = Array.isArray(ordersData?.orders) &&
        ordersData?.orders.some((order) => order.status === OrderStatus.Completed &&
            order.orderItems.some((item) => item.productId === productId));
    const createReviewMutation = reviewApi.usePost();
    const handleSubmitReview = (values) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        const username = `${firstName} ${lastName}`;
        createReviewMutation.mutate({
            productId,
            userId,
            rating: values.rating,
            comment: values.comment,
            username: username,
        }, {
            onSuccess: () => {
                reviewForm.resetFields();
                setIsReviewFormOpen(false);
            },
        });
    };
    const reviews = reviewsData?.Data || [];
    const totalReviews = reviewsData?.Count || 0;
    return (_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between w-full mb-4", children: [_jsxs("p", { className: "text-2xl font-bold", children: ["All Reviews", " ", _jsxs("span", { className: "text-base font-normal text-gray-600", children: ["(", totalReviews, ")"] })] }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Button, { className: "w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center p-0 border-none outline-none", icon: _jsx("img", { src: icons.filter, alt: "Filter", className: "w-5 h-5 object-contain" }) }), _jsxs(Button, { className: "bg-gray-200 rounded-full flex items-center gap-2 px-4 py-2 h-10 border-none outline-none", children: [_jsx("span", { className: "text-sm", children: "Latest" }), _jsx("img", { src: icons.downArrow, alt: "Dropdown", className: "w-3 h-3" })] }), hasCompletedOrder && !isOrdersLoading && (_jsx(Button, { className: "px-4 py-2 bg-gray-100 rounded-full", onClick: () => setIsReviewFormOpen(true), children: "Write a Review" }))] })] }), _jsx(Modal, { title: "Vi\u1EBFt \u0111\u00E1nh gi\u00E1", open: isReviewFormOpen, onCancel: () => setIsReviewFormOpen(false), onOk: () => reviewForm.submit(), okText: "G\u1EEDi", cancelText: "H\u1EE7y", children: _jsxs(Form, { form: reviewForm, layout: "vertical", onFinish: handleSubmitReview, children: [_jsx(Form.Item, { name: "rating", label: "\u0110i\u1EC3m \u0111\u00E1nh gi\u00E1", rules: [
                                { required: true, message: "Vui lòng chọn điểm đánh giá" },
                                {
                                    type: "number",
                                    min: 1,
                                    max: 5,
                                    message: "Điểm đánh giá phải từ 1 đến 5",
                                },
                            ], children: _jsx(InputNumber, { min: 1, max: 5, step: 0.5, className: "w-full" }) }), _jsx(Form.Item, { name: "comment", label: "Nh\u1EADn x\u00E9t", rules: [{ required: true, message: "Vui lòng nhập nhận xét" }], children: _jsx(Input.TextArea, { rows: 4, className: "w-full" }) })] }) }), isReviewsLoading ? (_jsx("p", { className: "text-center text-gray-500", children: "\u0110ang t\u1EA3i \u0111\u00E1nh gi\u00E1..." })) : reviews.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "Ch\u01B0a c\u00F3 \u0111\u00E1nh gi\u00E1 n\u00E0o cho s\u1EA3n ph\u1EA9m n\u00E0y." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: reviews.map((review) => (_jsx(ReviewCard, { rating: review.rating, reviewerName: review.userName || "Ẩn danh", isVerified: true, comment: review.comment, created: review.created }, review.id))) })), totalReviews > pageSize && (_jsx("div", { className: "text-center mt-4", children: _jsx(Pagination, { current: pageIndex + 1, pageSize: pageSize, total: totalReviews, onChange: (page) => setPageIndex(page - 1), showSizeChanger: false, className: "inline-block" }) }))] }));
};
export default ReviewTab;
