type Review = {
  id: string
  text: string
  author: string
}

type ReviewCardProps = {
  review: Review
  quoteIcon: string
}

export function ReviewCard({
  review,
  quoteIcon,
}: ReviewCardProps) {
  return (
    <article
      className={[
        "relative flex h-full min-h-[330px] flex-col",
        "rounded-md bg-maturana-beige px-6 pb-6 pt-14",
        "shadow-[0_8px_20px_rgba(15,41,64,0.16)]",
        "transition duration-300",
        "hover:-translate-y-1",
        "hover:shadow-[0_14px_30px_rgba(15,41,64,0.2)]",
        "sm:px-7 sm:pb-7",
      ].join(" ")}
    >
      <img
        src={quoteIcon}
        alt=""
        aria-hidden="true"
        className={[
          "pointer-events-none absolute left-0 lg:left-4 lg:-top-5 top-0",
          "h-12 w-16 lg:h-20 lg:w-24 object-contain opacity-80",
        ].join(" ")}
      />

      <p
        className={[
          "font-semibold text-sm lg:text-xl leading-[1.55]",
          "text-maturana-navy",
        ].join(" ")}
      >
        {review.text}
      </p>

      <p
        className={[
          "mt-auto pt-5 text-right",
          "font-lato text-sm font-bold",
          "text-maturana-navy",
        ].join(" ")}
      >
        {review.author}
      </p>
    </article>
  )
}