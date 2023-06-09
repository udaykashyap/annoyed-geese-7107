import React from "react";
import axios from "axios";
import WishlistEmpty from "./../../Components/UserSide/WishlistEmpty";
import WishlistWithProducts from "../../Components/UserSide/WishlistWithProducts";

const Wishlist = () => {
  const [data, setData] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://lime-tough-coati.cyclic.app/wishlist", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [reload]);
  return (
    <>
      {data && data.length > 0 ? (
        <WishlistWithProducts
          data={data}
          setReload={setReload}
          reload={reload}
        />
      ) : (
        <WishlistEmpty data={data} />
      )}
    </>
  );
};

export default Wishlist;
