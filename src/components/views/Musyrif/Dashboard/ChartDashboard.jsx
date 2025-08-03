import { supabase } from "@/lib/supabase/supabaseClient";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const ChartDashboardUp = () => {
  const [Perizinan, SetPerizinan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [kesehatanChart, setKesehatanChart] = useState(null);

  const getDayIndex = (tgl) => {
    const dateUTC = new Date(tgl);
    const dateLocal = new Date(
      dateUTC.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    );
    const day = dateLocal.getDay();
    return (day + 6) % 7;
  };

  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const getData = async () => {
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from("perizinan_santri")
          .select("tgl_ijin, status");

        if (error) {
          console.error("Gagal ambil data:", error);
          setIsLoading(false);
          return;
        }

        const now = new Date();
        const dayOfWeek = now.getDay();
        const diffToMonday = (dayOfWeek + 6) % 7;
        const monday = new Date(now);
        monday.setDate(now.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        const filtered = data.filter((item) => {
          const tgl = new Date(item.tgl_ijin);
          return tgl >= monday && tgl <= sunday;
        });

        const keluar = Array(7).fill(0);
        const masuk = Array(7).fill(0);
        const categories = [
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
          "Minggu",
        ];

        filtered.forEach((item) => {
          const index = getDayIndex(item.tgl_ijin);
          if (item.status === "Keluar") keluar[index]++;
          else if (item.status === "Kembali") masuk[index]++;
        });

        const totalData =
          keluar.reduce((a, b) => a + b, 0) + masuk.reduce((a, b) => a + b, 0);
        setHasData(totalData > 0);

        SetPerizinan({
          series: [
            { name: "Keluar", data: keluar },
            { name: "Masuk", data: masuk },
          ],
          categories,
        });

        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    const getKesehatanData = async () => {
      try {
        const { data: santriList, error: santriError } = await supabase
          .from("santri")
          .select("id");

        if (santriError) throw santriError;

        const { data: kesehatanList, error: kesehatanError } = await supabase
          .from("kesehatan_santri")
          .select("santri_id, tgl_diperiksa, tgl_selesai, status")
          .gte("tgl_diperiksa", monday.toISOString())
          .lte("tgl_diperiksa", sunday.toISOString());

        if (kesehatanError) throw kesehatanError;

        const statusCount = {
          Sehat: 0,
          Sakit: 0,
          Sembuh: 0,
        };

        santriList.forEach((santri) => {
          const riwayat = kesehatanList.filter(
            (item) => item.santri_id === santri.id
          );

          if (riwayat.length === 0) {
            statusCount.Sehat++;
          } else {
            const latest = riwayat[riwayat.length - 1];
            const selesai = latest.tgl_selesai
              ? new Date(latest.tgl_selesai)
              : null;

            if (
              latest.status === "Selesai" &&
              selesai >= monday &&
              selesai <= sunday
            ) {
              statusCount.Sembuh++;
            } else if (
              ["Dalam Perawatan", "Menunggu"].includes(latest.status)
            ) {
              statusCount.Sakit++;
            } else {
              statusCount.Sakit++;
            }
          }
        });

        setKesehatanChart({
          series: [statusCount.Sehat, statusCount.Sembuh, statusCount.Sakit],
          labels: ["Sehat", "Sembuh", "Sakit"],
        });
      } catch (error) {
        console.error("Gagal ambil data kesehatan:", error);
      }
    };

    getKesehatanData();
    getData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: ["#EF4444", "#10B981"],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: "60%",
      },
    },
    xaxis: {
      categories: Perizinan?.categories || [],
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
      fontSize: "12px",
      markers: {
        width: 8,
        height: 8,
        radius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " izin";
        },
      },
    },
  };

  const kesehatanData = {
    series: [298, 18, 5, 3],
    options: {
      chart: {
        type: "donut",
        height: 280,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1200,
          animateGradually: {
            enabled: true,
            delay: 200,
          },
        },
      },
      colors: ["#10B981", "#F59E0B", "#EF4444", "#3B82F6"],
      labels: ["Sehat", "Sembuh", "Sakit"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        fontSize: "12px",
        markers: {
          width: 8,
          height: 8,
          radius: 12,
        },
        itemMargin: {
          vertical: 4,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Sehat",
                fontSize: "14px",
                fontWeight: 500,
                color: "#64748B",
                formatter: function () {
                  return "92%";
                },
              },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 600,
                color: "#10B981",
              },
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " santri";
          },
        },
      },
      stroke: {
        width: 0,
      },
    },
  };

  const ChartSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
      <div className="space-y-3">
        <div className="h-48 bg-gray-200 rounded"></div>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const DonutSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
      <div className="flex justify-center mb-4">
        <div className="w-48 h-48 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const NoDataComponent = () => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
      <p className="text-lg font-medium">Tidak ada data perizinan</p>
      <p className="text-sm">Data perizinan untuk minggu ini belum tersedia</p>
    </div>
  );

  return (
    <>
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Perizinan Mingguan
          </h3>
        </div>

        {isLoading ? (
          <ChartSkeleton />
        ) : !hasData ? (
          <NoDataComponent />
        ) : (
          <div className="transition-all duration-500 ease-in-out">
            <Chart
              options={chartOptions}
              series={Perizinan.series}
              type="bar"
              height={350}
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Status Kesehatan
          </h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>

        {isLoading || !kesehatanChart ? (
          <DonutSkeleton />
        ) : (
          <div className="transition-all duration-500 ease-in-out">
            <Chart
              options={{
                ...kesehatanData.options,
                labels: kesehatanChart.labels,
              }}
              series={kesehatanChart.series}
              type="donut"
              height={280}
            />

            <div className="mt-4 space-y-2">
              {kesehatanChart.labels.map((label, index) => {
                const colors = ["bg-green-500", "bg-blue-500", "bg-red-500"];
                return (
                  <div
                    key={label}
                    className="flex justify-between items-center transition-all duration-300 hover:bg-gray-50 px-2 py-1 rounded"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 ${colors[index]} rounded-full mr-2`}
                      ></div>
                      <span className="text-sm text-gray-600">{label}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {kesehatanChart.series[index]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const ChartDashboardDown = () => {};
