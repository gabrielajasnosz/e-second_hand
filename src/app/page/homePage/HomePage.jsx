import React, { useEffect, useState } from "react";
import Carousel from "../../component/carousel/Carousel";
import ImageListWidget from "../../component/imageListWidget/ImageListWidget";
import { ItemService } from "../../service/ItemService";
// eslint-disable-next-line react/prop-types
const HomePage = ({ history }) => {
    const [newestItems, setNewestItems] = useState([]);
    useEffect(() => {
        ItemService.getItems({ pageSize: 5 }).then((response) => response.json()).then((json) => {
            setNewestItems(json);
        });
    }, []);

    return (
        <>
            <Carousel />
            <ImageListWidget items={newestItems.itemList} history={history} />
        </>
    );
};

export default HomePage;
