import React, { useContext, useEffect } from "react";
import Minicard from "../MiniCard/Minicard";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { CategoryContext } from "../../states/contexts/CategoryContext";

const Cats = () => {
  const { Cats, getcategory } = useContext(CategoryContext);

  useEffect(() => {
    getcategory();
  }, []);

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Grid container>
          <Grid container item xs={12} spacing={0}>
            {Cats.map((c) => {
              return (
                <Grid item xs={6} key={c.id}>
                  <Link to={`/cat/${c.id}`}>
                    <Minicard key={c.id} text={c.type} img={c.image} />
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Cats;
