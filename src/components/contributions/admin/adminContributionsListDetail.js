adminApp.AdminContributionsListDetail = {
  controller: function(args){
    this.contribution = args.contribution;
    this.contribution.user_profile_img = this.contribution.user_profile_img || '/assets/catarse_bootstrap/user.jpg';
    (this.contribution.paid_at) ? this.contribution.paid_at = moment(new Date(this.contribution.paid_at)).format("DD/MM/YYYY, hh:mm[h]") : "";
    this.stateClass = function(){
      switch(this.contribution.state){
        case 'paid':
          return ".text-success";
        case 'pending':
          return ".text-warning";
        default:
          return ".text-error";
      }
    };
    this.paymentMethodClass = function(){
      switch(this.contribution.payment_method){
        case 'BoletoBancario':
          return ".fa-barcode";
        case 'CartaoDeCredito':
          return ".fa-credit-card";
        default: 
          return ".fa-question";
      }
    };
  },
  view: function(ctrl, args) {
    var ctrb = ctrl.contribution;
    return m(".w-clearfix.card.u-radius.u-marginbottom-20.results-admin-contributions",[
            m(".w-row",[
              m(".w-col.w-col-4",[
                m(".w-row",[
                  m(".w-col.w-col-3.w-col-small-3.u-marginbottom-10",[
                    m("img.user-avatar[src='"+ctrb.user_profile_img+"']")
                  ]),
                  m(".w-col.w-col-9.w-col-small-9",[
                    m(".fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-10", ctrb.user_name),
                    m(".fontsize-smallest", "Usuário: "+ctrb.user_id),
                    m(".fontsize-smallest.fontcolor-secondary", ctrb.email),
                    m(".fontsize-smallest.fontcolor-secondary", ctrb.payer_email)
                  ])
                ])
              ]),
              m(".w-col.w-col-4",[
                m(".w-row",[
                  m(".w-col.w-col-3.w-col-small-3.u-marginbottom-10",[
                    m("img.thumb-project.u-radius[src='"+ctrb.uploaded_image+"'")
                  ]),
                  m(".w-col.w-col-9.w-col-small-9",[
                    m(".fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-10", ctrb.project_name),
                    m(".fontsize-smallest.fontweight-semibold", ctrb.project_state),
                    m(".fontsize-smallest.fontcolor-secondary", ".")//Here we should get the project start and end date.
                  ])
                ])
              ]),
              m(".w-col.w-col-2",[
                m(".fontweight-semibold.lineheight-tighter.u-marginbottom-10.fontsize-small", "R$"+ctrb.value),
                m(".fontsize-smallest.fontcolor-secondary", ctrb.paid_at),
                m(".fontsize-smallest", "Id: "+ctrb.payment_id)
              ]),
              m(".w-col.w-col-2",[
                m(".fontsize-smallest.lineheight-looser.fontweight-semibold",[
                  m("span.fa.fa-circle"+ctrl.stateClass())," "+ctrb.state
                ]),
                m(".fontsize-smallest.fontweight-semibold",[
                  m("span.fa"+ctrl.paymentMethodClass())," ",m("a.link-hidden[href='#']", ctrb.payment_method)
                ]),(
                  (function(){
                    if(ctrb.payment_method === "BoletoBancario"){
                      return m(".fontsize-smallest.fontcolor-secondary.lineheight-tight", [m("span.badge", "2a via")])  
                    }
                  })()
                )
              ])
            ]),
            m("a.w-inline-block.arrow-admin.fa.fa-chevron-down.fontcolor-secondary[data-ix='show-admin-cont-result'][href='#']"),
            m(".divider.u-margintop-20.u-marginbottom-20"),
            m(".w-row.u-marginbottom-30",[
              m(".w-col.w-col-2",[
                m("a.btn.btn-small.btn-terciary[data-ix='show-dropdown'][href='#']", {style: {"transition": " all 0.5s ease 0s", " -webkit-transition": " all 0.5s ease 0s"}}, "Pedir reembolso"),
                m(".dropdown-list.card.u-radius.dropdown-list-medium.zindex-10[data-ix='display-none-on-load'][id='transfer']", {style: {"display": " none"}},[
                  m(".fontsize-smaller.fontweight-semibold.u-text-center.u-marginbottom-20", "Quer efetuar o reembolso?"),
                  m("a.btn.btn-small[href='#']", "Solicitar reembolso")
                ])
              ]),
              m(".w-col.w-col-2",[
                m("a.btn.btn-small.btn-terciary[data-ix='show-dropdown'][href='#']", {style: {"transition": " all 0.5s ease 0s", " -webkit-transition": " all 0.5s ease 0s"}}, "Estornar"),
                m(".dropdown-list.card.u-radius.dropdown-list-medium.zindex-10[data-ix='display-none-on-load'][id='transfer']", {style: {"display": " none"}},[
                  m(".fontsize-smaller.fontweight-semibold.u-text-center.u-marginbottom-20", "Quer efetuar o estorno?"),
                  m("a.btn.btn-small[href='#']", "Solicitar estorno")
                ])
              ]),
              m(".w-col.w-col-2",[
                m("a.btn.btn-small.btn-terciary.btn-desactivated[href='#']", "2a via")
              ]),
              m(".w-col.w-col-2",[
                m("a.btn.btn-small.btn-terciary[data-ix='show-dropdown'][href='#']", {style: {"transition": " all 0.5s ease 0s", " -webkit-transition": " all 0.5s ease 0s"}}, "Transferir apoio"),
                m(".dropdown-list.card.u-radius.dropdown-list-medium.zindex-10[data-ix='display-none-on-load'][id='transfer']", {style: {"display": " none"}},[
                  m(".w-form",[
                    m("form[data-name='Email Form 4'][id='email-form-4'][name='email-form-4']",[
                      m("label[for='name-2']", "Id do novo apoiador:"),
                      m("input.w-input.text-field[data-name='Name 2'][id='name-2'][name='name'][placeholder='ex: 129908'][type='text']"),
                      m("input.w-button.btn.btn-small[data-wait='Please wait...'][type='submit'][value='Transferir']")
                    ]),
                    m(".w-form-done",[
                      m("p", "Thank you! Your submission has been received!")
                    ]),
                    m(".w-form-fail",[
                      m("p", "Oops! Something went wrong while submitting the form")
                    ])
                  ])
                ])
              ]),
              m(".w-col.w-col-2",[
                m("a.btn.btn-small.btn-terciary[data-ix='show-dropdown'][href='#']", {style: {"transition": " all 0.5s ease 0s", " -webkit-transition": " all 0.5s ease 0s"}}, "Trocar recompensa"),
                m(".dropdown-list.card.u-radius.dropdown-list-medium.zindex-10[data-ix='display-none-on-load'][id='transfer']", {style: {"display": " none"}},[
                  m(".w-form",[
                    m("form[data-name='Email Form 4'][id='email-form-4'][name='email-form-4']",[
                      m(".w-radio",[
                        m("input.w-radio-input[data-name='Radio'][id='radio'][name='radio'][type='radio'][value='Radio']"),
                        m("label.w-form-label[for='radio']", "R$ 10")
                      ]),
                      m(".w-radio",[
                        m("input.w-radio-input[data-name='Radio 2'][id='radio'][name='radio-2'][type='radio'][value='Radio']"),
                        m("label.w-form-label[for='radio']", "R$ 10")]),
                      m(".w-radio",[
                        m("input.w-radio-input[data-name='Radio 2'][id='radio'][name='radio-2'][type='radio'][value='Radio']"),
                        m("label.w-form-label[for='radio']", "R$ 10")
                      ]),
                      m(".w-radio",[
                        m("input.w-radio-input[data-name='Radio 2'][id='radio'][name='radio-2'][type='radio'][value='Radio']"),
                        m("label.w-form-label[for='radio']", "R$ 10")
                      ]),
                      m(".w-radio",[
                        m("input.w-radio-input[data-name='Radio 2'][id='radio'][name='radio-2'][type='radio'][value='Radio']"),
                        m("label.w-form-label[for='radio']", "R$ 10")
                      ])
                    ]),
                    m(".w-form-done",[
                      m("p", "Thank you! Your submission has been received!")
                    ]),
                    m(".w-form-fail",[
                      m("p", "Oops! Something went wrong while submitting the form")
                    ])
                  ])
                ])
              ]),
              m(".w-col.w-col-2",[
                m("a.btn.btn-small.btn-terciary[data-ix='show-dropdown'][href='#']", {style: {"transition": " all 0.5s ease 0s", " -webkit-transition": " all 0.5s ease 0s"}}, "Anonimato"),
                m(".dropdown-list.card.u-radius.dropdown-list-medium.zindex-10[data-ix='display-none-on-load'][id='transfer']", {style: {"display": " none"}},[
                  m(".w-form",[
                    m("form[data-name='Email Form 4'][id='email-form-4'][name='email-form-4']",[
                      m(".w-radio",[
                        m("input.w-radio-input[data-name='Radio'][id='radio'][name='radio'][type='radio'][value='Radio']"),
                        m("label.w-form-label[for='radio']", "Anônimo")
                      ]),
                      m(".w-radio",[
                        m("input.w-radio-input[data-name='Radio 2'][id='radio'][name='radio-2'][type='radio'][value='Radio']"),
                        m("label.w-form-label[for='radio']", "Público")
                      ])
                    ]),
                    m(".w-form-done",[
                      m("p", "Thank you! Your submission has been received!")
                    ]),
                    m(".w-form-fail",[
                      m("p", "Oops! Something went wrong while submitting the form")
                    ])
                  ])
                ])
              ])
            ]),
            m(".w-row.card.card-terciary.u-radius",[
              m(".w-col.w-col-4",[
                m(".fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20", "Detalhes do apoio"),
                m(".fontsize-smallest.lineheight-looser",[
                  "Valor: R$80\n",
                  m("br"),
                  "Taxa: R$3,35\n",
                  m("br"),"Recompensa: R$80\n",
                  m("br"),
                  "Anônimo: Não\n",
                  m("br"),
                  "Id pagamento: 638912",
                  m("br"),
                  "Apoio: 54545454",
                  m("br"),
                  "Chave: \n",
                  m("br"),
                  "7809d09d-6325-442e-876e-b9a0846c526f\n",
                  m("br"),
                  "Meio: Pagarme\n",
                  m("br"),
                  "Operadora: STONE",
                  m("br"),
                  m("a.link-hidden[href='#']", "Boleto bancário"),
                  " ",
                  m("span.badge", "2a via")
                ])
              ]),
              m(".w-col.w-col-4",[
                m(".fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20", "Histórico da transação"),
                m(".w-row.fontsize-smallest.lineheight-looser",[
                  m(".w-col.w-col-6",[
                    m(".fontcolor-secondary", "19/05/2015, 01:20 h")
                  ]),
                  m(".w-col.w-col-6",[
                    m("div", "Apoio criado")
                  ])
                ]),
                m(".w-row.fontsize-smallest.lineheight-looser",[
                  m(".w-col.w-col-6",[
                    m(".fontcolor-secondary", "19/05/2015, 01:20 h")
                  ]),
                  m(".w-col.w-col-6",[
                    m("div", "Apoio criado")
                  ])
                ]),
                m(".w-row.fontsize-smallest.lineheight-looser",[
                  m(".w-col.w-col-6",[
                    m(".fontcolor-secondary", "19/05/2015, 01:20 h")
                  ]),
                  m(".w-col.w-col-6",[
                    m("div",[
                      m("span.badge.badge-attention.fontsize-smallest", "Estorno realizado")
                    ])
                  ])
                ]),
                m(".w-row.fontsize-smallest.lineheight-looser",[
                  m(".w-col.w-col-6",[
                    m(".fontcolor-secondary", "19/05/2015, 01:20 h")
                  ]),
                  m(".w-col.w-col-6",[
                    m("div", "Apoio criado")
                  ])
                ]),
                m(".w-row.fontsize-smallest.lineheight-looser",[
                  m(".w-col.w-col-6",[
                    m(".fontcolor-secondary", "19/05/2015, 01:20 h")
                  ]),
                  m(".w-col.w-col-6",[
                    m("div", "Apoio criado")
                  ])
                ]),
                m(".w-row.fontsize-smallest.lineheight-looser",[
                  m(".w-col.w-col-6",[
                    m(".fontcolor-secondary", "19/05/2015, 01:20 h")
                  ]),
                  m(".w-col.w-col-6",[
                    m("div", "Apoio criado"),
                    m(".fontsize-smallest.lineheight-tighter",[
                      m("span.badge", "Luis Otavio Ribeiro")
                    ])
                  ])
                ])
              ]),
              m(".w-col.w-col-4")
            ])
          ]);    
  }
}