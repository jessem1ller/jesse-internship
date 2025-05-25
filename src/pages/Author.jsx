import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import useAxiosFetch from '../hooks/useAxiosFetch';
import ItemsGridSkeletonLoader from '../components/reusable/ItemsGridSkeletonLoader';

const Author = () => {
  const { authorId } = useParams();
  const API_BASE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net";

  const { data: authorData, loading, error } = useAxiosFetch(`${API_BASE_URL}/authors?author=${authorId}`);

  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (authorData && authorData.followers !== undefined) {
      setFollowers(authorData.followers);
      setIsFollowing(false);
    }
  }, [authorData]);

  const handleToggleFollow = () => {
    if (isFollowing) {
      setFollowers(prevFollowers => prevFollowers - 1);
      setIsFollowing(false);
    } else {
      setFollowers(prevFollowers => prevFollowers + 1);
      setIsFollowing(true);
    }
  };

  if (loading) {
    return (
      <div id="wrapper" data-aos="fade-up" data-aos-delay="400">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section id="profile_banner" aria-label="section" className="text-light"
            style={{ background: `url(${AuthorBanner}) top`, height: '250px', backgroundSize: 'cover' }}>
          </section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <ItemsGridSkeletonLoader
                          count={1}
                          itemClassName=""
                          skeletonWidth="100px"
                          skeletonHeight="100px"
                          skeletonBorderRadius="50%"
                        />
                        <div className="profile_name">
                          <h4>
                            <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="150px" skeletonHeight="20px" />
                            <span className="profile_username">
                              <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="80px" skeletonHeight="15px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="200px" skeletonHeight="15px" />
                            </span>
                            <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="60px" skeletonHeight="25px" borderRadius="4px" />
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="100px" skeletonHeight="15px" />
                        </div>
                        <ItemsGridSkeletonLoader count={1} itemClassName="" skeletonWidth="80px" skeletonHeight="35px" borderRadius="4px" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems loading={loading} />
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
    console.error("Error fetching author data:", error);
    return (
      <div className="text-center mt-5">
        <div className="container">
          <p>Error loading author profile. Please try again later.</p>
          <p>Author ID: {authorId}</p>
        </div>
      </div>
    );
  }

  if (!authorData) {
    return null;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${authorData.bannerImage || AuthorBanner}) top`}
          style={{ background: `url(${authorData.bannerImage || AuthorBanner}) top / cover no-repeat` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt={`Author: ${authorData.authorName}`} />
                      {authorData.verified && <i className="fa fa-check"></i>}
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={() => navigator.clipboard.writeText(authorData.address)}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <Link
                        to="#"
                        className="btn-main"
                        onClick={handleToggleFollow}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData.nftCollection}
                    authorCardImage={authorData.authorImage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;