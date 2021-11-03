// eslint-disable-next-line no-unused-vars
import React, { useEffect, useReducer } from "react";
// eslint-disable-next-line import/no-duplicates
import { useParams } from "react-router";
import item, { initialState } from "./reducer/index";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import "./Item.scss";
// eslint-disable-next-line no-unused-vars
import { ItemService } from "../../service/ItemService";
import ImageListContainer from "../../component/imageList/ImageListContainer";

const Item = () => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useReducer(item, initialState);

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        ItemService.getItem(id).then((response) => response.json()).then((json) => {
            dispatch({ type: "ITEM_SET_ITEM", item: json });
        });
    }, [id]);

    return (
        <div>
            <Header />
            <div className="content">
                <span style={{ fontSize: "50px", color: "black" }}>{id}</span>
                <span style={{ fontSize: "50px", color: "black" }}>{state.item.category}</span>
                { state.item.itemPictures && <ImageListContainer images={state.item.itemPictures} /> }
            </div>
            <Footer />
        </div>
    );
};

export default Item;
