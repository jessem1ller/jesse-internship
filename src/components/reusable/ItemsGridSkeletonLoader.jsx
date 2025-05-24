import React from 'react';
import Skeleton from '../UI/Skeleton'; // Assuming this path is correct relative to this new file

const ItemsGridSkeletonLoader = ({
  count = 4, // Default number of skeleton items
  itemClassName = "col-lg-3 col-md-6 col-sm-12", // Default classes for the wrapper of each skeleton
  skeletonHeight = "350px", // Default height for the Skeleton component
  skeletonWidth = "100%",   // Default width for the Skeleton component
  skeletonBorderRadius = "8px" // Default border radius
}) => {
  return (
    <> {/* Using a React Fragment to avoid an unnecessary wrapper div */}
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