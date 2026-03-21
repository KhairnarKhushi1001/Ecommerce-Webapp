import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Keyframes injected once (Tailwind can't do these)
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600&display=swap');

  .pc-root * { font-family: 'Outfit', sans-serif; }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes popIn {
    0%   { transform: scale(0.7) translateY(6px); opacity: 0; }
    70%  { transform: scale(1.06); }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes heartPop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.45); }
    70%  { transform: scale(0.88); }
    100% { transform: scale(1); }
  }
  @keyframes badgePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(234,88,12,0.4); }
    50%       { box-shadow: 0 0 0 6px rgba(234,88,12,0); }
  }

  .pc-card { font-family: 'Outfit', sans-serif; }
  .pc-name { font-family: 'DM Serif Display', serif; }

  .pc-slide-up  { animation: slideUp 0.38s cubic-bezier(.22,1,.36,1) both; }
  .pc-pop-in    { animation: popIn  0.35s cubic-bezier(.22,1,.36,1) both; }

  /* shimmer skeleton */
  .pc-shimmer {
    background: linear-gradient(90deg, #f0ede8 25%, #e8e3db 50%, #f0ede8 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  /* image zoom */
  .pc-img { transition: transform 0.55s cubic-bezier(.22,1,.36,1), filter 0.4s ease; }
  .pc-card:hover .pc-img { transform: scale(1.08); filter: brightness(0.88); }

  /* action bar slide */
  .pc-actions {
    transform: translateY(100%);
    transition: transform 0.38s cubic-bezier(.22,1,.36,1);
  }
  .pc-card:hover .pc-actions { transform: translateY(0); }

  /* overlay fade */
  .pc-overlay {
    opacity: 0;
    transition: opacity 0.32s ease;
    background: linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.08) 55%, transparent 100%);
  }
  .pc-card:hover .pc-overlay { opacity: 1; }

  /* wish button */
  .pc-wish { transition: color 0.2s, transform 0.18s; }
  .pc-wish:hover { transform: scale(1.15); }
  .pc-wish.wished { animation: heartPop 0.4s ease; }

  /* badge */
  .pc-badge { animation: badgePulse 2s ease infinite; }

  /* card lift */
  .pc-card {
    transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
  }
  .pc-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.13), 0 6px 16px rgba(0,0,0,0.07);
  }

  /* btn ripple */
  .pc-btn {
    position: relative; overflow: hidden;
    transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .pc-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.25);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .pc-btn:active::after { opacity: 1; }
  .pc-btn:hover { transform: translateY(-1px); }
`;

/* ─────────────────────────────────────────────
   Star renderer
───────────────────────────────────────────── */
const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <svg key={i} viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
    <span className="text-gray-400 text-xs ml-1 font-medium">({rating})</span>
  </div>
);

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const ProductCard = ({ product, setProduct }) => {
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);
  const [added, setAdded]   = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClick = () => {
    setProduct(product);
    navigate(`/products/${product.product_id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    setWished(w => !w);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discount    = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="pc-card pc-root relative bg-white rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}
        onClick={handleClick}
      >

        {/* ── IMAGE ZONE ── */}
        <div className="relative w-full h-56 overflow-hidden bg-orange-50">

          {/* skeleton */}
          {!imgLoaded && <div className="pc-shimmer absolute inset-0" />}

          <img
            src={product?.images?.[0]?.image_url}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            className={`pc-img w-full h-full object-cover ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 0.3s" }}
          />

          {/* gradient overlay */}
          <div className="pc-overlay absolute inset-0 pointer-events-none" />

          {/* discount badge */}
          {discount && (
            <div className="pc-badge absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </div>
          )}

          {/* wishlist btn */}
          <button
            onClick={handleWish}
            className={`pc-wish absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-base ${wished ? "wished text-rose-500" : "text-gray-300 hover:text-rose-400"}`}
          >
            {wished ? "♥" : "♡"}
          </button>

          {/* action bar */}
          <div className="pc-actions absolute bottom-0 left-0 right-0 flex gap-2 px-3 pb-3 pt-5 pointer-events-auto">
            <button
              onClick={handleAddToCart}
              className={`pc-btn flex-1 py-2 text-xs font-600 rounded-xl shadow-lg ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-50"
              }`}
              style={{ fontWeight: 600, letterSpacing: "0.02em" }}
            >
              {added ? "✓ Added!" : "Add to Cart"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="pc-btn flex-1 py-2 text-xs rounded-xl text-white shadow-lg"
              style={{
                fontWeight: 600,
                letterSpacing: "0.02em",
                background: "linear-gradient(135deg, #ea580c, #f97316)",
                boxShadow: "0 4px 14px rgba(234,88,12,0.4)"
              }}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-4 pt-4 pb-4 space-y-2.5">

          {/* category pill */}
          <span
            className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(234,88,12,0.09)",
              color: "#c2410c",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {product.category}
          </span>

          {/* name */}
          <h3
            className="pc-name text-gray-900 leading-snug"
            style={{ fontSize: "17px", fontWeight: 400, lineHeight: 1.25 }}
          >
            {product.name}
          </h3>

          {/* description */}
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2" style={{ fontWeight: 300 }}>
            {product.description}
          </p>

          {/* divider */}
          <div className="h-px bg-gradient-to-r from-orange-100 to-transparent" />

          {/* price row */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span
                className="text-gray-900"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px" }}
              >
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-gray-300 text-xs line-through" style={{ fontWeight: 300 }}>
                  ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <Stars rating={product.product_rating} />
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCard;
