import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { icons } from "../../assets/icons";
const ReviewCard = ({ rating, reviewerName, isVerified, comment, created, }) => {
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
    return (_jsxs("div", { className: "review-card", children: [_jsx("div", { className: "stars", children: stars.map((type, index) => (_jsx("img", { src: type === "full" ? icons.star : icons.halfStar, alt: type === "full" ? "full star" : "half star" }, index))) }), _jsxs("p", { className: "reviewer", children: [_jsx("strong", { children: reviewerName }), isVerified && (_jsx("img", { className: "verified ml-1", src: icons.verified, alt: "verified" })), _jsxs("span", { className: "text-sm text-gray-500 ml-2", children: ["\u2022 ", formattedDate] })] }), _jsxs("p", { className: "review-text mt-1", children: ["\"", comment, "\""] })] }));
};
export default ReviewCard;
