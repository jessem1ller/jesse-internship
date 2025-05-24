import React from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import ItemsGridSkeletonLoader from "../reusable/ItemsGridSkeletonLoader";

const HotCollections = () => {
  const {
    data: collections,
    loading,
    error,
  } = useAxiosFetch(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
  );

  if (error) {
    console.error("Error fetching hot collections:", error);
    return <div>Error loading hot collections. Please try again later.</div>;
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <ItemsGridSkeletonLoader
              count={4}
              itemClassName="col-lg-3 col-md-6 col-sm-12"
              skeletonHeight="350px"
            />
          ) : (
            <OwlCarousel
              loop
              nav
              margin={10}
              responsive={{
                0: { items: 1 },
                566: { items: 2 },
                768: { items: 3 },
                991: { items: 4 },
              }}
            >
              {collections.map((collection, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
