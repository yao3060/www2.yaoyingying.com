import classNames from "classnames";
import React, { CSSProperties, useEffect } from "react";

const PageHeader = ({
  title,
  description,
  bgImage,
}: {
  title?: string;
  description?: string;
  bgImage?: string;
}) => {
  const style: CSSProperties = {};

  if (bgImage) {
    style.backgroundImage = `url(${bgImage})`;
    style.backgroundRepeat = "no-repeat";
    style.backgroundSize = "cover";
  }

  return (
    <>
      {title && (
        <div
          className={classNames("hero bg-base-200 px-2.5 py-10", {
            "py-36": bgImage,
          })}
          style={style}
        >
          <div className="container m-auto">
            <h1
              className={classNames({
                "text-2xl": !bgImage,
                "text-4xl text-white text-center": bgImage,
              })}
            >
              {title}
            </h1>
            {description && (
              <div className="description text-gray-500 pt-2.5">
                {description}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeader;
