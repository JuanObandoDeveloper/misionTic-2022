import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Adddocs.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "reactstrap";

export default function AddDoc() {
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    editorial: "",
    gender: "",
    edition: "",
    icbn: "",
    date: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (
      form.title.length > 0 &&
      form.author.length > 0 &&
      form.editorial.length > 0 &&
      form.gender.length > 0 &&
      form.edition.length > 0 &&
      form.icbn.length > 0 &&
      form.date.length > 0
    ) {
      const formatForm = {
        Titulo: form.title,
        Autor: form.author,
        Editorial: form.editorial,
        Genero: form.gender,
        Edicion: form.edition,
        Icbn: form.icbn,
        anoPublicacion: form.date,
      };
      const req = await fetch("/api/docs/createDoc", {
        method: "POST",
        body: JSON.stringify({ doc: formatForm }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      if (res.success) {
        router.push("/docs");
      } else {
        alert("Some field are incorrect");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Gestion Documental</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link className={styles.Link} href="/">
          <h3>Gestion Documental</h3>
        </Link>
        <div className={styles.header}>
          <Link className={styles.Link} href="/docs">
            Docs
          </Link>
          <Link className={styles.Link} href="/category">
            Categories
          </Link>
          <Link className={styles.Link} href="/inventory">
            Inventory
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Add Document</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Cien años de soledad"
              required
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Gabriel Garcia Marquez"
              required
              value={form.author}
              onChange={(e) => {
                setForm({ ...form, author: e.target.value });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="editorial">Editorial:</label>
            <input
              type="text"
              name="editorial"
              id="editorial"
              placeholder="Planeta"
              required
              value={form.editorial}
              onChange={(e) => {
                setForm({ ...form, editorial: e.target.value });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              name="gender"
              id="gender"
              placeholder="Realismo Magico"
              required
              value={form.gender}
              onChange={(e) => {
                setForm({ ...form, gender: e.target.value });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="edition">Edition:</label>
            <input
              type="text"
              name="edition"
              id="edition"
              placeholder="1"
              required
              value={form.edition}
              onChange={(e) => {
                setForm({ ...form, edition: e.target.value });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Icbn">Icbn:</label>
            <input
              type="text"
              name="Icbn"
              id="Icbn"
              placeholder="23rt56"
              required
              value={form.icbn}
              onChange={(e) => {
                setForm({ ...form, icbn: e.target.value });
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="Date">Date:</label>
            <input
              min={0}
              max={9999}
              type="number"
              name="Date"
              id="Date"
              placeholder="1976"
              required
              value={form.date}
              onChange={(e) => {
                setForm({ ...form, date: e.target.value });
              }}
            />
          </div>
          {loading ? (
            <>
              <div className={styles.formGroup}>
                <button className={styles.button} hidden={disable}>
                  Add
                </button>
                <Link
                  href="/docs"
                  className={styles.cancelBtn}
                  hidden={disable}
                >
                  Cancel
                </Link>
              </div>
              <Spinner hidden={!disable} />
            </>
          ) : (
            <></>
          )}
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
