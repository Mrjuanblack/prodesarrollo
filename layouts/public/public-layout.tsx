import { FC } from "react";
import { Footer, Header } from "@/ui/organism";

const PublicLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
