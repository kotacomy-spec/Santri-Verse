import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Gavel,
  CalendarCheck,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const dashboardData = [
  {
    title: "Kesehatan Santri",
    value: 20,
    change: "+10%",
    changeDirection: "up",
    description: "Kasus meningkat bulan ini",
    subtext: "Data dalam 30 hari terakhir",
    icon: <Stethoscope className="size-4" />,
  },
  {
    title: "Pelanggaran Santri",
    value: 7,
    change: "-5%",
    changeDirection: "down",
    description: "Sedikit menurun",
    subtext: "Periode ini lebih baik",
    icon: <Gavel className="size-4" />,
  },
  {
    title: "Perizinan Santri",
    value: 12,
    change: "+2%",
    changeDirection: "up",
    description: "Cukup stabil",
    subtext: "Terakhir 1 bulan",
    icon: <CalendarCheck className="size-4" />,
  },
  {
    title: "Total Santri",
    value: 250,
    change: "+4%",
    changeDirection: "up",
    description: "Kenaikan santri baru",
    subtext: "Data tahun ajaran ini",
    icon: <Users className="size-4" />,
  },
];

const chartConfig = {
  jumlah: { label: "Jumlah" },
  a: { label: "A", color: "var(--chart-1)" },
  b: { label: "B", color: "var(--chart-2)" },
  c: { label: "C", color: "var(--chart-3)" },
};

const chartDatasets = {
  kesehatan: {
    "7hari": [
      { browser: "a", jumlah: 4 },
      { browser: "b", jumlah: 2 },
      { browser: "c", jumlah: 1 },
    ],
    "30hari": [
      { browser: "a", jumlah: 10 },
      { browser: "b", jumlah: 5 },
      { browser: "c", jumlah: 5 },
    ],
    "3bulan": [
      { browser: "a", jumlah: 15 },
      { browser: "b", jumlah: 12 },
      { browser: "c", jumlah: 8 },
    ],
  },
  perizinan: {
    "7hari": [
      { browser: "a", jumlah: 2 },
      { browser: "b", jumlah: 1 },
      { browser: "c", jumlah: 1 },
    ],
    "30hari": [
      { browser: "a", jumlah: 5 },
      { browser: "b", jumlah: 4 },
      { browser: "c", jumlah: 3 },
    ],
    "3bulan": [
      { browser: "a", jumlah: 12 },
      { browser: "b", jumlah: 8 },
      { browser: "c", jumlah: 5 },
    ],
  },
  pelanggaran: {
    "7hari": [
      { browser: "a", jumlah: 1 },
      { browser: "b", jumlah: 2 },
    ],
    "30hari": [
      { browser: "a", jumlah: 3 },
      { browser: "b", jumlah: 4 },
    ],
    "3bulan": [
      { browser: "a", jumlah: 8 },
      { browser: "b", jumlah: 10 },
    ],
  },
};

const ChartCard = ({ title, description, data }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Tabs defaultValue="7hari" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="7hari">7 Hari</TabsTrigger>
            <TabsTrigger value="30hari">30 Hari</TabsTrigger>
            <TabsTrigger value="3bulan">3 Bulan</TabsTrigger>
          </TabsList>

          {["7hari", "30hari", "3bulan"].map((range) => (
            <TabsContent key={range} value={range}>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={data[range]}
                    dataKey="jumlah"
                    nameKey="browser"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                </PieChart>
              </ChartContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Data per kategori <TrendingUp className="w-4 h-4" />
        </div>
        <div className="text-muted-foreground">Diperbarui secara berkala</div>
      </CardFooter>
    </Card>
  );
};

const DashboardMusyrif = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Musyrif</h1>
        <p className="text-muted-foreground mt-1">
          Pantau kesehatan, perizinan, dan pelanggaran santri dengan mudah.
        </p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {dashboardData.map((data, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardDescription>{data.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.value}
              </CardTitle>
              <Badge variant="outline" className="flex items-center gap-1">
                {data.changeDirection === "up" ? (
                  <TrendingUp className="size-4 text-green-500" />
                ) : (
                  <TrendingDown className="size-4 text-red-500" />
                )}
                {data.change}
              </Badge>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium">
                {data.description}
                {data.icon}
              </div>
              <div className="text-muted-foreground">{data.subtext}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Kesehatan Santri"
          description="Distribusi kasus kesehatan"
          data={chartDatasets.kesehatan}
        />
        <ChartCard
          title="Perizinan Santri"
          description="Jenis perizinan yang diajukan"
          data={chartDatasets.perizinan}
        />
        <ChartCard
          title="Pelanggaran Santri"
          description="Jenis pelanggaran yang tercatat"
          data={chartDatasets.pelanggaran}
        />
      </div>
    </div>
  );
};

export default DashboardMusyrif;
