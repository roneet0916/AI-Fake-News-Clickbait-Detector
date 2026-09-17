import React from "react";

interface IndicatorItem {
  name: string;
  description?: string;
  level?: "high" | "medium" | "low" | string;
}

interface IndicatorListProps {
  indicators: (string | IndicatorItem)[];
  title?: string;
}

export default function IndicatorList({ indicators, title }: IndicatorListProps) {
  if (!indicators || indicators.length === 0) {
    return (
      <div className="text-gray-400 text-xs italic">No specific indicators flagged.</div>
    );
  }

  return (
    <div className="space-y-2">
      {title && (
        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-1">
          {title}
        </h4>
      )}
      <ul className="space-y-1.5">
        {indicators.map((ind, idx) => {
          const isObj = typeof ind === "object" && ind !== null;
          const name = isObj ? ind.name : ind;
          const desc = isObj ? ind.description : null;
          const level = isObj ? ind.level : "medium";

          return (
            <li
              key={idx}
              className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-xs"
            >
              <span
                className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                  level === "high"
                    ? "bg-red-500"
                    : level === "low"
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                }`}
              />
              <div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{name}</span>
                {desc && <p className="text-gray-500 dark:text-gray-400 text-[11px]">{desc}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
