import "./CardContainer.css";
import ImgWiki from "../Image/iconWiki.png";
import ImgWeb from "../Image/domain.png";

const CardContainer = (props) => {
  const printActivities = props.arrayActivities ? (
    props.arrayActivities === "404" ? (
      <h2 id="error404">Sorry we did not find any city with that name 🐸</h2>
    ) : (
      props.arrayActivities.map((act, i) =>
        act.url || act.wikipedia ? (
          <li
            className="listCard"
            key={i}
            onClick={() =>
              act.url
                ? window.open(act.url)
                : act.wikipedia
                ? window.open(act.wikipedia)
                : console.log("Sorry")
            }
          >
            <div className="card">
              <div className="cardContent">
                <img
                  className="actImg"
                  src={act.preview ? act.preview.source : null}
                  alt={act.name}
                />
                <div className="titre">
                  <h3>{act.name}</h3>
                  <div className="logo">
                    {act.url ? (
                      <img className="logoImg" src={ImgWeb} alt="Website" />
                    ) : act.wikipedia ? (
                      <img className="logoImg" src={ImgWiki} alt="Wikipedia" />
                    ) : null}
                    <p>
                      {act.url
                        ? "Website"
                        : act.wikipedia
                        ? "Wikipedia"
                        : "No website or wikipedia page available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ) : null,
      )
    )
  ) : null;

  return <ul className="cardContainer">{printActivities}</ul>;
};

export default CardContainer;
