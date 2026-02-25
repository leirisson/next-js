import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { firebaseDB } from "@/src/services/firebase";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc
} from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import styles from "./styles.module.css";
import { TextArea } from "@/src/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

interface HomeProps {
  user: {
    email: string;
  };
}

interface TaskProps {
  id: string;
  tarefa: string;
  user: string;
  public: boolean;
  createdAt: Date;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState<string>("");
  const [publictask, setPublicTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTarefas() {
      const tarefasRef = collection(firebaseDB, "tarefas");
      const queryInDataBase = query(
        tarefasRef,
        orderBy("createdAt"),
        where("user", "==", user.email),
      );
      /**
       * O onSnapshot fica sempre monitorando o banco
       */
      onSnapshot(queryInDataBase, (snapshot) => {
        const listaDeTarefas: TaskProps[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          tarefa: doc.data().tarefa,
          user: doc.data().user,
          public: doc.data().public,
          createdAt: doc.data().createdAt,
        }));

        setTasks(listaDeTarefas);
      });
    }

    loadTarefas();
  }, [user.email]);

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked);
    setPublicTask(e.target.checked);
  }

  async function handleSubmitRegister(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(firebaseDB, "tarefas"), {
        tarefa: input,
        createdAt: new Date(),
        user: user.email,
        public: publictask,
      });

      setInput("");
      setPublicTask(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function  handleshare(id:string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    )

    alert('url copiada com sucesso !')
  }

  async function handledeltetask(id:string){
    const docref = doc(firebaseDB,"tarefas", id)
    await deleteDoc(docref)
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
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setInput(e.target.value)
                  }
                  placeholder="Digite a sua tarefa ..."
                />
                <div className={styles.checkBoxArea}>
                  <input
                    checked={publictask}
                    onChange={handleChangePublic}
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
            {tasks.map((itemTask) => (
              <article key={itemTask.id} className={styles.task}>
                {/* verifica se o item é publico ou não  */}
                {itemTask.public && ( 
                  <div className={styles.tagContainer}>
                    <label className={styles.tag}>PUBLICO</label>
                    <button className={styles.shareButton} onClick={() => handleshare(itemTask.id)}>
                      <FiShare2 size={22} color="#3183ff" />
                    </button>
                  </div>
                )}
                <div className={styles.teskContent}>
                  {itemTask.public ? (
                    <Link href={`/task/${itemTask.id}`}>
                      <span>{itemTask.tarefa}</span>
                    </Link>
                  ) : (
                    <span>{itemTask.tarefa}</span>
                  )}
                  <button className={styles.trashButton} onClick={() => handledeltetask(itemTask.id)}>
                    <FaTrash
                      className={styles.trashButton}
                      size={24}
                      color="#ea3140"
                    />
                  </button>
                </div>
              </article>
            ))}
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
    props: {
      user: {
        email: session.user.email,
      },
    },
  };
};


