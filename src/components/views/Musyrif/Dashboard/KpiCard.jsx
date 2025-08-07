import { Ban, FileCheck, HeartPulse, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import CountUp from "@/components/ui/CountUp";

const KpiCard = () => {
  const [IsLoading, SetIsLoading] = useState(true);
  const [Santri, SetSantri] = useState();
  const [Pelanggaran, SetPelanggaran] = useState();
  const [Kesehatan, SetKesahatan] = useState();
  const [Perizinan, SetPerizinan] = useState();

  useEffect(() => {
    const getKpiData = async () => {
      const { data: SantriData } = await supabase.from("santri").select("nama");
      const { data: PelanggaranData } = await supabase
        .from("pelanggaran_santri")
        .select("*");
      const { data: KesehatanData } = await supabase
        .from("kesehatan_santri")
        .select("*");
      const { data: PerizinanData } = await supabase
        .from("perizinan_santri")
        .select("*");

      SetPerizinan(PerizinanData.length);
      SetKesahatan(KesehatanData.length);
      SetPelanggaran(PelanggaranData.length);
      SetSantri(SantriData.length);
      SetIsLoading(false);
    };

    getKpiData();
  }, []);

  const kpiData = [
    {
      title: "Santri",
      value: Santri,
      icon: Users,
    },
    {
      title: "Pelanggaran",
      value: Pelanggaran,
      icon: Ban,
    },
    {
      title: "Kesehatan",
      value: Kesehatan,
      icon: HeartPulse,
    },
    {
      title: "Perizinan",
      value: Perizinan,
      icon: FileCheck,
    },
  ];

  return (
    <>
      {IsLoading
        ? [...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))
        : kpiData.map((item, index) => (
            <Card
              key={index}
              className="w-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-gray-900 transition-all duration-500 ease-in-out">
                      <CountUp target={item.value || 0} />
                    </h3>
                    <p className="text-md font-medium text-gray-600">
                      {item.title}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-3 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
    </>
  );
};

export default KpiCard;
