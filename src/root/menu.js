import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import menuSearch from '../c/menu-search';
import menuProfile from '../c/menu-profile';

const menu = {
    controller(args) {
        const user = h.getUser(),
            menuCss = () => {
                let dynamicClasses;

                return `${args.menuTransparency ? 'overlayer' : ''} ${args.withAlert ? 'with-global-alert' : ''}`;
            },
            homeAttrs = () => {
                if (args.absoluteHome) {
                    return {
                        href: h.rootUrl()
                    };
                } else {
                    return {
                        config: m.route
                    };
                }
            };

        return {
            user: user,
            menuCss: menuCss,
            homeAttrs: homeAttrs
        };
    },
    view(ctrl, args) {
        return m('header.main-header',{
            class: ctrl.menuCss()
        }, [
            m('.w-row', [
                m('.w-clearfix.w-col.w-col-8.w-col-small-8.w-col-tiny-8',
                    [
                        m('a.header-logo.w-inline-block[href=\'/?ref=ctrse_header\'][title=\'Catarse\']',
                            ctrl.homeAttrs(),
                            m('img[alt=\'Logo big\'][src=\'/assets/catarse_bootstrap/logo_big.png\']')
                        ),
                        args.menuShort ? '' : m('div#menu-components', [
                            m('a.w-hidden-small.w-hidden-tiny.header-link.w-nav-link[href=\'/start?ref=ctrse_header\']',{config: m.route}, 'Comece seu projeto'),
                            m('a.w-hidden-small.w-hidden-tiny.header-link.w-nav-link[href=\'/explore?ref=ctrse_header\']',{config: m.route},'Explore'),
                            m.component(menuSearch)
                        ])
                    ]
                ),
                m('.text-align-right.w-col.w-col-4.w-col-small-4.w-col-tiny-4', [
                    ctrl.user ? m.component(menuProfile, {user: ctrl.user}) : m('a.w-nav-link.header-link.w-nav-link.btn-edit.u-right[href=\'/pt/login?ref=ctrse_header\']', 'Login'),
                ])

            ]),
            args.menuShort ? '' : m('.header-controls-mobile.w-hidden-main.w-hidden-medium',
                [
                    m('a.header-link.w-nav-link[href=\'/pt/start?ref=ctrse_header\']',
                        {onclick: () => m.route('/start')},
                        'Comece seu projeto'
                    ),
                    m('a.header-link.w-nav-link[href=\'/pt/explore?ref=ctrse_header\']',
                        {onclick: () => m.route('/explore')},
                        'Explore'
                    )
                ]
            )
        ]);
    }
};

export default menu;
