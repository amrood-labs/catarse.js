import m from 'mithril';

const facebookButton = {
    controller: function(args) {
        const share = () => {
            if (FB) {
                FB.ui({
                    method: args.messenger ? 'send' : 'share',
                    link: args.url,
                    href: args.url,
                });
            }
        };

        return {
            share
        };
    },
    view: function(ctrl, args) {
        const buttonCss = () => {
            if (args.mobile) {
                return `w-hidden-main w-hidden-medium u-marginbottom-20 btn btn-medium btn-fb ${args.class}`;
            } else if (args.big) {
                return `btn btn-fb btn-large u-marginbottom-20 w-button ${args.class}`;
            } else if (args.medium) {
                return `btn ${args.messenger ? 'btn-messenger' : 'btn-fb'} btn-medium u-marginbottom-20 w-button ${args.class}`;
            }
            return `btn btn-inline btn-medium btn-terciary u-marginright-20 ${args.class}`;
        };

        return m('button', {
            class: buttonCss(),
            onclick: ctrl.share
        }, [
            m('span.fa', {
                class: args.messenger ? 'fa-comment' : 'fa-facebook'
            }),
            args.messenger ? ' Messenger' : ' Facebook'
        ]);
    }
};

export default facebookButton;
