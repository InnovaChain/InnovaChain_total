import clsx from "clsx";
import { twc } from "react-twc";
import { CategoryImg, CollectionImg, PriceImg } from "../../assets/gallery";

const CollectionCategory = () => {
  return (
    <CollectionCategoryStyle>
      <CategoryItem>All</CategoryItem>
      <CategoryItem image={CategoryImg}>Category</CategoryItem>
      <CategoryItem image={CollectionImg}>Collection</CategoryItem>
      <CategoryItem image={PriceImg}>Price</CategoryItem>
    </CollectionCategoryStyle>
  );
};

const CategoryItem = ({
  children,
  image,
}: {
  children: React.ReactNode;
  image?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 p-4",
        "border-2 border-white rounded-xl",
        "text-white font-semibold",
      )}
    >
      {image && <img className="w-6 h-6" src={image} />}
      {children}
    </div>
  );
};

const CollectionCategoryStyle = twc.div`
  flex justify-center gap-5
`;

export default CollectionCategory;
