import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";
import { firebaseDB } from "../../services/firebase";
import {
  doc,
  where,
  collection,
  query,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { redirect } from "next/dist/server/api-utils";
import { TextArea } from "@/src/components/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

interface TaskProps {
  item: {
    public: boolean;
    tarefa: string;
    user: string;
    taskId: string;
    createdAt: string;
  };
}

export default function Task({ item }: TaskProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<string>("");

  async function handleRegisterComments(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (comments === "") return;
    if (!session?.user?.email || !session?.user.name) return;

  

    try {
      const docRef = await addDoc(collection(firebaseDB, "comments"), {
        comments,
        createdAt: new Date(),
        user: session?.user.name,
        email: session?.user.email,
        taskId: item.taskId,
      });

      setComments("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>
      <main className={styles.main}>
        <h1>teste</h1>
        <article className={styles.task}>
          <p>{item.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContaine}>
        <h2>Deixar o seu comentario</h2>

        <form
          className={styles.formContainer}
          onSubmit={handleRegisterComments}
        >
          <TextArea
            value={comments}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setComments(e.target.value)
            }
            placeholder="digite o seu comentário..."
          />
          <button className={styles.button} disabled={!session?.user}>
            Comentar
          </button>
        </form>
      </section>
    </div>
  );
}

// pegando o id usando o server side rendering
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(firebaseDB, "tarefas", id);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.createdAt.seconds * 1000;
  const task = {
    taskId: snapshot.id,
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    user: snapshot.data()?.user,
    createdAt: new Date(miliseconds).toLocaleDateString(),
  };

  console.log(task)

  return {
    props: { item: task },
  };
};
