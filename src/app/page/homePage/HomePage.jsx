import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import Carousel from "../../component/carousel/Carousel";
import ImageListWidget from "../../component/itemListWidget/ItemListWidget";
import { ItemService } from "../../service/ItemService";
import { UserService } from "../../service/UserService";
import {
    setOnlyFollowedUsers as setOnlyFollowedUsersActionCreator,
} from "../itemList/action/itemList";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setOnlyFollowedUsers: setOnlyFollowedUsersActionCreator
}, dispatch);

const enhance = compose(
    connect(null,
        mapDispatchToProps)
);
// eslint-disable-next-line react/prop-types
const HomePage = ({ history, setOnlyFollowedUsers }) => {
    const { t } = useTranslation();
    const [newestItems, setNewestItems] = useState([]);
    const [followedUsersItems, setFollowedUsersItems] = useState([]);
    const userId = UserService.validateToken(UserService.currentUserValue) ? UserService.decodedTokenValue.userId : null;

    const userRole = localStorage.getItem("role");

    const navigateToItemsList = () => {
        // eslint-disable-next-line react/prop-types
        history.push("/list");
    };

    // eslint-disable-next-line no-unused-vars
    const navigateToFollowedUsersItems = () => {
        setOnlyFollowedUsers(true);
        // eslint-disable-next-line react/prop-types
        history.push("/list");
    };
    useEffect(() => {
        ItemService.getItems({ pageSize: 5 }).then((response) => response.json()).then((json) => {
            setNewestItems(json);
        });
        if (userId != null) {
            ItemService.getFollowedUsersItems(userId, 0, 5).then((response) => response.json()).then((json) => {
                setFollowedUsersItems(json);
            });
        }
    }, [userId]);

    return (
        <>
            { (!userRole || userRole === "USER") && (
                <Carousel />
            )}
            <ImageListWidget items={newestItems.itemList} history={history} title={t("Explore newest items")} onButtonClick={navigateToItemsList} />
            { userId && followedUsersItems && followedUsersItems.length > 0 && (
                <ImageListWidget
                    items={followedUsersItems}
                    history={history}
                    title={t("Followed users items")}
                    onButtonClick={navigateToFollowedUsersItems}
                />
            )}
            <div style={{ marginBottom: "4rem" }} />
        </>
    );
};

export default enhance(HomePage);
