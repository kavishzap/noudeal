"use client";
import React from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const UpcomingEventCountdown: React.FC<{ name?: string; target: string | Date }> = ({ name = "N/A", target }) => {
  const targetMs = new Date(target).getTime();

  const getRemaining = () => {
    const diff = targetMs - Date.now();
    const clamped = Math.max(diff, 0);
    const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
    const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((clamped / (1000 * 60)) % 60);
    const seconds = Math.floor((clamped / 1000) % 60);
    return { diff, days, hours, minutes, seconds };
  };

  const [{ diff, days, hours, minutes, seconds }, setTick] = React.useState(getRemaining);

  React.useEffect(() => {
    const id = setInterval(() => setTick(getRemaining()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetMs]);

  const isPast = diff <= 0 || Number.isNaN(targetMs);

  return (
    <div className="mt-6">
      <div className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          Upcoming event:
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {name || "N/A"}
          </h3>
          {/* accent chip */}
          <span className="rounded-full bg-[#74B70E] px-2 py-0.5 text-xs font-semibold text-white">
            Soon
          </span>
        </div>

        {isPast ? (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Countdown finished
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((x) => (
              <div
                key={x.label}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-800 dark:bg-gray-800/60"
              >
                <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
                  {pad(x.value)}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {x.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
 export default UpcomingEventCountdown;