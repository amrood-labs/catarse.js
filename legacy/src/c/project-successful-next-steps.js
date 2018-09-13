import m from 'mithril';
import _ from 'underscore';
import { catarse } from '../api';
import models from '../models';
import h from '../h';
import projectSuccessOnboard from './project-successful-onboard';
import projectSuccessOnboardProcessing from './project-successful-onboard-processing';
import projectSuccessOnboardEnabledWithdraw from './project-successful-onboard-enabled-withdraw';


const projectSuccessfulNextSteps = {

    controller: function(args) {
        
        const 
            wishedState = 'transferred',
            userIdVM = catarse.filtersVM({user_id: 'eq', state: 'eq'}),
            lastBalanceTransfer = catarse.paginationVM(models.balanceTransfer, 'created_at.desc', { Prefer: 'count=exact' }),
            current_state = m.prop(args.project().state),
            isLoading = m.prop(true),
            successfulOnboards = () => {

                const onboardProjectAndCalculatedState = { project: args.project, current_state: current_state };
    
                if (isLoading()) {
                    return h.loader();
                }
                else {
                    switch(current_state()) {
                        case 'waiting_funds':
                            return m(projectSuccessOnboardProcessing, onboardProjectAndCalculatedState);
                        case 'successful_waiting_transfer':
                            return m(projectSuccessOnboardEnabledWithdraw, onboardProjectAndCalculatedState);
                        case 'successful':
                            return m(projectSuccessOnboard, onboardProjectAndCalculatedState);
                        default:
                            return h.loader();
                    }
                }
            };
        
        userIdVM.user_id(args.project().user_id).state(wishedState);
        lastBalanceTransfer
            .firstPage(userIdVM.parameters())
            .then((balanceTransfers) => {
                
                const 
                    lastBalanceTransferItem = _.first(balanceTransfers),
                    hasAtLeastOneTransfered = balanceTransfers.length > 0,
                    balanceCreatedAtDate = hasAtLeastOneTransfered ? new Date(lastBalanceTransferItem.transferred_at) : null,
                    projectExpiredAtDate = new Date(args.project().expires_at),
                    withdrawTransferredOccuredAfterProjectExpiredDate = hasAtLeastOneTransfered ? balanceCreatedAtDate.getTime() > projectExpiredAtDate.getTime() : false;

                if (withdrawTransferredOccuredAfterProjectExpiredDate) {
                    current_state('successful');
                }
                else {
                    if (args.project().state == 'successful')
                        current_state('successful_waiting_transfer');
                }

                isLoading(false);                
            });

        return {
            successfulOnboards
        };
    },

    view: function(ctrl, args) {

        return ctrl.successfulOnboards();        
    }
};

export default projectSuccessfulNextSteps;