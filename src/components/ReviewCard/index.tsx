import React from "react";
import { icons } from "../../assets/icons";

interface ReviewCardProps {
  rating: number;
  reviewerName: string;
  isVerified: boolean;
  comment: string;
  created: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  reviewerName,
  isVerified,
  comment,
  created,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = Array(fullStars).fill("full");
  if (hasHalfStar) {
    stars.push("half");
  }

  const formattedDate = new Date(created).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="review-card">
      <div className="stars">
        {stars.map((type, index) => (
          <img
            key={index}
            src={type === "full" ? icons.star : icons.halfStar}
            alt={type === "full" ? "full star" : "half star"}
          />
        ))}
      </div>
      <p className="reviewer">
        <strong>{reviewerName}</strong>
        {isVerified && (
          <img className="verified ml-1" src={icons.verified} alt="verified" />
        )}
        <span className="text-sm text-gray-500 ml-2">• {formattedDate}</span>
      </p>
      <p className="review-text mt-1">"{comment}"</p>
    </div>
  );
};

export default ReviewCard;
