import React from "react";

import gatherImg from "../.././assets/img/gather.jpg";
import finalStockImg from "../.././assets/img/final-stock.jpg";
import missionMenImg from "../.././assets/img/mission__men.jpg";
import missionWomenImg from "../.././assets/img/mission__women.jpg";
import missionObjectsImg from "../.././assets/img/mission__objects.jpg";

import { ProductCard } from "./components/ProductCard";
import { Skeleton } from "./components/Skeleton";
import { Categories } from "./components/Categories";

import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/products/asyncActions";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { clearProducts } from "../../redux/products/slice";

const categoriesList = [
  "New Arrivals",
  "Final Stock",
  "Best Sellers",
  "Clothing",
  "Objects",
  "Face Masks",
];

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, paginationLinks, status } = useSelector(
    (state: RootState) => state.products
  );
  const [categoriesValue, setCategoriesValue] = React.useState(0);
  const currentCategory = categoriesList[categoriesValue];

  React.useEffect(() => {
    dispatch(fetchProducts({ currentCategory, _page: 1 }));
    return () => {
      dispatch(clearProducts());
    };
  }, [categoriesValue]);

  const fetchPagination = (links: any) => {
    if (links.next) {
      dispatch(
        fetchProducts({
          currentCategory,
          _page: links.next._page,
        })
      );
    }
  };

  return (
    <div className="App">
      <section className="product-intro">
        <div className="container">
          <div className="product-intro__text">
            <h2>Analog: The Simplest Productivity System</h2>
            <Link to="/" className="link-btn link-btn--medium link-btn--white">
              <p>Learn more</p>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <div className="products__inner">
            <Categories
              categoriesList={categoriesList}
              value={categoriesValue}
              setCategoriesValue={setCategoriesValue}
            />
            <div className="products__items">
              {status === "success"
                ? products.map((obj: any) => (
                    <ProductCard key={obj.id} {...obj} />
                  ))
                : status === "loading"
                ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                : "Произошла ошибка при загрузке товаров"}
            </div>
            <button
              disabled={!paginationLinks || !paginationLinks.next}
              onClick={() => fetchPagination(paginationLinks)}
              className="products__btn"
            >
              Shop New Arrivals
            </button>
          </div>
        </div>
      </section>

      <section className="presentation-block presentation-block--light-gray">
        <div className="container">
          <div className="presentation-block__inner">
            <div className="presentation-block__text">
              <h2>Final Stock - Up to 50% Off</h2>
              <Link to="/" className="link-btn link-btn--small">
                <p>Shop the sale</p>
                <span>→</span>
              </Link>
            </div>
            <img src={finalStockImg} alt="img" />
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <div className="mission__inner">
            <h2 className="mission__title">
              Our mission is to create simple, beautiful objects that combine
              form and function.
            </h2>
            <div className="mission__items-row">
              <div className="mission__item">
                <img src={missionMenImg} alt="" />
                <Link to="/" className="link-btn link-btn--large">
                  <p>Shop Mens</p>
                  <span>→</span>
                </Link>
              </div>
              <div className="mission__item">
                <img src={missionWomenImg} alt="" />
                <Link to="/" className="link-btn link-btn--large">
                  <p>Shop Womens</p>
                  <span>→</span>
                </Link>
              </div>
            </div>
            <div className="mission__items-row">
              <div className="mission__item">
                <img src={missionObjectsImg} alt="" />
                <Link to="/" className="link-btn link-btn--large">
                  <p>Shop Objects</p>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-block">
        <div className="container">
          <div className="presentation-block__inner">
            <div className="presentation-block__text">
              <h2>Gather</h2>
              <p>
                The minimal, modular desk organizer that cuts through the
                clutter
              </p>
              <Link to="/" className="link-btn link-btn--small">
                <p>Shop Gather</p>
                <span>→</span>
              </Link>
            </div>
            <img src={gatherImg} alt="img" />
          </div>
        </div>
      </section>

      <section className="history">
        <div className="history__text">
          <h2>
            A design studio in Downingtown, PA, creating and curating products
            that combine form & function
          </h2>
          <Link to="/" className="link-btn link-btn--medium link-btn--white">
            <p>Read Our Story</p>
            <span>→</span>
          </Link>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="contact__inner">
            <div className="contact__text">
              <h2>Stay in the loop</h2>
              <p>
                Be the first to know when new products drop and get
                behind-the-scenes content straight from Ugmonk’s founder.
              </p>
            </div>
            <div className="contact__form">
              <input type="email" placeholder="Enter your email" />
              <button>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__block">
              <div className="footer__column">
                <ul>
                  <li>
                    <Link to="/">Customer Service</Link>
                  </li>
                  <li>
                    <Link to="/">Help / FAQ</Link>
                  </li>
                  <li>
                    <Link to="/">Returns & Exchanges</Link>
                  </li>
                  <li>
                    <Link to="/">Sizing</Link>
                  </li>
                  <li>
                    <Link to="/">Gift Cards</Link>
                  </li>
                  <li>
                    <Link to="/">Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div className="footer__column">
                <ul>
                  <li>
                    <Link to="/">About</Link>
                  </li>
                  <li>
                    <Link to="/">Our Story</Link>
                  </li>
                  <li>
                    <Link to="/">Shop</Link>
                  </li>
                  <li>
                    <Link to="/">Journal</Link>
                  </li>
                  <li>
                    <Link to="/">About Our Tees</Link>
                  </li>
                  <li>
                    <Link to="/">Reviews</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__extra">
              <div className="footer__ugmonk">
                <div className="footer__ugmonk-text">
                  <h6>© Ugmonk 2021</h6>
                  <p>
                    All images and content may not be used without permission
                  </p>
                </div>
                <svg
                  className="footer__logo"
                  width="55"
                  height="88"
                  viewBox="0 0 55 88"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_0_9)">
                    <path
                      d="M38.9417 14.759H35.8929C35.4771 14.759 35.1307 15.1055 35.1307 15.5212V35.7543V35.8236C35.1307 40.0504 31.7354 43.4456 27.5086 43.4456C23.2819 43.4456 19.8866 40.0504 19.8866 35.8236V35.7543V15.5212C19.8866 15.1055 19.5401 14.759 19.1244 14.759H16.0756C15.6598 14.759 15.3134 15.1055 15.3134 15.5212V35.8236C15.3134 42.4756 20.6488 47.8803 27.3008 48.0189H27.5779H27.8551C34.4378 47.8803 39.8425 42.4756 39.8425 35.8236V15.5212C39.7732 15.1055 39.4267 14.759 38.9417 14.759Z"
                      fill="black"
                    />
                    <path
                      d="M53.7701 0.2771H1.31651C0.762184 0.2771 0.346436 0.692848 0.346436 1.24718V41.9905V46.7716V87.0299C0.346436 87.5842 0.762184 87.9999 1.31651 87.9999H53.7701C54.3244 87.9999 54.7401 87.5842 54.7401 87.0299V46.7716V41.9905V1.24718C54.7401 0.692848 54.3244 0.2771 53.7701 0.2771ZM4.78108 5.68182V5.19678C4.78108 4.91962 4.98896 4.64245 5.33541 4.64245H5.82045H49.4047H49.8897C50.1669 4.64245 50.4441 4.85033 50.4441 5.19678V5.68182V44.9007L28.3401 67.0047L27.9937 67.3511C27.7858 67.559 27.4394 67.559 27.2315 67.3511L26.885 67.0047L4.78108 44.9007V5.68182ZM50.3055 82.5952V83.0802C50.3055 83.3574 50.0976 83.6346 49.7512 83.6346H49.2661H5.75116H5.26612C4.98896 83.6346 4.71179 83.4267 4.71179 83.0802V82.5952V51.1369L26.8157 73.2409C27.1622 73.5873 27.7858 73.5873 28.2016 73.2409L50.3055 51.1369V82.5952Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_9">
                      <rect width="55" height="88" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="footer__socials">
                <Link to="/">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_0_18)">
                      <path
                        d="M15.0067 8.26172C10.7477 8.26172 7.31248 11.2676 7.31248 14.9941C7.31248 18.7207 10.7477 21.7266 15.0067 21.7266C19.2656 21.7266 22.7009 18.7207 22.7009 14.9941C22.7009 11.2676 19.2656 8.26172 15.0067 8.26172ZM15.0067 19.3711C12.2544 19.3711 10.0044 17.4082 10.0044 14.9941C10.0044 12.5801 12.2477 10.6172 15.0067 10.6172C17.7656 10.6172 20.0089 12.5801 20.0089 14.9941C20.0089 17.4082 17.7589 19.3711 15.0067 19.3711ZM24.8102 7.98633C24.8102 8.85937 24.0067 9.55664 23.0156 9.55664C22.0178 9.55664 21.221 8.85351 21.221 7.98633C21.221 7.11914 22.0245 6.41601 23.0156 6.41601C24.0067 6.41601 24.8102 7.11914 24.8102 7.98633ZM29.9062 9.58007C29.7924 7.47656 29.2433 5.61328 27.4821 4.07812C25.7276 2.54297 23.5982 2.0625 21.1942 1.95703C18.7165 1.83398 11.2902 1.83398 8.81248 1.95703C6.41516 2.05664 4.2857 2.53711 2.52454 4.07226C0.763379 5.60742 0.220969 7.4707 0.100433 9.57421C-0.0401916 11.7422 -0.0401916 18.2402 0.100433 20.4082C0.214272 22.5117 0.763379 24.375 2.52454 25.9101C4.2857 27.4453 6.40846 27.9258 8.81248 28.0312C11.2902 28.1543 18.7165 28.1543 21.1942 28.0312C23.5982 27.9316 25.7276 27.4512 27.4821 25.9101C29.2366 24.375 29.7857 22.5117 29.9062 20.4082C30.0468 18.2402 30.0468 11.748 29.9062 9.58007ZM26.7053 22.7344C26.183 23.8828 25.1718 24.7676 23.8526 25.2305C21.8772 25.916 17.1897 25.7578 15.0067 25.7578C12.8236 25.7578 8.12945 25.9101 6.1607 25.2305C4.8482 24.7734 3.83704 23.8887 3.30802 22.7344C2.52454 21.0058 2.70534 16.9043 2.70534 14.9941C2.70534 13.084 2.53124 8.97656 3.30802 7.2539C3.83034 6.10547 4.8415 5.2207 6.1607 4.75781C8.13614 4.07226 12.8236 4.23047 15.0067 4.23047C17.1897 4.23047 21.8839 4.07812 23.8526 4.75781C25.1651 5.21484 26.1763 6.09961 26.7053 7.2539C27.4888 8.98242 27.308 13.084 27.308 14.9941C27.308 16.9043 27.4888 21.0117 26.7053 22.7344Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_18">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link to="/">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.9162 8.88969C26.9353 9.15617 26.9353 9.42271 26.9353 9.6892C26.9353 17.8173 20.7488 27.1828 9.44162 27.1828C5.95811 27.1828 2.72209 26.1739 0 24.4227C0.494941 24.4798 0.970781 24.4988 1.48477 24.4988C4.35908 24.4988 7.00506 23.528 9.11801 21.872C6.41496 21.8148 4.14973 20.0445 3.36926 17.608C3.75 17.665 4.13068 17.7031 4.53047 17.7031C5.08248 17.7031 5.63455 17.627 6.14848 17.4938C3.33123 16.9227 1.21822 14.4481 1.21822 11.4595V11.3834C2.03672 11.8402 2.98857 12.1258 3.99738 12.1638C2.34129 11.0597 1.25631 9.17522 1.25631 7.04322C1.25631 5.90111 1.56082 4.85416 2.09385 3.94045C5.12051 7.67141 9.67002 10.1079 14.7715 10.3745C14.6763 9.9176 14.6192 9.44176 14.6192 8.96586C14.6192 5.5775 17.3603 2.81738 20.7677 2.81738C22.538 2.81738 24.1369 3.55977 25.2601 4.759C26.6496 4.49252 27.9821 3.97854 29.1623 3.27424C28.7054 4.70193 27.7346 5.90117 26.4593 6.66254C27.6966 6.52936 28.8959 6.18664 29.9999 5.7108C29.1625 6.92902 28.1154 8.014 26.9162 8.88969Z"
                      fill="black"
                    />
                  </svg>
                </Link>
                <Link to="/">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 3.32227V26.6719C30 27.4746 29.2567 28.1191 28.346 28.1191H20.6987V17.959H24.596L25.1786 13.998H20.692V11.4668C20.692 10.3184 21.0536 9.53906 22.9353 9.53906H25.3326V5.99414C24.9174 5.94727 23.4978 5.83594 21.8371 5.83594C18.3817 5.83594 16.0112 7.68164 16.0112 11.0742V13.998H12.1004V17.959H16.0112V28.125H1.65402C0.743304 28.125 0 27.4746 0 26.6777V3.32227C0 2.52539 0.743304 1.875 1.65402 1.875H28.3393C29.2567 1.875 30 2.52539 30 3.32227Z"
                      fill="black"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
