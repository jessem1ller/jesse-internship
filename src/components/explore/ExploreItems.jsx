import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Countdown from "../reusable/Countdown";
import ItemsGridSkeletonLoader from "../reusable/ItemsGridSkeletonLoader";
import useAxiosFetch from "../../hooks/useAxiosFetch";

const ExploreItems = () => {
  const ITEMS_PER_LOAD = 4;
  const INITIAL_ITEMS_DISPLAY = 8;
  const TOTAL_ITEMS_AVAILABLE = 16;

  const [filter, setFilter] = useState("");
  const [visibleItemsCount, setVisibleItemsCount] = useState(
    INITIAL_ITEMS_DISPLAY
  );

  const apiUrl = useMemo(() => {
    let base =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filter) {
      return `${base}?filter=${filter}`;
    }
    return base;
  }, [filter]);

  const { data: allItems, loading, error } = useAxiosFetch(apiUrl, []);

  const itemsToDisplay = allItems.slice(0, visibleItemsCount);

  useEffect(() => {
    setVisibleItemsCount(INITIAL_ITEMS_DISPLAY);
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleItemsCount((prevCount) =>
      Math.min(prevCount + ITEMS_PER_LOAD, TOTAL_ITEMS_AVAILABLE)
    );
  };

  if (error) {
    console.error("Error fetching explore items:", error);
    return (
      <div className="text-center mt-5">
        Error loading items. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div>
        <div>
          <select
            id="filter-items"
            defaultValue={filter}
            onChange={handleFilterChange}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <ItemsGridSkeletonLoader
            count={INITIAL_ITEMS_DISPLAY}
            itemClassName="p-2 col-lg-3 col-md-6 col-sm-6 col-xs-12"
            skeletonHeight="350px"
          />
        ) : (
          itemsToDisplay.map((explore, index) => (
            <div
              key={explore.nftId || index}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${explore.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${explore.authorName || "Unknown"}`}
                  >
                    <img className="lazy" src={explore.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown-wrapper">
                  {explore.expiryDate && (
                    <Countdown expiryDate={explore.expiryDate} />
                  )}
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${explore.nftId}`}>
                    <img
                      src={explore.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${explore.nftId}`}>
                    <h4>{explore.title}</h4>
                  </Link>
                  <div className="nft__item_price">{explore.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{explore.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="col-md-12 text-center">
        {!loading && itemsToDisplay.length < TOTAL_ITEMS_AVAILABLE && (
          <Link
            to="#"
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        )}
        {!loading && itemsToDisplay.length === TOTAL_ITEMS_AVAILABLE && (
          <div className="text-center mt-3"></div>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
