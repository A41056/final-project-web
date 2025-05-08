import React, { useState } from "react";
import { useQuery } from "react-query";
import { Form, InputNumber, Input, Modal, Button, Pagination } from "antd";
import ReviewCard from "@/components/ReviewCard";
import { reviewApi } from "@/config/api";
import { useAuthStore } from "@/stores/authStore";
import { OrderStatus } from "@/types/order";

interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  reviewerName: string;
  isVerified: boolean;
  content: string;
  createdAt: string;
}

interface OrderDto {
  id: string;
  customerId: string;
  orderName: string;
  status: OrderStatus;
  orderItems: { productId: string }[];
}

interface PaginatedResult<T> {
  PageIndex: number;
  PageSize: number;
  Count: number;
  Data: T[];
}

interface ReviewTabProps {
  productId: string;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ productId }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 6;
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewForm] = Form.useForm();
  const userId = useAuthStore((state) => state.user?.id || "");
  const REVIEW_API_URL =
    import.meta.env.ORDER_API_URL || "http://localhost:6003";

  const { data: reviewsData, isLoading: isReviewsLoading } =
    reviewApi.useGetReviewsByProductId(productId, { pageIndex, pageSize });

  const { data: ordersData, isLoading: isOrdersLoading } = useQuery<
    { orders: OrderDto[] },
    Error
  >(
    ["orders", userId],
    () =>
      fetch(`${REVIEW_API_URL}/orders/customer/${userId}`, {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
      }).then((res) => res.json()),
    {
      enabled: !!userId,
    }
  );

  const hasCompletedOrder =
    Array.isArray(ordersData?.orders) &&
    ordersData.orders.some(
      (order) =>
        order.status === OrderStatus.Completed &&
        order.orderItems.some((item) => item.productId === productId)
    );

  const createReviewMutation = reviewApi.usePost();

  const handleSubmitReview = (values: { rating: number; comment: string }) => {
    createReviewMutation.mutate(
      {
        productId,
        userId,
        rating: values.rating,
        comment: values.comment,
      },
      {
        onSuccess: () => {
          reviewForm.resetFields();
          setIsReviewFormOpen(false);
        },
      }
    );
  };

  const reviews = reviewsData?.Data || [];
  const totalReviews = reviewsData?.Count || 0;

  console.log("isOrdersLoading:", isOrdersLoading);
  console.log("ordersData:", ordersData);
  console.log("hasCompletedOrder:", hasCompletedOrder);
  console.log("isReviewFormOpen:", isReviewFormOpen);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full mb-4">
        <p className="text-2xl font-bold">
          All Reviews{" "}
          <span className="text-base font-normal text-gray-600">
            ({totalReviews})
          </span>
        </p>
        <div className="flex items-center gap-2.5">
          <Button
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center p-4"
            icon={
              <img
                src="/images/filter.png"
                alt="Filter"
                className="w-6 h-6 object-cover"
              />
            }
          />
          <Button className="w-32 h-12 bg-gray-200 rounded-full flex items-center justify-center px-5">
            Latest
            <img
              src="/images/down-arrow.png"
              alt="Dropdown"
              className="w-4 h-4 ml-2"
            />
          </Button>
          {hasCompletedOrder && !isOrdersLoading && (
            <div style={{ background: "yellow" }}>
              <Button
                className="px-4 py-2 bg-gray-100 rounded-full"
                onClick={() => setIsReviewFormOpen(true)}
              >
                Write a Review
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Viết đánh giá"
        open={isReviewFormOpen}
        onCancel={() => setIsReviewFormOpen(false)}
        onOk={() => reviewForm.submit()}
        okText="Gửi"
        cancelText="Hủy"
      >
        <Form form={reviewForm} layout="vertical" onFinish={handleSubmitReview}>
          <Form.Item
            name="rating"
            label="Điểm đánh giá"
            rules={[{ required: true, message: "Vui lòng chọn điểm đánh giá" }]}
          >
            <InputNumber min={1} max={5} step={0.5} className="w-full" />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Nhận xét"
            rules={[{ required: true, message: "Vui lòng nhập nhận xét" }]}
          >
            <Input.TextArea rows={4} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>

      {isReviewsLoading ? (
        <p className="text-center text-gray-500">Đang tải đánh giá...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          Chưa có đánh giá nào cho sản phẩm này.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {reviews.map((review: Review) => (
            <ReviewCard
              key={review.id}
              rating={review.rating}
              reviewerName={review.reviewerName}
              isVerified={review.isVerified}
              content={review.content}
            />
          ))}
        </div>
      )}

      {totalReviews > pageSize && (
        <div className="text-center mt-4">
          <Pagination
            current={pageIndex + 1}
            pageSize={pageSize}
            total={totalReviews}
            onChange={(page) => setPageIndex(page - 1)}
            showSizeChanger={false}
            className="inline-block"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewTab;
