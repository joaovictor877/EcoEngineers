import { 
  TrendingUp, 
  Recycle, 
  DollarSign, 
  Leaf 
} from "lucide-react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { StatCard } from "../components/stat-card";

// Mock data
const materialTypesData = [
  { name: "Aço", value: 450, color: "#2E7D32" },
  { name: "Alumínio", value: 230, color: "#66BB6A" },
  { name: "Cobre", value: 180, color: "#81C784" },
  { name: "Ferro", value: 320, color: "#A5D6A7" },
  { name: "Outros", value: 120, color: "#C8E6C9" },
];

const wasteByDepartmentData = [
  { setor: "Produção", residuos: 450 },
  { setor: "Montagem", residuos: 380 },
  { setor: "Estamparia", residuos: 290 },
  { setor: "Pintura", residuos: 210 },
  { setor: "Usinagem", residuos: 340 },
];

const monthlyWasteData = [
  { mes: "Set", kg: 1200 },
  { mes: "Out", kg: 1450 },
  { mes: "Nov", kg: 1100 },
  { mes: "Dez", kg: 1600 },
  { mes: "Jan", kg: 1350 },
  { mes: "Fev", kg: 1280 },
  { mes: "Mar", kg: 1520 },
];

export function Dashboard() {
  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#424242] mb-2">
          Dashboard ESG
        </h1>
        <p className="text-sm lg:text-base text-[#717182]">
          Indicadores de sustentabilidade e gestão de resíduos
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          title="Total de Resíduos Gerados"
          value="8.420 kg"
          icon={TrendingUp}
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          title="Material Reaproveitado"
          value="6.340 kg"
          icon={Recycle}
          trend="+18%"
          trendUp={true}
          iconColor="bg-[#66BB6A]/10 text-[#66BB6A]"
        />
        <StatCard
          title="Economia Gerada"
          value="R$ 47.800"
          icon={DollarSign}
          trend="+25%"
          trendUp={true}
        />
        <StatCard
          title="Redução de Impacto Ambiental"
          value="75%"
          icon={Leaf}
          trend="-15%"
          trendUp={true}
          iconColor="bg-[#66BB6A]/10 text-[#66BB6A]"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart - Tipos de Materiais */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#424242] mb-6">
            Tipos de Materiais
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={materialTypesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {materialTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Resíduos por Setor */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#424242] mb-6">
            Produção de Resíduos por Setor
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteByDepartmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="setor" stroke="#717182" />
              <YAxis stroke="#717182" />
              <Tooltip />
              <Bar dataKey="residuos" fill="#2E7D32" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart - Geração de Resíduos por Mês */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-[#424242] mb-6">
          Geração de Resíduos por Mês
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyWasteData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" stroke="#717182" />
            <YAxis stroke="#717182" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="kg"
              stroke="#2E7D32"
              strokeWidth={3}
              dot={{ fill: "#2E7D32", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}