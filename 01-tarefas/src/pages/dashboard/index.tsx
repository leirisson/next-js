import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import styles from "./styles.module.css";
import { TextArea } from "@/src/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { ChangeEvent, FormEvent, useState } from "react";

export default function Dashboard() {
  const [input, setInput] = useState<string>("");
  const [publictask, setPublicTask] = useState<boolean>();

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>){
    setPublicTask(e.target.checked)
  }

  function handleSubmitRegister(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()

    if(input === "") return

    alert("teste")

  }

  return (
    <>
      <div className={styles.conatiner}>
        <Head>
          <title>Meu painel de tarefas</title>
        </Head>
        <main className={styles.main}>
          <section className={styles.content}>
            <div className={styles.contentForm}>
              <h2 className={styles.title}>Qual é a sua nova tarefa ?</h2>
              <form onSubmit={handleSubmitRegister}>
                <TextArea
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                 placeholder="Digite a sua tarefa ..." />
                <div className={styles.checkBoxArea}>
                  <input
                  checked={publictask}
                  onChange={() => handleChangePublic}
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                    id="checkbox"
                  />
                  <label htmlFor="checkbox">Deixar tarefa publica ?</label>
                </div>
                <button className={styles.button} type="submit">
                  Registrar
                </button>
              </form>
            </div>
          </section>
          <section className={styles.taskcontainer}>
            <h1>Minhas Tarefas</h1>
            <article className={styles.task}>
              <div className={styles.tagContainer}>
                <label className={styles.tag}>PUBLICO</label>
                <button className={styles.shareButton}>
                  <FiShare2 size={22} color="#3183ff" />
                </button>
              </div>
              <div className={styles.teskContent}>
                <span>minha primeira tarefa da de exemplo</span>
                <button className={styles.trashButton}>
                  <FaTrash
                    className={styles.trashButton}
                    size={24}
                    color="#ea3140"
                  />
                </button>
              </div>
            </article>
            <article className={styles.task}>
              <div className={styles.tagContainer}>
                <label className={styles.tag}>PUBLICO</label>
                <button className={styles.shareButton}>
                  <FiShare2 size={22} color="#3183ff" />
                </button>
              </div>
              <div className={styles.teskContent}>
                <span>minha primeira tarefa da de exemplo</span>
                <button className={styles.trashButton}>
                  <FaTrash
                    className={styles.trashButton}
                    size={24}
                    color="#ea3140"
                  />
                </button>
              </div>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    // se não tiver usuario vamos redirecionar para pagina inicial
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
