import { useEffect, useState } from "react";
import { Form as AntForm, notification, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";
import Button from "../Button";
import DatePicker from "../DatePicker";
import { uploadFile } from "../../services/storage.service";
import { useAuth } from "../../contexts/AuthContext";
import dayjs, { Dayjs } from "dayjs";

const movieLanguages = [
  { label: "Português (Brasil)", value: "pt-BR" },
  { label: "Inglês (EUA)", value: "en-US" },
  { label: "Espanhol", value: "es-ES" },
  { label: "Francês", value: "fr-FR" },
  { label: "Alemão", value: "de-DE" },
];

const movieSituations = [
  { label: "Em breve", value: "upcoming" },
  { label: "Lançado", value: "released" },
  { label: "Cancelado", value: "canceled" },
];

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

interface MovieFormProps {
  initialValues?: any;
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
  mode: "create" | "edit";
}

const MovieForm = ({
  initialValues,
  onSubmit,
  loading = false,
  mode,
}: MovieFormProps) => {
  const { user } = useAuth();
  const [form] = AntForm.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      let fileUuid: string | undefined;
      let fileUrl: string | undefined;
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const formData = new FormData();
        formData.append("file", file.originFileObj as any);
        const resp = await uploadFile(formData);
        fileUuid = resp.uuid;
        fileUrl = resp.url;
      }

      // Processar valores antes de enviar
      const processedValues = {
        title: values.title,
        originalTitle: values.originalTitle,
        language: values.language,
        situation: values.situation,
        synopsis: values.synopsis,
        genre: values.genre,
        posterUuid: fileUuid,
        posterUrl: fileUrl,
        trailerUrl: values.trailerUrl,
        releaseDate: values.releaseDate?.toISOString(),
        durationInMinutes: values.durationInMinutes
          ? Number(values.durationInMinutes)
          : undefined,
        budget: values.budget ? Number(values.budget) : undefined,
        revenue: values.revenue ? Number(values.revenue) : undefined,
        popularity: values.popularity ? Number(values.popularity) : undefined,
        votesQuantity: values.votesQuantity
          ? Number(values.votesQuantity)
          : undefined,
        ratingPercentage: values.ratingPercentage
          ? Number(values.ratingPercentage)
          : undefined,
        userUuid: user?.uuid,
      };

      await onSubmit(processedValues);

      notification.success({
        message: `Filme ${
          mode === "create" ? "criado" : "atualizado"
        } com sucesso!`,
        placement: "bottomRight",
      });

      form.resetFields();
      setFileList([]);
    } catch (error) {
      notification.error({
        message: `Erro ao ${mode === "create" ? "criar" : "atualizar"} filme`,
        description: "Tente novamente mais tarde.",
        placement: "bottomRight",
      });
    }
  };

  const uploadProps: UploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        notification.error({
          message: "Você só pode fazer upload de arquivos de imagem!",
          placement: "bottomRight",
        });
        return false;
      }

      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification.error({
          message: "A imagem deve ser menor que 2MB!",
          placement: "bottomRight",
        });
        return false;
      }

      return false; // Não fazer upload automático
    },
    maxCount: 1,
    accept: "image/*",
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
  };

  useEffect(() => {
    if (initialValues) {
      const { releaseDate, ...rest } = initialValues;
      form.setFieldsValue({
        ...rest,
        releaseDate,
      });
    }
  }, [initialValues, form]);

  return (
    <AntForm
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
    >
      {/* Título e Título Original */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AntForm.Item
          name="title"
          label="Título"
          rules={[
            { required: true, message: "Por favor, insira o título do filme" },
          ]}
        >
          <Input size="small" placeholder="Ex: Vingadores: Ultimato" />
        </AntForm.Item>

        <AntForm.Item
          name="originalTitle"
          label="Título Original"
          rules={[
            { required: true, message: "Por favor, insira o título original" },
          ]}
        >
          <Input size="small" placeholder="Ex: Avengers: Endgame" />
        </AntForm.Item>
      </div>
      Idioma e Situação
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AntForm.Item
          name="language"
          label="Idioma"
          rules={[{ required: true, message: "Por favor, selecione o idioma" }]}
        >
          <Select
            size="large"
            placeholder="Selecione o idioma"
            options={movieLanguages}
          />
        </AntForm.Item>

        <AntForm.Item
          name="situation"
          label="Situação"
          rules={[
            { required: true, message: "Por favor, selecione a situação" },
          ]}
        >
          <Select
            size="large"
            placeholder="Selecione a situação"
            options={movieSituations}
          />
        </AntForm.Item>
      </div>
      {/* Sinopse */}
      <AntForm.Item
        name="synopsis"
        label="Sinopse"
        rules={[{ required: true, message: "Por favor, insira a sinopse" }]}
      >
        <TextArea size="small" placeholder="Descreva a história do filme..." />
      </AntForm.Item>
      {/* Gêneros */}
      <AntForm.Item name="genre" label="Gêneros">
        <Select
          size="large"
          placeholder="Selecione o gênero"
          options={movieGenres}
          mode="multiple"
        />
      </AntForm.Item>
      {/* Data de Lançamento e Duração */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AntForm.Item
          name="releaseDate"
          label="Data de Lançamento"
          rules={[
            {
              required: true,
              message: "Por favor, selecione a data de lançamento",
            },
          ]}
        >
          <DatePicker size="medium" placeholder="Selecione a data" />
        </AntForm.Item>

        <AntForm.Item
          name="durationInMinutes"
          label="Duração (minutos)"
          rules={[{ required: true, message: "Por favor, insira a duração" }]}
        >
          <Input
            size="small"
            type="number"
            placeholder="Ex: 150"
            min={1}
            max={500}
          />
        </AntForm.Item>
      </div>
      {/* Orçamento e Receita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AntForm.Item name="budget" label="Orçamento (USD)">
          <Input
            size="small"
            type="number"
            placeholder="Ex: 300000000"
            min={0}
          />
        </AntForm.Item>

        <AntForm.Item name="revenue" label="Receita (USD)">
          <Input
            size="small"
            type="number"
            placeholder="Ex: 2797800564"
            min={0}
          />
        </AntForm.Item>
      </div>
      <AntForm.Item name="trailerUrl" label="URL do Trailer">
        <Input
          size="small"
          placeholder="Ex: https://www.youtube.com/watch?v=..."
        />
      </AntForm.Item>
      <AntForm.Item name="poster" label="Poster do Filme" className="w-full">
        <Upload {...uploadProps} listType="picture-card" className="w-full">
          <div className="w-full">
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </AntForm.Item>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AntForm.Item name="popularity" label="Popularidade">
          <Input
            size="small"
            type="number"
            placeholder="0-100"
            min={0}
            max={100}
          />
        </AntForm.Item>

        <AntForm.Item name="votesQuantity" label="Quantidade de Votos">
          <Input size="small" type="number" placeholder="Ex: 1000" min={0} />
        </AntForm.Item>

        <AntForm.Item name="ratingPercentage" label="Avaliação (%)">
          <Input
            size="small"
            type="number"
            placeholder="0-100"
            min={0}
            max={100}
          />
        </AntForm.Item>
      </div>
      {/* Botões de ação */}
      <div className="flex justify-end gap-3 py-5">
        <Button
          isTextBlack
          onClick={() => form.resetFields()}
          variant="secondary"
        >
          Limpar
        </Button>
        <Button type="submit" loading={loading} variant="primary">
          {mode === "create" ? "Criar Filme" : "Atualizar Filme"}
        </Button>
      </div>
    </AntForm>
  );
};

export default MovieForm;
