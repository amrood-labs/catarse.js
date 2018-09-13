import m from 'mithril';
import _ from 'underscore';
import h from '../../src/h';
import userBalanceWithdrawHistoryItemRequest from '../../src/c/user-balance-withdraw-history-item-request';


describe('UserBalanceWithdrawHistoryItem', function() {

    let $cardPending, $cardRejected, $cardTransferred, transfers;

    describe('view', function() {

        beforeAll(function() {
            
            transfers = UserBalanceWithdrawHistoryItemMock();
            let transfer, index;

            index = 0;
            transfer = transfers[index];

            $cardPending = mq(m(userBalanceWithdrawHistoryItemRequest, { transfer, index }));

            index = 1;
            transfer = transfers[index];

            $cardRejected = mq(m(userBalanceWithdrawHistoryItemRequest, { transfer, index }));

            index = 2;
            transfer = transfers[index];

            $cardTransferred = mq(m(userBalanceWithdrawHistoryItemRequest, { transfer, index }));
        });

        it('Should show pending card', function() {
            expect($cardPending.contains(h.momentify(transfers[0].funding_estimated_date, 'DD/MM/YYYY'))).toBeTrue();
        });

        it('Should show rejected card', function() {
            expect($cardRejected.find('span.fa.fa-exclamation-circle').length).toEqual(1);
        });

        it('Should show transferred card', function() {
            expect($cardTransferred.contains(h.momentify(transfers[2].transferred_at, 'DD/MM/YYYY'))).toBeTrue();
        });
    });
});
