import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Form,
  Spin,
  Upload,
  message,
  notification,
} from "antd";
import AddressForm from "../../components/forms/profile/AddressForm";
import PersonalForm from "../../components/forms/profile/PersonalForm";

import LayoutBase from "../../layout";
import type { GetProp, UploadProps } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Camera } from "lucide-react";
import ChangePasswordModal from "../../components/Modals/ChangePassword";
import { uploadProfileImage } from "../../services/file.service";
import HeaderPageWithBreadcrumb from "../../components/HeaderPageWithBreadcrumb";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [formPassword] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] =
    useState<boolean>(false);

  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleChange: UploadProps["onChange"] = async (info) => {
    getBase64(info.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
      setLoadingImage(false);
    });

    try {
      const formData = new FormData();
      formData.append("file", info.file.originFileObj as FileType);

      const response = await uploadProfileImage(formData);

      if (response) {
        notification.success({
          message: "Success!",
          placement: "bottomRight",
          description: "Image uploaded successfully!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // notification.error({
      //     message: "Error!",
      //     description: "Failed to upload image. Try again.",
      //     placement: "bottomRight",
      // });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{t("upload")}</div>
    </button>
  );

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setIsModalChangePasswordOpen(false);
        notification.success({
          message: "Success!",
          placement: "bottomRight",
          description: "Password changed successfully!",
        });
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutBase>
      <Spin spinning={loading} fullscreen />

      <ChangePasswordModal
        isOpen={isModalChangePasswordOpen}
        setIsOpen={setIsModalChangePasswordOpen}
        form={formPassword}
        handleUpdatePassword={handleUpdatePassword}
      />

      <Form
        className="w-full flex flex-col items-center justify-center rounded-md"
        form={form}
        layout="vertical"
        onFinish={() => form.submit()}
        autoComplete="off"
      >
        <HeaderPageWithBreadcrumb
          title={t("profile")}
          previousPageText="Dashboard"
          previousPageUrl="/dashboard"
          actualPage={t("profile")}
        />

        <section className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex flex-col gap-7 items-center">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              maxCount={1}
              multiple={false}
            >
              {imageUrl ? (
                <div className="relative">
                  <Avatar src={imageUrl} size={120} />
                  <Camera
                    size={24}
                    className="absolute bottom-0 right-[-5px]"
                  />
                </div>
              ) : (
                uploadButton
              )}
            </Upload>

            <Button onClick={() => setIsModalChangePasswordOpen(true)}>
              {t("changePassword")}
            </Button>
          </div>

          <PersonalForm form={form} />
        </section>

        <Divider />

        <AddressForm form={form} setIsLoading={setLoading} />

        <div className="w-full flex gap-2 justify-end">
          <Button size="large" onClick={() => navigate("/dashboard")}>
            {t("cancelButton")}
          </Button>
          <Button type="primary" htmlType="submit" size="large">
            {t("saveButton")}
          </Button>
        </div>
      </Form>
    </LayoutBase>
  );
};

export default ProfilePage;
