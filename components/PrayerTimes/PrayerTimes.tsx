"use client"

import { useEffect, useState } from "react"
import { getNextPrayer } from "@/services/PrayerTimeService"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import moment from "moment"

export default function PrayerTimes({
  today,
}: {
  today: DailyPrayerTime
}) {
  const PrayerTimesArray = [
    {
      label: "Fajr",
      data: today.fajr,
    },
    {
      label: "Sunrise",
      data: {
        start: today.sunrise_start,
        congregation_start: "",  // Explicitly no congregation time for sunrise
      },
    },
    {
      label: "Dhuhr",
      data: today.zuhr,
    },
    {
      label: "Asr",
      data: today.asr,
    },
    {
      label: "Maghrib",
      data: today.maghrib,
    },
    {
      label: "Isha",
      data: today.isha,
    },
  ]

  const [nextPrayerTime, setNextPrayerTime] = useState(getNextPrayer(today))

  useEffect(() => {
    const interval = setInterval(() => {
      setNextPrayerTime(getNextPrayer(today))
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [today])

  return (
<div className="bg-mosqueGreen-dark text-white p-4 lg:p-4 mb-0"> {/* Reduced bottom padding and removed bottom margin */}
  <table className="mx-auto table-auto border-collapse border-none w-full">
   <thead>
          <tr
            className="text-center [&>*]:p-2 md:[&>*]:p-8
            md:[&>*]:border [&>*]:border-mosqueGreen-dark
            [&>th]:border-t-0 [&>th:last-of-type]:border-r-0"
          >
            <th className="sr-only">Prayer time</th>
            <th className="md:text-6xl text-3xl">Adhan</th>
            <th className="md:text-6xl text-3xl">Iqama</th>
          </tr>
        </thead>
        <tbody>
          {PrayerTimesArray.map((prayer, index) => (
            <tr
              key={prayer.label}
              className="
                text-center
                [&>*]:p-4
                md:[&>*]:p-8
                md:[&>*]:border md:[&>*]:border-b-0 [&>*]:border-mosqueGreen-dark
                md:[&>th]:w-20
                [&>th]:border-l-0
                [&>td:last-of-type]:border-r-0
                border border-mosqueGreen-dark border-l-0 border-r-0
                last-of-type:border-b-0"
            >
              <th className="text-left text-5xl md:text-7xl md:text-right">
                {prayer.label}
              </th>
              <td className="text-6xl md:text-7xl">
                {moment(prayer.data.start, ["HH:mm"]).format("h:mm")}
                {prayer.data?.start_secondary ? (
                  <div className="block mt-1 md:mt-2">
                    {moment(prayer.data.start_secondary, ["HH:mm"]).format(
                      "h:mm",
                    )}
                  </div>
                ) : null}
              </td>
              <td className={`font-bold text-6xl md:text-7xl`}>
                {prayer.data.congregation_start ? (
                  <span
                    className={
                      nextPrayerTime.today === true &&
                      nextPrayerTime.prayerIndex === index
                        ? "underline decoration-mosqueGreen-highlight underline-offset-8"
                        : ""
                    }
                  >
                    {moment(prayer.data.congregation_start, ["HH:mm"]).format(
                      "h:mm",
                    )}
                  </span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
