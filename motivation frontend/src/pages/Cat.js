import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CatCard from "../components/Home/CatCard";
import Grid from "@material-ui/core/Grid";
import ArticleCard from "../components/Home/ArticleCard";
import { ArticleContext } from "../states/contexts/ArticleContext";
import { BooksContext } from "../states/contexts/BooksContext";
import { VideoContext } from "../states/contexts/VideoContext";
import { CategoryContext } from "../states/contexts/CategoryContext";

import { useParams, Link } from "react-router-dom";
import "./cat.css";
const CAT = () => {
  const { Articles, getArticles } = useContext(ArticleContext);
  const { Books, getBooks } = useContext(BooksContext);
  const { Videos, getvideos } = useContext(VideoContext);
  const { setDesc } = useContext(CategoryContext);

  const catid = useParams().catid;
  useEffect(() => {
    getArticles();
    getBooks();
    getvideos();
  }, []);

  return (
    <div className="center">
      <Header bool={true} num={-1} />
      <div className="AAA">
        <h1
          style={{
            marginTop: "60px ",
            textAlign: "center",
            color: "#868585",
            marginBottom: "40px",
          }}
        >
          EVERY STEP COUNTS...
        </h1>
        <div className="roB">
          <div className="columnB">
            <CatCard color="#868585" text="Videos" />
          </div>

          <div className="columnB">
            <CatCard color="#DDB091" text="Articles" />
          </div>

          <div className="columnB">
            <CatCard color="#868585" text="Books" />
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          <Grid container>
            <Grid container item xs={12} spacing={3}>
              {Articles.map((a) => {
                setDesc(a.description);
                return a.thecat === catid ? (
                  <Grid item xs={4}>
                    <Link
                      to={`/catdetail/${a.image}/${a.title}/${a.undertitle}`}
                    >
                      <ArticleCard
                        img={a.image}
                        title={a.title}
                        undertitle={a.undertitle}
                        key={a.id}
                      />
                    </Link>
                  </Grid>
                ) : null;
              })}
            </Grid>
            <Grid container item xs={12} spacing={3}>
              {Books.map((a) =>
                a.thecat === catid ? (
                  <Grid item xs={4}>
                    <ArticleCard
                      img={a.image}
                      title={a.title}
                      undertitle={a.undertitle}
                      key={a.id}
                    />
                  </Grid>
                ) : null
              )}
            </Grid>
            <Grid container item xs={12} spacing={3}>
              {Videos.map((a) =>
                a.thecat === catid ? (
                  <Grid item xs={4}>
                    <ArticleCard
                      img={a.image}
                      title={a.title}
                      undertitle={a.undertitle}
                      key={a.id}
                    />
                  </Grid>
                ) : null
              )}
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CAT;
