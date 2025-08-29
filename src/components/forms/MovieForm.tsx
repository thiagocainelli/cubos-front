import { useEffect, useState } from "react";
import { Form as AntForm, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import dayjs from "dayjs";
import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";
import Button from "../Button";
import DatePicker from "../DatePicker";
import CurrencyInput from "../CurrencyInput";
import { deleteFile, uploadFile } from "../../services/storage.service";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import {
  movieLanguages,
  movieSituations,
  movieGenres,
} from "../../constants/Movies/constants";

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
  const { showSuccess, showError } = useToast();
  const [form] = AntForm.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      let fileUuid: string | undefined;
      let fileUrl: string | undefined;

      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          const formData = new FormData();
          formData.append("file", file.originFileObj as any);
          const resp = await uploadFile(formData);
          fileUuid = resp.uuid;
          fileUrl = resp.url;
        }
      }

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
        budget: values.budget ? Math.round(Number(values.budget)) : undefined,
        revenue: values.revenue
          ? Math.round(Number(values.revenue))
          : undefined,
        popularity: values.popularity ? Number(values.popularity) : undefined,
        profit: values.profit ? Math.round(Number(values.profit)) : undefined,
        votesQuantity: values.votesQuantity
          ? Number(values.votesQuantity)
          : undefined,
        ratingPercentage: values.ratingPercentage
          ? Number(values.ratingPercentage)
          : undefined,
        userUuid: user?.uuid,
      };

      await onSubmit(processedValues);

      showSuccess(
        `Filme ${mode === "create" ? "criado" : "atualizado"} com sucesso!`
      );

      form.resetFields();
      setFileList([]);
    } catch (error) {
      showError(
        `Erro ao ${
          mode === "create" ? "criar" : "atualizar"
        } filme. Tente novamente mais tarde.`
      );
    }
  };

  const uploadProps: UploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        showError("Você só pode fazer upload de arquivos de imagem!");
        return false;
      }
      return false;
    },
    maxCount: 1,
    accept: "image/*",
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    async onRemove(file) {
      if (file && file.uid) {
        await deleteFile(file.uid);

        setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
      }
    },
    listType: "picture",
  };

  useEffect(() => {
    if (initialValues && form) {
      const {
        releaseDate,
        posterUrl,
        posterUuid,
        budget,
        revenue,
        profit,
        ...rest
      } = initialValues;

      if (posterUrl && posterUuid) {
        setFileList([
          {
            uid: posterUuid,
            name: "image.png",
            status: "done",
            url: posterUrl,
          },
        ]);
      }

      let processedReleaseDate = releaseDate;
      if (releaseDate && typeof releaseDate === "string") {
        try {
          const dayjsDate = dayjs(releaseDate);
          processedReleaseDate = dayjsDate.isValid() ? dayjsDate : undefined;
        } catch (error) {
          console.warn("Erro ao converter data:", error);
          processedReleaseDate = undefined;
        }
      }

      // Usar setTimeout para garantir que o formulário esteja pronto
      setTimeout(() => {
        form.setFieldsValue({
          ...rest,
          releaseDate: processedReleaseDate,
          budget: budget,
          revenue: revenue,
          profit: profit,
        });
      }, 100);
    }
  }, [initialValues, form]);

  return (
    <AntForm
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
    >
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
          rules={[
            {
              required: true,
              message: "Por favor, insira a duração do filme",
            },
          ]}
        >
          <Input
            size="small"
            type="number"
            placeholder="Ex: 150"
            min={1}
            max={999}
          />
        </AntForm.Item>
      </div>
      {/* Orçamento, Receita e Lucro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AntForm.Item name="budget" label="Orçamento (USD)">
          <CurrencyInput size="small" placeholder="Ex: 1.000.000" />
        </AntForm.Item>

        <AntForm.Item name="revenue" label="Receita (USD)">
          <CurrencyInput size="small" placeholder="Ex: 2.000.000" />
        </AntForm.Item>

        <AntForm.Item name="profit" label="Lucro (USD)">
          <CurrencyInput
            size="small"
            placeholder="Ex: 1.000.000"
            allowNegative={true}
          />
        </AntForm.Item>
      </div>
      {/* Popularidade, Votos e Rating */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AntForm.Item name="popularity" label="Popularidade">
          <Input
            size="small"
            type="number"
            placeholder="Ex: 85"
            min={0}
            max={100}
          />
        </AntForm.Item>

        <AntForm.Item name="votesQuantity" label="Quantidade de Votos">
          <Input size="small" type="number" placeholder="Ex: 1000" min={0} />
        </AntForm.Item>

        <AntForm.Item name="ratingPercentage" label="Rating (%)">
          <Input
            size="small"
            type="number"
            placeholder="Ex: 92"
            min={0}
            max={100}
          />
        </AntForm.Item>
      </div>
      {/* Trailer */}
      <AntForm.Item name="trailerUrl" label="URL do Trailer">
        <Input
          size="small"
          placeholder="Ex: https://www.youtube.com/watch?v=..."
        />
      </AntForm.Item>
      {/* Upload do Poster */}
      <AntForm.Item label="Poster do Filme">
        <Upload {...uploadProps}>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            type="button"
          >
            <UploadOutlined />
            Selecionar Poster
          </Button>
        </Upload>
      </AntForm.Item>
      {/* Botões de Ação */}
      <div className="flex justify-end gap-3 pt-4 pb-5">
        <Button
          variant="secondary"
          onClick={() => form.resetFields()}
          type="button"
        >
          Limpar
        </Button>
        <Button variant="primary" type="submit" loading={loading}>
          {mode === "create" ? "Criar Filme" : "Atualizar Filme"}
        </Button>
      </div>
    </AntForm>
  );
};

export default MovieForm;
