import React from 'react';
import { Star, ExternalLink, Check } from 'lucide-react';
import { REVIEWS, SHOP_INFO } from '../data/barbershopData';
import { getLocalizedText } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-12 sm:py-20 bg-[#0e1117] border-y border-[#232733]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header & Overall Rating Card */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#dfa938] font-bold mb-1.5 sm:mb-2">
              {t.reviewsKicker}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-brand text-[#f4f3ee] tracking-tight">
              {t.reviewsTitle}
            </h2>
            <p className="text-[#a0a6b5] text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
              {t.reviewsSubtitle}
            </p>
          </div>

          {/* Google Score Banner */}
          <div className="flex items-center gap-3 sm:gap-4 bg-[#141824] p-3 sm:p-4 rounded-xl border border-[#262c3e] self-start md:self-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#dfa938] font-brand">5.0</div>
              <div className="flex text-[#dfa938] text-xs justify-center mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-[#dfa938]" />
                ))}
              </div>
            </div>
            <div className="h-8 sm:h-10 w-[1px] bg-[#222838]" />
            <div>
              <div className="text-xs font-bold text-white">{t.googleMapsRatingHeader}</div>
              <div className="text-[10px] sm:text-[11px] text-[#8e95a5]">{t.googleReviewsSummary}</div>
              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[#dfa938] hover:underline mt-0.5"
              >
                <span>{t.readWriteReview}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121622] rounded-xl p-4 sm:p-6 border border-[#202636] flex flex-col justify-between hover:border-[#dfa938]/40 transition-colors"
            >
              <div>
                {/* Author and Rating */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1e2538] border border-[#2f3950] flex items-center justify-center font-bold text-xs text-[#dfa938]">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{rev.author}</div>
                      <div className="text-[11px] text-[#788094]">{getLocalizedText(rev.timeAgo, language)}</div>
                    </div>
                  </div>

                  <div className="flex text-[#dfa938]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#dfa938]" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs text-[#c0c5d2] leading-relaxed mb-4 italic">
                  "{getLocalizedText(rev.text, language)}"
                </p>
              </div>

              {/* Footer Tags */}
              <div className="pt-3 border-t border-[#1c2230] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8e95a5]">
                {rev.priceRange && (
                  <span className="text-[#dfa938] font-medium">{t.priceRangeLabel} {rev.priceRange}</span>
                )}
                {rev.serviceMentioned && (
                  <span className="text-[#c0c5d2]">{t.servicesMentionedLabel} {getLocalizedText(rev.serviceMentioned, language)}</span>
                )}
                <span className="ml-auto text-[#6a7285] flex items-center gap-1">
                  <span>Google Maps</span>
                  <Check className="w-3 h-3 text-emerald-400" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action to Review on Google */}
        <div className="mt-10 text-center">
          <a
            href={SHOP_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171c2a] hover:bg-[#20273a] border border-[#2b354c] hover:border-[#dfa938] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <span>{t.leaveReviewCta}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#dfa938]" />
          </a>
        </div>
      </div>
    </section>
  );
};
