import { FaRegStar, FaStar } from "react-icons/fa"

type ReviewType = {
  user: string
  rating: number
  comment: string
}

export function GetProductRating(reviews: ReviewType[]) {
  if (!reviews?.length) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>☆</span>
          ))}
        </div>
        <span className="text-sm text-gray-500">
          0 (0 reviews)
        </span>
      </div>
    )
  }

  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  const average = total / reviews.length
  const filledStars = Math.round(average)

  return (
    <div className="flex items-end gap-2">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < filledStars ? <FaStar size={18} className="fill-yellow-500 text-yellow-500"/> : <FaRegStar size={18} className="text-yellow-500"/>}
          </span>
        ))}
      </div>

      {/* Rating Number */}
      <span className="text-sm text-gray-600">
        {average.toFixed(1)} ({reviews.length})
      </span>
    </div>
  )
}