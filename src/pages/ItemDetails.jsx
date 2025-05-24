import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import useAxiosFetch from '../hooks/useAxiosFetch';
import ItemsGridSkeletonLoader from '../components/reusable/ItemsGridSkeletonLoader';

const ItemDetails = () => {
  const { nftId } = useParams();
  const API_BASE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net";

  const { data: item, loading, error } = useAxiosFetch(`${API_BASE_URL}/itemDetails?nftId=${nftId}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <ItemsGridSkeletonLoader
                    count={1}
                    itemClassName=""
                    skeletonWidth="100%"
                    skeletonHeight="400px"
                    borderRadius="8px"
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2><ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="80%" skeletonHeight="30px" /></h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="60px" skeletonHeight="20px" />
                      </div>
                      <div className="item_info_like">
                        <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="60px" skeletonHeight="20px" />
                      </div>
                    </div>
                    <p>
                      <ItemsGridSkeletonLoader count={3} itemClassName="" skeletonWidth="100%" skeletonHeight="15px" />
                      <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="70%" skeletonHeight="15px" />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6><ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="80px" skeletonHeight="15px" /></h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="40px" skeletonHeight="40px" borderRadius="50%" />
                          </div>
                          <div className="author_list_info">
                            <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="100px" skeletonHeight="15px" />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6><ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="80px" skeletonHeight="15px" /></h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="40px" skeletonHeight="40px" borderRadius="50%" />
                          </div>
                          <div className="author_list_info">
                            <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="100px" skeletonHeight="15px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6><ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="60px" skeletonHeight="15px" /></h6>
                      <div className="nft-item-price">
                        <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="120px" skeletonHeight="30px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching item details:", error);
    return (
      <div className="text-center mt-5">
        <div className="container">
          <p>Error loading NFT details. Please try again later.</p>
          <p>NFT ID: {nftId}</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center mt-5">
        <div className="container">
          <p>No item found for ID: {nftId}.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title} #{item.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                            {item.ownerVerified && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt={item.creatorName} />
                            {item.creatorVerified && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;