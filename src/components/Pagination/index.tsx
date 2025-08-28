import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const { theme } = useTheme();

  // Função para gerar o array de páginas a serem exibidas
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Se temos 5 páginas ou menos, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar 5 páginas com ellipsis quando necessário
      if (currentPage <= 3) {
        // Páginas iniciais: 1, 2, 3, 4, 5
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Páginas finais: totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Páginas do meio: currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Estilos base para os botões
  const getButtonStyles = (isActive: boolean, isDisabled: boolean = false) => {
    if (isDisabled) {
      return {
        backgroundColor:
          theme === "light" ? "var(--mauve-3)" : "var(--mauve-dark-4)",
        color: theme === "light" ? "var(--mauve-8)" : "var(--mauve-6)",
        cursor: "not-allowed",
        opacity: 0.6,
      };
    }

    if (isActive) {
      return {
        backgroundColor: "var(--purple-9)",
        color: "var(--purple-1)",
        cursor: "pointer",
      };
    }

    return {
      backgroundColor:
        theme === "light" ? "var(--mauve-3)" : "var(--mauve-dark-4)",
      color: theme === "light" ? "var(--mauve-8)" : "var(--mauve-6)",
      cursor: "pointer",
    };
  };

  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Botão Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          style={getButtonStyles(false, currentPage === 1)}
        >
          <LeftOutlined className="text-sm" />
        </button>

        {/* Páginas numeradas */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200 hover:scale-105 ${
              currentPage === page ? "ring-2 ring-purple-300" : ""
            }`}
            style={getButtonStyles(currentPage === page)}
          >
            <span className="text-sm font-medium">{page}</span>
          </button>
        ))}

        {/* Botão Próximo */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          style={getButtonStyles(false, currentPage === totalPages)}
        >
          <RightOutlined className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
