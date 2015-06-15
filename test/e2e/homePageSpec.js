describe('Acesso Pagina Home', function() {

  	it('Deve acessar a pagina home', function() {
	    browser.get('http://localhost:3000/');
	    expect(browser.getTitle()).toEqual('APPLQ');
	});
	
});