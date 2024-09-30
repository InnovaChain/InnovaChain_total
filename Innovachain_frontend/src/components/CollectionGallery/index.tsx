import clsx from "clsx";
import CollectionCategory from "./CollectionCategory";
import GalleryCards from "./GalleryCards";

const CollectionGallery = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex flex-col gap-[100px]", className)}>
      <CollectionCategory />
      <GalleryCards />
    </div>
  );
};

export default CollectionGallery;
