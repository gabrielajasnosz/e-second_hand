import React, { useEffect } from "react";
import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    getUser as getUserActionCreator,
    getUserItems as getUsersItemsActionCreator,
    setUserId as setUserIdActionCreator,
    getUserComments as getUserCommentsActionCreator,
    resetData as resetDataActionCreator,
    getCounters as getCountersActionCreator
} from "./action/userProfile";
import UserDetails from "../../component/userDetails/UserDetails";
import "./UserProfile.scss";
import UserTabs from "../../component/userDetails/UserTabs";
import {
    getCommentsLoading, getCountersSelector, getHasMoreCommentsPage,
    getItemsLoading, getNextItemId, getUserCommentsList, getUserItemsList
} from "./selectors";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getUser: getUserActionCreator,
    getUserItems: getUsersItemsActionCreator,
    getUserComments: getUserCommentsActionCreator,
    setUserId: setUserIdActionCreator,
    resetData: resetDataActionCreator,
    getCounters: getCountersActionCreator
}, dispatch);

const mapStateToProps = (state) => ({
    userItemsList: getUserItemsList(state),
    userCommentsList: getUserCommentsList(state),
    itemsLoading: getItemsLoading(state),
    commentsLoading: getCommentsLoading(state),
    nextItemId: getNextItemId(state),
    hasMoreComments: getHasMoreCommentsPage(state),
    counters: getCountersSelector(state)
});

const enhance = compose(
    connect(mapStateToProps,
        mapDispatchToProps),
);

const UserProfile = ({
    getUser,
    getUserItems,
    userItemsList,
    history,
    itemsLoading,
    nextItemId,
    setUserId,
    userCommentsList,
    commentsLoading,
    getUserComments,
    hasMoreComments,
    resetData,
    getCounters,
    counters
}) => {
    // eslint-disable-next-line no-unused-vars
    const { id } = useParams();

    useEffect(() => {
        setUserId(id).then(() => {
            getUser();
            getUserItems();
            getUserComments();
            getCounters();
        });
    }, [getCounters, getUser, getUserComments, getUserItems, id, setUserId]);

    useEffect(() => () => {
        resetData();
    }, [resetData]);

    return (
        <div className="profile-container">
            <UserDetails counters={counters} history={history} />
            <UserTabs
                userItemsList={userItemsList}
                history={history}
                itemsLoading={itemsLoading}
                getUserItems={getUserItems}
                nextItemId={nextItemId}
                userId={id}
                userComments={userCommentsList}
                commentsLoading={commentsLoading}
                getUserComments={getUserComments}
                hasMoreComments={hasMoreComments}
                resetData={resetData}
                counters={counters}
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
    setUserId: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    userCommentsList: PropTypes.array.isRequired,
    commentsLoading: PropTypes.bool.isRequired,
    getUserComments: PropTypes.func.isRequired,
    hasMoreComments: PropTypes.bool.isRequired,
    resetData: PropTypes.func.isRequired,
    getCounters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    counters: PropTypes.object.isRequired
};

UserProfile.defaultProps = {
    nextItemId: null
};

export default enhance(UserProfile);
