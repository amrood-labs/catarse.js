import {
    commonPayment
} from '../api';
import m from 'mithril';
import _ from 'underscore';
import models from '../models';

const getSubscriptionTransitions = (projectId, toStatus, fromStatus, startAt, endAt) => {
    const vm = commonPayment.filtersVM({
        project_id: 'eq',
        created_at: 'between',
        from_status: 'in',
        to_status: 'in'
    });

    vm.created_at.gte(startAt);
    vm.created_at.lte(endAt);
    vm.project_id(projectId);
    vm.from_status(fromStatus);
    vm.to_status(toStatus);

    const lSub = commonPayment.loaderWithToken(models.subscriptionTransition.getPageOptions(vm.parameters()));
    return lSub.load();
};

const getNewSubscriptions = (projectId, startAt, endAt) => {
    const vm = commonPayment.filtersVM({
        project_id: 'eq',
        created_at: 'between',
        status: 'in'
    });

    vm.created_at.gte(startAt);
    vm.created_at.lte(endAt);
    vm.project_id(projectId);
    vm.status('active');

    const lSub = commonPayment.loaderWithToken(models.userSubscription.getPageOptions(vm.parameters()));
    return lSub.load();
};

const getSubscriptionsPerMonth = (projectId) => {
    const vm = commonPayment.filtersVM({
        project_id: 'eq'
    }).order({
        month: 'desc',
        payment_method: 'desc'
    });

    models.subscriptionsPerMonth.pageSize(false);
    vm.project_id(projectId);
    const lSub = commonPayment.loaderWithToken(models.subscriptionsPerMonth.getPageOptions(vm.parameters()));
    return lSub.load();
};

const getUserProjectSubscriptions = (userId, projectId, status) => {
    const vm = commonPayment.filtersVM({
        user_id: 'eq',
        project_id: 'eq',
        created_at: 'between',
        status: 'in'
    });

    vm.user_id(userId);
    vm.project_id(projectId);
    vm.status(status);
    const lSub = commonPayment.loaderWithToken(models.userSubscription.getPageOptions(vm.parameters()));
    return lSub.load();
};

const getSubscription = (subscriptionId) => {
    const vm = commonPayment.filtersVM({
        id: 'eq'
    });
    vm.id(subscriptionId);

    const lSub = commonPayment.loaderWithToken(models.userSubscription.getRowOptions(vm.parameters()));

    return lSub.load();
};

const subscriptionVM = {
    getNewSubscriptions,
    getSubscriptionsPerMonth,
    getSubscriptionTransitions,
    getUserProjectSubscriptions,
    getSubscription
};

export default subscriptionVM;
