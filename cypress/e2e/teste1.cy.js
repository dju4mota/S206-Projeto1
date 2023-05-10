/// <reference types="cypress"/> 

// preencher com matricula e senha válidas para o teste
let matriculaLogin = xxxx;
let matriculaSenha = xxxx;


Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})


describe('Criando cenário de testes para o site do inatel',()=> {

  it('Caso de teste: Tentativa de login em Graduação com informações inválidas (falha)', ()=> {

    cy.visit('https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDefault.aspx')
    
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type('123456')
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type('123456')
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_Corpo_lblErro').should('contain.text', 'Aluno não encontrado no curso selecionado !!!')
  })


  it('Caso de teste: Tentativa de login em Graduação com informações válidas ', ()=> {
    
    cy.visit('https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDefault.aspx')

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(4)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(matriculaLogin)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(matriculaSenha)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.url().should('eq', 'https://siteseguro.inatel.br/PortalAcademico/Default.aspx')
  })


  it('Caso de teste: Realizando logoff', ()=> {

    cy.visit('https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDefault.aspx')

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(4)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(matriculaLogin)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(matriculaSenha)    
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()
    cy.get('#LoginStatus1').click()
    cy.get('#LoginStatus1').click()

    cy.url().should('eq', 'https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDefault.aspx')    
  })


  it('Caso de teste: Tentativa de acessar área do professor enquanto logado como aluno (falha)', ()=> {
    
    cy.visit('https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDefault.aspx')

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(4)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(matriculaLogin)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(matriculaSenha)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()

    cy.get('#ctl00_MenuLateral_UCMenuPrincipal1_HyperLink4').click()
    cy.url().should('eq', 'https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDocentes%2fWebMenuDocente.aspx')
  })

  it('Caso de teste: Acessando área de matrícula ', ()=> {
    
    cy.visit('https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDefault.aspx')

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(4)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(matriculaLogin)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(matriculaSenha)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()
    cy.get('#ctl00_Corpo_HyperLink9').click()    

    cy.url().should('eq', 'https://siteseguro.inatel.br/PortalAcademico/Matricula/Webmatricula.aspx')
    cy.get('#ctl00_lblTitulo').should('contain.text', 'Módulo da Matricula')
    
  })


  it('Caso de teste: Verificação da data', ()=> {
    
    cy.visit('https://siteseguro.inatel.br/PortalAcademico/WebLogin.aspx?ReturnUrl=%2fPortalAcademico%2fDefault.aspx')

    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_dropSubCurso').select(4)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_tbMatricula').type(matriculaLogin)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_Password').type(matriculaSenha)
    cy.get('#ctl00_Corpo_TabAcessoLogin_TabAluno_LogOn_LoginButton').click()
    var dt = new Date();
    cy.get('#ctl00_Corpo_UCMenuAcademico1_lblDadoAcademico').should('contain.text', dt.getYear() + 1900)
    
  })

})
