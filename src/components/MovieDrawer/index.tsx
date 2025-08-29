import { Button, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import MovieForm from "../forms/MovieForm";
import { createMovie, updateMovie } from "../../services/movies.service";
import { useState } from "react";
import Text from "../Text";
import { useToast } from "../../contexts/ToastContext";

interface MovieDrawerProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
}

const MovieDrawer = ({
  open,
  onClose,
  mode,
  initialValues,
  onSuccess,
}: MovieDrawerProps) => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      if (mode === "create") {
        await createMovie(values);
      } else {
        if (initialValues?.uuid) {
          await updateMovie(initialValues.uuid, values);
        } else {
          throw new Error("UUID do filme não encontrado para edição");
        }
      }

      showSuccess(
        `Filme ${mode === "create" ? "criado" : "atualizado"} com sucesso!`
      );

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar filme:", error);
      showError(
        `Erro ao ${
          mode === "create" ? "criar" : "atualizar"
        } filme. Tente novamente mais tarde.`
      );
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    return mode === "create" ? "Adicionar Filme" : "Editar Filme";
  };

  return (
    <Drawer
      closeIcon={null}
      placement="right"
      width={600}
      open={open}
      onClose={onClose}
    >
      <div className="flex items-center justify-between mb-3">
        <Text size="xlarge">{getTitle()}</Text>
        <Button type="text" onClick={onClose}>
          <CloseOutlined />
        </Button>
      </div>
      <div className="h-full">
        <MovieForm
          mode={mode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </Drawer>
  );
};

export default MovieDrawer;
