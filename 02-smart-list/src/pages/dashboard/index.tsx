import { useSession, signOut, getSession } from "next-auth/react";
import Header from "@/src/_components/header";
import styles from "./styles.module.css";
import { BiUserCircle } from "react-icons/bi";
import { GiExitDoor } from "react-icons/gi";
import { GetServerSideProps } from "next";

export default function Dashboard() {
  const { data: session, status } = useSession();
  return (
    <>
      <Header>
        <div>
          <div>
            <span>
              <BiUserCircle size={32} />
            </span>
            <div>
              <p>Bem-Vindo</p>
              <p>Olá, Usuário</p>
            </div>
            <button onClick={() => signOut()}>
              <GiExitDoor size={24} color="#e74c3c" />
            </button>
          </div>
        </div>
      </Header>
      <div className={styles.container}></div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return  { props: {} };
};
