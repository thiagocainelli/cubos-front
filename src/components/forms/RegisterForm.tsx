import React from "react";
import { Form as AntForm } from "antd";
import { useNavigate } from "react-router-dom";

import { register } from "../../services/auth.service";
import Form from "../Form";
import Input from "../Input";
import Button from "../Button";
import Link from "../Link";
import { useToast } from "../../contexts/ToastContext";

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  redirectTo = "/",
}) => {
  const [form] = AntForm.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const { showSuccess, showError } = useToast();

  const handleRegister = async () => {
    try {
      setLoading(true);

      const name = form.getFieldValue("name");
      const email = form.getFieldValue("email");
      const password = form.getFieldValue("password");

      if (!name || !email || !password) {
        showError("Por favor, preencha todos os campos.");
        return;
      }

      const registerData = {
        name,
        email: email.toLowerCase().trim(),
        password,
      };

      const response = await register(registerData);

      if (response) {
        showSuccess("Conta criada com sucesso!");

        onSuccess?.();
        navigate(redirectTo);
      }
    } catch (error) {
      console.error(error);
      showError("Falha ao criar conta. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleRegister}
      title="Criar Conta"
      subtitle="Preencha as informações abaixo para criar sua conta"
    >
      <AntForm.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Nome é obrigatório" }]}
      >
        <Input placeholder="Digite seu nome" size="small" />
      </AntForm.Item>

      <AntForm.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "E-mail é obrigatório" },
          { type: "email", message: "E-mail inválido" },
        ]}
      >
        <Input placeholder="Digite seu e-mail" size="small" />
      </AntForm.Item>

      <AntForm.Item
        label="Senha"
        name="password"
        rules={[
          { required: true, message: "Senha é obrigatória" },
          { min: 6, message: "Senha deve ter pelo menos 6 caracteres" },
          { max: 128, message: "Senha deve ter no máximo 128 caracteres" },
        ]}
      >
        <Input type="password" placeholder="Digite sua senha" size="small" />
      </AntForm.Item>

      <AntForm.Item
        label="Confirmação de senha"
        name="confirmPassword"
        rules={[
          { required: true, message: "Confirmação de senha é obrigatória" },
          {
            min: 6,
            message: "Confirmação de senha deve ter pelo menos 6 caracteres",
          },
          {
            max: 128,
            message: "Confirmação de senha deve ter no máximo 128 caracteres",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("As senhas não coincidem"));
            },
          }),
        ]}
      >
        <Input
          type="password"
          placeholder="Digite sua senha novamente"
          size="small"
        />
      </AntForm.Item>

      <div className="mt-6">
        <Button
          variant="primary"
          type="submit"
          // onClick={() => form.submit()}
          loading={loading}
          className="w-full"
        >
          Cadastrar
        </Button>
      </div>

      <div className="text-center mt-6">
        <span className="text-mauve-6 dark:text-mauve-4">
          Já tem uma conta?{" "}
        </span>
        <Link to="/" variant="primary">
          Faça login
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
