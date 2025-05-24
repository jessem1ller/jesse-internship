import React from 'react';
import Skeleton from '../UI/Skeleton';

const ItemsGridSkeletonLoader = ({
  count = 4,
  itemClassName = "col-lg-3 col-md-6 col-sm-12", 
  skeletonHeight = "350px",
  skeletonWidth = "100%",
  skeletonBorderRadius = "8px"
}) => {
  return (
    <> 
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={itemClassName}>
          <Skeleton
            width={skeletonWidth}
            height={skeletonHeight}
            borderRadius={skeletonBorderRadius}
          />
        </div>
      ))}
    </>
  );
};

export default ItemsGridSkeletonLoader;