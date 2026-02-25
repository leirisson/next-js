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
  getDocs,
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
  allComents: CommentsProps[];
}

interface CommentsProps {
  id: string
  comment: string;
  createdAt: string;
  email: string;
  taskId: string;
  user: string;
}

export default function Task({ item, allComents }: TaskProps) {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentsProps[]>(allComents || []);

  async function handleRegisterComments(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (comment === "") return;
    if (!session?.user?.email || !session?.user.name) return;

    try {
      const docRef = await addDoc(collection(firebaseDB, "comments"), {
        comment: comment,
        createdAt: new Date(),
        user: session?.user.name,
        email: session?.user.email,
        taskId: item.taskId,
      });

      setComment("");
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
            value={comment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            placeholder="digite o seu comentário..."
          />
          <button className={styles.button} disabled={!session?.user}>
            Comentar
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos os comentarios</h2>
        {comments.length === 0 && (
          <span>Nenhum cometario foi encontrado</span>
        )}

        {
          comments.map((item) => (
            <article key={item.id}>
              {item.comment}
            </article>
          ))
        }
      </section>
    </div>
  );
}

// pegando o id usando o server side rendering
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(firebaseDB, "tarefas", id);

  const queryComments = query(
    collection(firebaseDB, "comments"),
    where("taskId", "==", id),
  );

  const snapshotComments = await getDocs(queryComments);

  const allComents: CommentsProps[] = snapshotComments.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      email: doc.data().email,
      createdAt: data.createdAt.toDate().toISOString(), // convertendo o Timestamp antes de retornar.
      taskId: doc.data().taskId,
    };
  });

  console.log(allComents);

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

  return {
    props: {
      item: task,
      allComents: allComents,
    },
  };
};
