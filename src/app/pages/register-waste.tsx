import { useState } from "react";
import { Camera, Save, Wifi } from "lucide-react";
import { toast } from "sonner";

export function RegisterWaste() {
  const [formData, setFormData] = useState({
    materialType: "",
    weight: "",
    department: "",
    date: new Date().toISOString().split("T")[0],
    destination: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Material registrado com sucesso!");
    // Reset form
    setFormData({
      materialType: "",
      weight: "",
      department: "",
      date: new Date().toISOString().split("T")[0],
      destination: "",
    });
  };

  const handleBarcodeRead = () => {
    toast.info("Aguardando leitura do código de barras...");
    // Simula leitura de código de barras
    setTimeout(() => {
      toast.success("Código de barras lido com sucesso!");
    }, 1500);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#424242] mb-2">
          Registro de Resíduos
        </h1>
        <p className="text-[#717182]">
          Registre materiais descartados e sucatas metálicas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de Material */}
              <div>
                <label className="block text-sm text-[#424242] mb-2">
                  Tipo de Material
                </label>
                <select
                  value={formData.materialType}
                  onChange={(e) =>
                    setFormData({ ...formData, materialType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] border border-transparent focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  required
                >
                  <option value="">Selecione o tipo de material</option>
                  <option value="aco">Aço</option>
                  <option value="aluminio">Alumínio</option>
                  <option value="cobre">Cobre</option>
                  <option value="ferro">Ferro</option>
                  <option value="inox">Inox</option>
                  <option value="bronze">Bronze</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              {/* Peso */}
              <div>
                <label className="block text-sm text-[#424242] mb-2">
                  Peso ou Quantidade (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] border border-transparent focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Setor de Origem */}
              <div>
                <label className="block text-sm text-[#424242] mb-2">
                  Setor de Origem
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] border border-transparent focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  required
                >
                  <option value="">Selecione o setor</option>
                  <option value="producao">Produção</option>
                  <option value="montagem">Montagem</option>
                  <option value="estamparia">Estamparia</option>
                  <option value="pintura">Pintura</option>
                  <option value="usinagem">Usinagem</option>
                  <option value="manutencao">Manutenção</option>
                </select>
              </div>

              {/* Data */}
              <div>
                <label className="block text-sm text-[#424242] mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] border border-transparent focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  required
                />
              </div>

              {/* Destino */}
              <div>
                <label className="block text-sm text-[#424242] mb-2">
                  Destino do Material
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] border border-transparent focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  required
                >
                  <option value="">Selecione o destino</option>
                  <option value="reaproveitamento">Reaproveitamento Interno</option>
                  <option value="reciclagem">Reciclagem Externa</option>
                  <option value="descarte">Descarte Controlado</option>
                  <option value="venda">Venda para Terceiros</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBarcodeRead}
                  className="flex-1 bg-[#F5F5F5] hover:bg-[#E0E0E0] text-[#424242] py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Ler Código de Barras
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Registrar Material
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Hardware Control Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[#424242] mb-4">
              Controle de Hardware
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-[#66BB6A] hover:bg-[#4CAF50] text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                <Wifi className="w-5 h-5" />
                Conectar Dispositivo
              </button>
              <button className="w-full bg-[#F5F5F5] hover:bg-[#E0E0E0] text-[#424242] py-3 rounded-lg transition-colors font-medium">
                Ler Sensor
              </button>
              <button className="w-full bg-[#F5F5F5] hover:bg-[#E0E0E0] text-[#424242] py-3 rounded-lg transition-colors font-medium">
                Registrar Automaticamente
              </button>
              <button className="w-full bg-[#F5F5F5] hover:bg-[#E0E0E0] text-[#424242] py-3 rounded-lg transition-colors font-medium">
                Atualizar Dados do Hardware
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Status do Sistema</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ESP32:</span>
                <span className="font-medium">Conectado</span>
              </div>
              <div className="flex justify-between">
                <span>Arduino:</span>
                <span className="font-medium">Conectado</span>
              </div>
              <div className="flex justify-between">
                <span>Sensores:</span>
                <span className="font-medium">Ativos (3)</span>
              </div>
              <div className="flex justify-between">
                <span>Leitor de Barras:</span>
                <span className="font-medium">Pronto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
