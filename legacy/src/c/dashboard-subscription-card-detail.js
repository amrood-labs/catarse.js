import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import models from '../models';
import dashboardSubscriptionCardDetailSubscriptionDetails from './dashboard-subscription-card-detail-subscription-details';
import dashboardSubscriptionCardDetailUserProfile from './dashboard-subscription-card-detail-user-profile';
import dashboardSubscriptionCardDetailUserAddress from './dashboard-subscription-card-detail-user-address';

const dashboardSubscriptionCardDetail = {
    controller: function(args) {
        const userDetailsOptions = {
            id: args.user.common_id
        };

        const userDetailsLoader = models.commonUserDetails.getRowWithToken(userDetailsOptions);

        userDetailsLoader.then((user_details) => {
            args.user.address = user_details.address;
        });

        return {
            displayModal: h.toggleProp(false, true)
        };
    },

    view: function(ctrl, args) {
        const subscription = args.subscription,
            user = _.extend({ project_id: subscription.project_external_id }, args.user),
            reward = args.reward,
            displayModal = ctrl.displayModal;

        return m('.details-backed-project.card',
            m('.card.card-terciary',
                m('.w-row', [
                    m('.w-col.w-col-7', [
                        m(dashboardSubscriptionCardDetailSubscriptionDetails, { user, subscription, reward })
                    ]),
                    m('.w-col.w-col-5', [
                        m(dashboardSubscriptionCardDetailUserProfile, { user, subscription, displayModal }),
                        m(dashboardSubscriptionCardDetailUserAddress, { user })
                    ])
                ])
            )
        );
    }
};

export default dashboardSubscriptionCardDetail;
