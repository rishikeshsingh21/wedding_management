const Card = ({ icon, title, description }) => {
  return (
    <div className="
      relative
      bg-gradient-to-br from-pink-50 via-white to-rose-50
      border border-pink-200
      rounded-3xl
      p-8
      text-center
      shadow-md
      hover:shadow-xl
      transition-all duration-300
    ">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>

      {/* Icon */}
      <div className="flex justify-center mb-5 mt-3">
        <div className="
          w-16 h-16
          flex items-center justify-center
          rounded-full
          bg-pink-100
          text-pink-600
          shadow-inner
        ">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="
        text-xl
        font-serif
        font-semibold
        text-rose-700
        mb-3
        tracking-wide
      ">
        {title}
      </h3>

      {/* Divider */}
      <div className="flex justify-center mb-4">
        <span className="w-12 h-px bg-pink-300"></span>
      </div>

      {/* Description */}
      <p className="
        text-sm
        text-gray-600
        leading-relaxed
      ">
        {description}
      </p>
    </div>
  );
};

export default Card;
