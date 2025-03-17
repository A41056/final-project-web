import React from "react";
import { icons } from "../../assets/icons";

interface ReviewCardProps {
  rating: number;
  reviewerName: string;
  isVerified: boolean;
  content: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  reviewerName,
  isVerified,
  content,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = Array(fullStars).fill("full");
  if (hasHalfStar) {
    stars.push("half");
  }

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
          <img className="verified" src={icons.verified} alt="verified" />
        )}
      </p>
      <p className="review-text">"{content}"</p>
    </div>
  );
};

export default ReviewCard;
