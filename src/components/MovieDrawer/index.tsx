import { Button, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import MovieForm from "../forms/MovieForm";
import { createMovie, updateMovie } from "../../services/movies.service";
import { notification } from "antd";
import { useState } from "react";
import Text from "../Text";

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

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      if (mode === "create") {
        await createMovie(values);
      } else {
        // Para edição, precisamos do UUID do filme
        if (initialValues?.uuid) {
          const { uuid, ...rest } = initialValues;
          await updateMovie({ ...rest, uuid });
        } else {
          throw new Error("UUID do filme não encontrado para edição");
        }
      }

      notification.success({
        message: `Filme ${
          mode === "create" ? "criado" : "atualizado"
        } com sucesso!`,
        placement: "bottomRight",
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar filme:", error);
      notification.error({
        message: `Erro ao ${mode === "create" ? "criar" : "atualizar"} filme`,
        description: "Tente novamente mais tarde.",
        placement: "bottomRight",
      });
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
        <Text size="large">{getTitle()}</Text>
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
