import m from 'mithril';
import _ from 'underscore';
import moment from 'moment';
import h from '../h';

const subscriptionsPerMonthTable = {
    controller: function() {
        return {
            emptyRow: {
                total_amount: 0,
                new_amount: 0,
                total_subscriptions: 0,
                new_subscriptions: 0
            }
        };
    },

    view: function(ctrl, args) {
        return m('div', [
            m(".fontsize-large.fontweight-semibold.u-text-center.u-marginbottom-30[id='origem']",
                'Crescimento mensal das assinaturas'
            ),
            m('.table-outer.u-marginbottom-60', [
                m('.table-row.fontweight-semibold.fontsize-smaller.header.lineheight-tighter.w-row', [
                    m('.table-col.w-col.w-col-4.w-col-small-4.w-col-tiny-4',
                        m('div',
                            'Mês'
                        )
                    ),
                    m('.table-col.w-hidden-small.w-hidden-tiny.w-col.w-col-2.w-col-small-2.w-col-tiny-2',
                        m('div', [
                            'Novos assinantes',
                            m.trust('&nbsp;')
                        ])
                    ),
                    m('.table-col.w-hidden-small.w-hidden-tiny.w-col.w-col-2.w-col-small-2.w-col-tiny-2',
                        m('div',
                            'Receita com novos assinantes'
                        )
                    ),
                    m('.w-col.w-col-2.w-col-small-2.w-col-tiny-2',
                        m('div',
                            'Assinantes totais'
                        )
                    ),
                    m('.w-col.w-col-2.w-col-small-2.w-col-tiny-2',
                        m('div',
                            'Receita total'
                        )
                    )
                ]),
                m('.table-inner.fontsize-small', [!args.data ? '' :
                    _.map(_.groupBy(args.data, 'month'), (subscription) => {
                        const slip = _.filter(subscription, sub => sub.payment_method === 'boleto')[0] || ctrl.emptyRow;
                        const credit_card = _.filter(subscription, sub => sub.payment_method === 'credit_card')[0] || ctrl.emptyRow;

                        return m('.table-row.w-row', [
                            m('.table-col.w-col.w-col-4.w-col-small-4.w-col-stack.w-col-tiny-4', [
                                m('.fontweight-semibold',
                                  moment(subscription[0].month).format('MMMM YYYY')
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    'Cartão de crédito'
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    'Boleto bancário'
                                )
                            ]),
                            m('.table-col.w-hidden-small.w-hidden-tiny.w-col.w-col-2.w-col-small-2.w-col-stack.w-col-tiny-2', [
                                m('.fontweight-semibold',
                                    slip.new_subscriptions + credit_card.new_subscriptions
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    credit_card.new_subscriptions
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    slip.new_subscriptions
                                )
                            ]),
                            m('.table-col.w-hidden-small.w-hidden-tiny.w-col.w-col-2.w-col-small-2.w-col-stack.w-col-tiny-2', [
                                m('.fontweight-semibold',
                                  `R$${h.formatNumber((slip.new_amount + credit_card.new_amount) / 100, 2, 3)}`
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    `R$${h.formatNumber((credit_card.new_amount) / 100, 2, 3)}`
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                  `R$${h.formatNumber((slip.new_amount) / 100, 2, 3)}`
                                )
                            ]),
                            m('.w-col.w-col-2.w-col-small-2.w-col-stack.w-col-tiny-2', [
                                m('.fontweight-semibold',
                                    slip.total_subscriptions + credit_card.total_subscriptions
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    credit_card.total_subscriptions
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    slip.total_subscriptions
                                )
                            ]),
                            m('.w-col.w-col-2.w-col-small-2.w-col-stack.w-col-tiny-2', [
                                m('.fontweight-semibold.text-success',
                                    `R$${h.formatNumber(((slip.total_amount) + (credit_card.total_amount)) / 100, 2, 3)}`
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    `R$${h.formatNumber((credit_card.total_amount) / 100, 2, 3)}`
                                ),
                                m('.fontsize-smallest.fontcolor-secondary',
                                    `R$${h.formatNumber((slip.total_amount) / 100, 2, 3)}`
                                )
                            ])
                        ]);
                    })
                ])
            ])
        ]);
    }

};

export default subscriptionsPerMonthTable;
