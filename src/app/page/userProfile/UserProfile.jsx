import React, { useEffect } from "react";
import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    getUser as getUserActionCreator,
    getUserItems as getUsersItemsActionCreator,
    setUserId as setUserIdActionCreator
} from "./action/userProfile";
import UserDetails from "../../component/userDetails/UserDetails";
import "./UserProfile.scss";
import UserTabs from "../../component/userDetails/UserTabs";
import { getItemsLoading, getNextItemId, getUserItemsList } from "./selectors";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getUser: getUserActionCreator,
    getUserItems: getUsersItemsActionCreator,
    setUserId: setUserIdActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    userItemsList: getUserItemsList(state),
    itemsLoading: getItemsLoading(state),
    nextItemId: getNextItemId(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
);

const UserProfile = ({
    getUser, getUserItems, userItemsList, history, itemsLoading, nextItemId, setUserId
}) => {
    // eslint-disable-next-line no-unused-vars
    const { id } = useParams();

    useEffect(() => {
        setUserId(id).then(() => {
            getUser();
            getUserItems();
        });
    }, [getUser, getUserItems, id, setUserId]);

    return (
        <div className="profile-container">
            <UserDetails />
            <UserTabs
                userItemsList={userItemsList}
                history={history}
                itemsLoading={itemsLoading}
                getUserItems={getUserItems}
                nextItemId={nextItemId}
                userId={id}
            />
        </div>
    );
};

UserProfile.propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserItems: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    userItemsList: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    itemsLoading: PropTypes.bool.isRequired,
    nextItemId: PropTypes.number,
    setUserId: PropTypes.func.isRequired
};

UserProfile.defaultProps = {
    nextItemId: null
};

export default enhance(UserProfile);
