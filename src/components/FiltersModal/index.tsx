import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";
import { Input, Select, Button } from "../index";
import { useState } from "react";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  onResetFilters: () => void;
  initialFilters?: any;
}

const FiltersModal = ({
  open,
  onClose,
  onApplyFilters,
  onResetFilters,
  initialFilters = {},
}: FiltersModalProps) => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    genre: initialFilters.genre || "",
    situation: initialFilters.situation || "",
    durationMin: initialFilters.durationMin || "",
    durationMax: initialFilters.durationMax || "",
  });

  const movieGenres = [
    { label: "Ação", value: "Ação" },
    { label: "Aventura", value: "Aventura" },
    { label: "Comédia", value: "Comédia" },
    { label: "Drama", value: "Drama" },
    { label: "Ficção Científica", value: "Ficção Científica" },
    { label: "Terror", value: "Terror" },
    { label: "Suspense", value: "Suspense" },
    { label: "Romance", value: "Romance" },
    { label: "Documentário", value: "Documentário" },
    { label: "Animação", value: "Animação" },
    { label: "Biografia", value: "Biografia" },
    { label: "Guerra", value: "Guerra" },
    { label: "Musical", value: "Musical" },
    { label: "Faroeste", value: "Faroeste" },
    { label: "Mistério", value: "Mistério" },
    { label: "Policial", value: "Policial" },
    { label: "Outro", value: "Outro" },
  ];

  const movieSituations = [
    { label: "Em breve", value: "upcoming" },
    { label: "Lançado", value: "released" },
    { label: "Cancelado", value: "canceled" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    // Limpar estado local
    setFilters({
      genre: "",
      situation: "",
      durationMin: "",
      durationMax: "",
    });

    // Limpar filtros no backend
    onResetFilters();
  };

  // Estilos baseados no tema
  const getModalStyles = () => {
    if (theme === "light") {
      return {
        backgroundColor: "var(--mauve-1)",
        border: "1px solid var(--mauve-4)",
      };
    } else {
      return {
        backgroundColor: "var(--mauve-dark-2)",
        border: "1px solid var(--mauve-dark-6)",
      };
    }
  };

  const getHeaderStyles = () => {
    if (theme === "light") {
      return {
        backgroundColor: "var(--mauve-2)",
        borderBottom: "1px solid var(--mauve-4)",
        color: "var(--mauve-11)",
      };
    } else {
      return {
        backgroundColor: "var(--mauve-dark-3)",
        borderBottom: "1px solid var(--mauve-dark-6)",
        color: "var(--mauve-4)",
      };
    }
  };

  const getBodyStyles = () => {
    if (theme === "light") {
      return {
        backgroundColor: "var(--mauve-1)",
        color: "var(--mauve-11)",
      };
    } else {
      return {
        backgroundColor: "var(--mauve-dark-2)",
        color: "var(--mauve-4)",
      };
    }
  };

  const getFooterStyles = () => {
    if (theme === "light") {
      return {
        backgroundColor: "var(--mauve-2)",
        borderTop: "1px solid var(--mauve-4)",
      };
    } else {
      return {
        backgroundColor: "var(--mauve-dark-3)",
        borderTop: "1px solid var(--mauve-dark-6)",
      };
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      closeIcon={null}
      styles={{
        content: getModalStyles(),
        header: getHeaderStyles(),
        body: getBodyStyles(),
        footer: getFooterStyles(),
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-lg font-semibold">Filtros</span>
        <CloseOutlined onClick={onClose} />
      </div>

      <div className="space-y-6">
        {/* Gênero */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Gênero</label>
          <Select
            placeholder="Selecione o gênero"
            value={filters.genre}
            onChange={(value: string) => handleInputChange("genre", value)}
            options={movieGenres}
            size="large"
          />
        </div>
        {/* Situação */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Situação</label>
          <Select
            placeholder="Selecione a situação"
            value={filters.situation}
            onChange={(value: string | number) =>
              handleInputChange("situation", String(value))
            }
            options={movieSituations}
            size="large"
          />
        </div>
        {/* Range de duração */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Duração (em minutos)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Mínimo</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.durationMin}
                onChange={(value) => handleInputChange("durationMin", value)}
                size="small"
                min={0}
                max={999}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Máximo</label>
              <Input
                type="number"
                placeholder="999"
                value={filters.durationMax}
                onChange={(value) => handleInputChange("durationMax", value)}
                size="small"
                min={0}
                max={999}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end space-x-3 mt-5">
        <Button variant="secondary" onClick={handleResetFilters}>
          Limpar
        </Button>
        <Button variant="primary" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </div>
    </Modal>
  );
};

export default FiltersModal;
