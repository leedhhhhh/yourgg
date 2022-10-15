import type { NextPage } from "next";
import Head from "next/head";
import { Typography, TextField, InputAdornment } from "@material-ui/core";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { playerNameState } from "./api/atom";

interface IFormInfo {
  name: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormInfo>();
  const setPlayerName = useSetRecoilState(playerNameState);
  const router = useRouter();

  const onValid = (data: IFormInfo) => {
    setPlayerName(data.name);
    router.push(`/players/${data.name}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>YOURGG</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://your.gg/ko/kr/home">YOUR.GG</a>
        </h1>

        <div className={styles.search}>
          <form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("name")}
              type="text"
              placeholder="소환사의 이름을 입력해주세요."
            />
            <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
