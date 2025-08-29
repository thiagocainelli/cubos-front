import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import background from "../../../public/images/background.png";

const letters = [
  { letter: "C", image: "/images/letter-c.png" },
  { letter: "U", image: "/images/letter-u.png" },
  { letter: "B", image: "/images/letter-b.png" },
  { letter: "O", image: "/images/letter-o.png" },
  { letter: "S", image: "/images/letter-s.png" },
];

const { Text } = Typography;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background com grayscale igual ao Layout */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: "grayscale(100%)",
        }}
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.8) 50%,
            rgba(0, 0, 0, 0.95) 100%
          )`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex gap-1">
            {letters?.map((letter) => (
              <img
                key={letter.letter}
                src={letter.image}
                alt={letter.letter}
                className="w-8 h-8 object-contain"
              />
            ))}
          </div>
        </div>

        <Text className={`mb-4 text-gray-100 text-4xl font-bold`}>
          Página não encontrada!
        </Text>

        <Text className={`text-lg mb-8 block text-gray-100`}>
          Desculpe, a página que você está procurando não existe ou foi movida.
          <br />
          Verifique o endereço ou navegue pelas opções abaixo.
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            onClick={handleGoHome}
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            className="flex-1 h-12 text-base font-medium"
            style={{
              background: "var(--purple-6)",
              borderColor: "var(--purple-6)",
            }}
          >
            Ir para o Início
          </Button>
        </div>
      </div>

      <div className="absolute top-20 left-10 opacity-20">
        <img src="/images/square.png" alt="" className="w-16 h-16 rotate-45" />
      </div>

      <div className="absolute bottom-20 right-10 opacity-20">
        <img src="/images/square.png" alt="" className="w-12 h-12 -rotate-12" />
      </div>
    </main>
  );
};

export default NotFoundPage;
