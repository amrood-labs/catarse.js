/**
 * window.c.UserBalance component
 * Render the current user total balance and request fund action
 *
 * Example:
 * m.component(c.UserBalance, {
 *     user_id: 123,
 * })
 */
import m from 'mithril';
import _ from 'underscore';
import moment from 'moment';
import models from '../models';
import h from '../h';
import modalBox from './modal-box';
import userBalanceRequestModalContent from './user-balance-request-modal-content';

const I18nScope = _.partial(h.i18nScope, 'users.balance');

const userBalance = {
    controller: function(args) {
        args.balanceManager.load();

        return {
            userBalances: args.balanceManager.collection,
            displayModal: h.toggleProp(false, true)
        };
    },
    view: function(ctrl, args) {
        const balance = _.first(ctrl.userBalances()) || { user_id: args.user_id, amount: 0 },
            positiveValue = balance.amount >= 0,
            balanceRequestModalC = [
                userBalanceRequestModalContent,
                _.extend({}, { balance }, args)
            ];

        return m('.w-section.section.user-balance-section', [
            (ctrl.displayModal() ? m.component(modalBox, {
                displayModal: ctrl.displayModal,
                content: balanceRequestModalC
            }) : ''),
            m('.w-container', [
                m('.w-row', [
                    m('.w-col.w-col-8.u-text-center-small-only.u-marginbottom-20', [
                        m('.fontsize-larger', [
                            window.I18n.t('totals', I18nScope()),
                            m(`span.text-${positiveValue ? 'success' : 'error'}`, `R$ ${h.formatNumber(balance.amount || 0, 2, 3)}`)
                        ])
                    ]),
                    m('.card.card-terciary.u-radius.w-col.w-col-4', [
                        m(`a[class="r-fund-btn w-button btn btn-medium u-marginbottom-10 ${((balance.amount <= 0 || balance.in_period_yet || balance.has_cancelation_request) ? 'btn-inactive' : '')}"][href="javascript:void(0);"]`,
                            {
                                onclick: ((balance.amount > 0 && (_.isNull(balance.in_period_yet) || balance.in_period_yet === false) && !balance.has_cancelation_request) ? ctrl.displayModal.toggle : 'javascript:void(0);')
                            },
                            window.I18n.t('withdraw_cta', I18nScope())
                        ),
                        m('.fontsize-smaller.fontweight-semibold',
                            (balance.last_transfer_amount && balance.in_period_yet ?
                                window.I18n.t('last_withdraw_msg', I18nScope({
                                    amount: `R$ ${h.formatNumber(balance.last_transfer_amount, 2, 3)}`,
                                    date: moment(balance.last_transfer_created_at).format('MMMM')
                                }))
                                : window.I18n.t('no_withdraws_this_month', I18nScope({ month_name: moment().format('MMMM') }))),
                        ),
                        m('.fontcolor-secondary.fontsize-smallest.lineheight-tight.u-marginbottom-10',
                            window.I18n.t('withdraw_limits_msg', I18nScope())
                        )

                    ])
                ])
            ])
        ]);
    }
};

export default userBalance;
