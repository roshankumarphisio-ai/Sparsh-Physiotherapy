import { CheckCircle } from 'lucide-react';
import { TRUST_POINTS } from '../data';

export default function TrustBar() {
  return (
    <div className="bg-slate-900 text-white py-6 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 md:gap-x-12">
          {TRUST_POINTS.map((point, idx) => (
            <div
              key={idx}
              id={`trust-point-${idx}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-800/60 transition-colors duration-200"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-sm font-semibold tracking-wide text-slate-100">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
