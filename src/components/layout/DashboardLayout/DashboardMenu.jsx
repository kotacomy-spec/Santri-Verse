import {
  LayoutDashboard,
  ShieldAlert,
  Stethoscope,
  CalendarCheck,
  ListTree,
  FileText,
  Layers,
  FileWarning,
  Settings,
  Gavel,
} from "lucide-react";

const sidebarMusyrif = [
  {
    key: "Dashboard",
    label: "Dashboard",
    href: "/musyrif/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    key: "Pelanggaran",
    label: "Pelanggaran",
    href: "/musyrif/pelanggaran",
    icon: <ShieldAlert size={18} />,
  },
  {
    key: "Kesehatan",
    label: "Kesehatan",
    href: "/musyrif/kesehatan",
    icon: <Stethoscope size={18} />,
  },
  {
    key: "Perizinan Santri",
    label: "Perizinan Santri",
    href: "/musyrif/perizinan",
    icon: <CalendarCheck size={18} />,
  },
  {
    key: "Master Data",
    label: "Master Data",
    href: "/musyrif/master-data",
    icon: <ListTree size={18} />,
    childMenu: [
      {
        key: "Master Perizinan",
        label: "Perizinan",
        icon: <FileText size={18} />,
        children: [
          {
            key: "Keterangan Izin",
            label: "Keterangan Izin",
            href: "/musyrif/master-data/perizinan/keterangan-izin",
            icon: <Layers size={18} />,
          },
        ],
      },
      {
        key: "Master Pelanggaran",
        label: "Pelanggaran",
        icon: <FileWarning size={18} />,
        children: [
          {
            key: "Jenis Pelanggaran",
            label: "Jenis Pelanggaran",
            href: "/musyrif/master-data/pelanggaran/jenis-pelanggaran",
            icon: <FileText size={18} />,
          },
          {
            key: "Kategori Pelanggaran",
            label: "Kategori Pelanggaran",
            href: "/musyrif/master-data/pelanggaran/kategori-pelanggaran",
            icon: <Settings size={18} />,
          },
          {
            key: "Tindakan Disiplin",
            label: "Tindakan Disiplin",
            href: "/musyrif/master-data/pelanggaran/tindakan-disiplin",
            icon: <Gavel size={18} />,
          },
        ],
      },
    ],
  },
];

export { sidebarMusyrif };
