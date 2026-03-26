import styles from "./page.module.css";


interface dataProps {
  id: number,
  name: string,
  ownner: {
    login: string,
    id: number,
    avatar_url: string,
    url: string
  }
}

async function getData(){
  const url ="https://api.github.com/users/devfraga/repos"
  const response = await fetch(url)
  return response.json()
}



export default async function Home() {
  const data: dataProps[] = await getData()

  console.log(data)


  return (
      <main className={styles.main}>
       <h1>Pagina 1</h1>
      <span>Seja bem vinda a pagina Home</span>
      <br />

      <h3>Repos</h3>
      {
        data.map((item) => (
          <div key={item.id}>
            <strong>Repo:</strong> {item.name}
          </div>
        ))
      }
      </main>
  );
}
